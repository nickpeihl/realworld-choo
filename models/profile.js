module.exports = ProfileModel

function ProfileModel (state, emitter) {
  var client = state.client
  state.profile = null

  emitter.on('DOMContentLoaded', function () {
    emitter.on('profile:download', getProfile)
  })

  function getProfile (username) {
    client.getProfile(username, function (err, res) {
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
