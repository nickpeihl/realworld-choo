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
      else {
        state.profile = res.profile
        emitter.emit('render')
      }
    })
  }
}
