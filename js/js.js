var fs = require('fs')
var mm = require('musicmetadata')
var Dialogs = require('dialogs')
var dialogs = Dialogs(opts = {})

var audio = new Audio('')
var db = {'path': [], 'id': [], 'track': [], 'title': [], 'album': [], 'artist': [], 'picture': []}
var index = 0  // Reference to the index of the files object
var nextId = 0 // This is the id of the next song to add

var track = ''
var album = ''
var artist = ''

var loop = false
var shuffle = false
var nightStyle = false
var muted = false

var playing = false
var loaded = false

if (localStorage.getItem('loop') !== null) {
  loop = localStorage.getItem('loop', loop) === 'true'
  shuffle = localStorage.getItem('shuffle', shuffle) === 'true'
  nightStyle = localStorage.getItem('nightStyle', nightStyle) === 'true'
  muted = localStorage.getItem('muted', muted) === 'true'
}

/*
*   Functions
*/

function toHHMMSS (seconds) { // https://stackoverflow.com/a/34841026
  var input = parseInt(seconds, 10)
  var h = Math.floor(input / 3600) % 24
  var m = Math.floor(input / 60) % 60
  var s = input % 60
  return [h, m, s]
        .map(v => v < 10 ? '0' + v : v)
        .filter((v, i) => v !== '00' || i > 0)
        .join(':')
}

function addSongs (files) {
  for (let i = 0; i < files.length; i++) {
    var ext = files[i].path.split('.')[files[i].path.split('.').length - 1]
    if (ext === 'mp3' || ext === 'm4a' || ext === 'aac') {
      var parser = mm(fs.createReadStream(files[i].path), function (err, metadata) {
        if (err) throw console.log(err)

        var n = db.title.length
        db.path[n] = files[i].path
        console.log(metadata.title === '')

        if (metadata.title === '') {
          db.track[n] = 1
          db.title[n] = files[i].path.split('/')[files[i].path.split('/').length - 1]
          db.album[n] = 'No album'
          db.artist[n] = 'No artist'
          db.picture[n] = 'cover.png'
          db.id[n] = nextId
        } else {
          db.track[n] = parseInt(metadata.track.no, 10)
          db.title[n] = metadata.title
          db.album[n] = metadata.album
          db.artist[n] = metadata.artist[0]
          db.picture[n] = metadata.picture[0]
          db.id[n] = nextId
        }

        var parsed = [db.title[n], db.album[n], db.artist[n]]
        console.log(parsed)

        if (db.title[n].length > 29) {
          parsed[0] = db.title[n].slice(0, 29).trim() + '...'
        }
        if (db.album[n].length > 29) {
          parsed[1] = db.album[n].slice(0, 29).trim() + '...'
        }
        if (db.artist[n].length > 29) {
          parsed[2] = db.artist[n].slice(0, 29).trim() + '...'
        }
        document.getElementById('table').innerHTML += '<tr ondblclick="playSong(' + db.id[n] + ')" id="' + db.id[n] + '"><td>' + db.track[n] + '</td><td>' + parsed[0] + '</td><td>' + parsed[1] + '</td><td>' + parsed[2] + '</td><td><span onclick="removeSong(' + db.id[n] + ')" class="icon icon-cancel"></span></td></tr>'
        console.log('Added to list: "' + parsed[0] + '" with id: ' + db.id[n])

        nextId++
      })
      console.log('Added: ' + files[i].path)
    } else {
      notify('error', 1)
    }
  }
}

function playSong (idToPlay) {
  if (!isEmpty()) {
    if (playing === true) {
      audio.pause()
      playing = false
    }
    index = db.id.indexOf(idToPlay)
    if (exists(db.path[index])) {
      audio = new Audio(db.path[index])
      audio.load()
      audio.play()
      playing = true
      loaded = true
      selectSong()
    } else {
      notify('error', 2)
    }
  }
}

function nextSong () {
  if (playing === true) {
    audio.pause()
    playing = false
  }
  if (loop === true && isLast()) {
    playSong(db.id[0])
    notify('song', 0)
  } else if (loop === false && isLast()) {
    console.log('End of playlist')
    playing = false
  } else {
    index++
    playSong(db.id[index])
    notify('song', 0)
  }
}

function prevSong () {
  if (playing === true) {
    audio.pause()
    playing = false
  }
  if (loop === true && isFirst()) {
    playSong(db.id[db.id.length - 1])
    notify('song', 0)
  } else if (loop === false && isFirst()) {
    console.log('End of playlist')
    playing = false
  } else {
    index--
    playSong(db.id[index])
    notify('song', 0)
  }
}

function removeSong (idToRemove) {
  dialogs.confirm('Are you sure? This action will remove "' + db.title[db.id.indexOf(idToRemove)] + '" from your current playlist', function (ok) {
    if (ok === true) {
      if (db.id.indexOf(idToRemove) === index) {
        audio.pause()
        playing = false
      }
      document.getElementById(idToRemove).remove()

      db.track.splice(db.id.indexOf(idToRemove), 1)
      db.title.splice(db.id.indexOf(idToRemove), 1)
      db.album.splice(db.id.indexOf(idToRemove), 1)
      db.artist.splice(db.id.indexOf(idToRemove), 1)
      db.picture.splice(db.id.indexOf(idToRemove), 1)
      db.path.splice(db.id.indexOf(idToRemove), 1)
      db.id.splice(db.id.indexOf(idToRemove), 1)
    }
  })
  if (isEmpty()) {
    loaded = false
    index = 0
  }
}

function selectSong () {
  if (!isEmpty()) {
    var image = db.picture[index]
    track = db.title[index]
    album = db.album[index]
    artist = db.artist[index]

    if (track.length > 64) {
      track = track.slice(0, 64).trim() + '...'
    }
    if (album.length > 32) {
      album = album.slice(0, 64).trim() + '...'
    }
    if (artist.length > 32) {
      artist = artist.slice(0, 64).trim() + '...'
    }

    if (image && image !== 'cover.png') {
      var base64String = ''
      for (let i = 0; i < image.data.length; i++) {
        base64String += String.fromCharCode(image.data[i])
      }
      var base64 = 'data:image/jpeg;base64,' +
                        window.btoa(base64String)
      document.getElementById('cover').src = base64
    } else {
      document.getElementById('cover').src = 'cover.png'
    }

    document.getElementById('song').innerHTML = track
    document.getElementById('album').innerHTML = album
    document.getElementById('artist').innerHTML = artist
  } else {
    document.getElementById('song').innerHTML = ''
    document.getElementById('album').innerHTML = ''
    document.getElementById('artist').innerHTML = ''
    document.getElementById('cover').src = 'cover.png'
  }

  var elements = document.getElementsByClassName('active')
  if (elements.length !== 0) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove('active')
    }
  }
  document.getElementById(db.id[index]).classList.add('active')
}

function isEmpty () {
  if (db.path.length === 0) {
    index = 0
    document.getElementById('no-songs').style.display = 'inline'
    return true
  }
  document.getElementById('no-songs').style.display = 'none'
  return false
}

function isLast () {
  if (index === db.path.length - 1) {
    return true
  }
  return false
}

function isFirst () {
  if (index === 0) {
    return true
  }
  return false
}

function update () {
  
  isEmpty()  
  
  // Updates time
  if (!isEmpty() && toHHMMSS(audio.duration) !== 'NaN:NaN:NaN') {
    document.getElementById('total-time').innerHTML = toHHMMSS(audio.duration)
  }
  if (playing === true) {
    document.getElementById('time').innerHTML = toHHMMSS(audio.currentTime)
  }
  if (audio.currentTime >= audio.duration && playing) {
    nextSong()
  }

  // Updates volume
  if (playing && !muted) {
    audio.volume = document.getElementById('volume').value
  }
  if (muted && loaded) {
    audio.volume = 0
  }

  // Updates play button
  if (playing === false) {
    document.getElementById('play-btn').style.display = 'inline'
    document.getElementById('pause-btn').style.display = 'none'
    document.getElementById('cover').classList.remove('shadow')
  } else {
    document.getElementById('play-btn').style.display = 'none'
    document.getElementById('pause-btn').style.display = 'inline'
    document.getElementById('cover').classList.add('shadow')
  }

  // Updates Night Mode
  if (nightStyle === true) {
    document.getElementById('day').style.display = 'none'
    document.getElementById('night').style.display = 'inline'
    document.getElementById('toolbar').classList.add('dark')
    document.getElementById('footer').classList.add('dark')
    document.getElementById('window1').classList.add('dark')
    document.getElementById('window2').classList.add('dark')
    document.getElementById('body').classList.add('dark')
    document.getElementById('no-songs').classList.add('dark')
  } else {
    document.getElementById('day').style.display = 'inline'
    document.getElementById('night').style.display = 'none'
    document.getElementById('toolbar').classList.remove('dark')
    document.getElementById('footer').classList.remove('dark')
    document.getElementById('window1').classList.remove('dark')
    document.getElementById('window2').classList.remove('dark')
    document.getElementById('body').classList.remove('dark')
    document.getElementById('no-songs').classList.remove('dark')
  }

  // Updates localStorage
  localStorage.setItem('loop', loop)
  localStorage.setItem('shuffle', shuffle)
  localStorage.setItem('nightStyle', nightStyle)
  localStorage.setItem('muted', muted)

  setTimeout(update, 100)
}

function exists (filePath) {
  var http = new XMLHttpRequest()
  http.open('HEAD', filePath, false)
  http.send()
  return http.status === 200
}

function notify (type, id) {
  var nTitle
  var nBody

  if (type === 'error' && id === 1) {
    // Unsupported filetype
    nTitle = 'Musify'
    nBody = 'One or more files could not be added. Check that the file extensions are compatible'
  } else if (type === 'error' && id === 2) {
    // File cannot be found
    nTitle = 'Musify'
    nBody = 'Song cannot be loaded. Check that the file is available and try again'
  } else if (type === 'song') {
    nTitle = db.title[index]
    nBody = db.album[index] + ' by ' + db.artist[index]
  }
  if (nTitle !== undefined) {
    let notification = new Notification(nTitle, {
      body: nBody,
      silent: true
    })
  }
}

/*
*   Event Listeners
*/

/* Add Songs */
document.getElementById('addfile').addEventListener('change', function (event) {
  addSongs(document.getElementById('addfile').files)
})

document.getElementById('nightStyle').addEventListener('click', function () {
  if (nightStyle === false) {
    nightStyle = true
  } else {
    nightStyle = false
  }
})

document.getElementById('play').addEventListener('click', function () {
  if (loaded === false) {
    playing = true
    loaded = true
    if (exists(db.path[index])) {
      audio = new Audio(db.path[index])
      audio.load()
      audio.play()
      playing = true
      selectSong()
    } else {
      notify('error', 2)
    }
  } else if (playing === false) {
    playing = true
    audio.play()
  } else {
    playing = false
    audio.pause()
  }
})

document.getElementById('shuffle').addEventListener('click', function () {
  if (shuffle === false) {
    shuffle = true
    document.getElementById('shuffle').classList.add('on')
  } else {
    shuffle = false
    document.getElementById('shuffle').classList.remove('on')
  }
  console.log('Shuffle: ' + shuffle)
})

document.getElementById('loop').addEventListener('click', function () {
  if (loop === false) {
    loop = true
    document.getElementById('loop').classList.add('on')
  } else {
    loop = false
    document.getElementById('loop').classList.remove('on')
    console.log('Loop: ' + loop)
  }
})

document.getElementById('next').addEventListener('click', function () {
  nextSong()
})

document.getElementById('previous').addEventListener('click', function () {
  prevSong()
})

document.getElementById('clear').addEventListener('click', function () {
  dialogs.confirm('Are you sure? This action will remove all the songs from your current playlist', function (ok) {
    if (ok === true) {
      audio.pause()
      playing = false
      document.getElementById('table').innerHTML = ""
      db = {'path': [], 'id': [], 'track': [], 'title': [], 'album': [], 'artist': [], 'picture': []}
    }
  })
  if (isEmpty()) {
    loaded = false
    index = 0
  }
})

document.getElementById('sound').addEventListener('click', function () {
  if (muted === false) {
    muted = true
    document.getElementById('mute-btn').classList.add('on')
    document.getElementById('mute-btn').style.display = 'inline'
    document.getElementById('sound-btn').style.display = 'none'
  } else {
    muted = false
    document.getElementById('mute-btn').classList.remove('on')
    document.getElementById('mute-btn').style.display = 'none'
    document.getElementById('sound-btn').style.display = 'inline'
    if (loaded === true) {
      audio.volume = document.getElementById('volume').value
    }
  }
})

update()
isEmpty()
