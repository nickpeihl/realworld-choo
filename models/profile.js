var xhr = require('xhr')

var API_BASE = require('../api').base

module.exports = ProfileModel

function ProfileModel (state, emitter) {
  state.profile = null

  emitter.on('DOMContentLoaded', function () {
    emitter.on('profile:download', getProfile)
  })

  function getProfile (username) {
    xhr.get(API_BASE + '/profiles/' + username, function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching profile: `err`')
      else if (res.statusCode !== 200) {
        emitter.emit('log:error', `Profile API returned ${res.statusCode}`)
      } else {
        state.profile = JSON.parse(res.body).profile
        emitter.emit('render')
      }
    })
  }
}
