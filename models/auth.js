var xhr = require('xhr')

var API_BASE = require('../api').base

module.exports = AuthModel

function AuthModel (state, emitter) {
  state.auth = {
    checkingAuth: false,
    authenticated: false,
    errors: null
  }

  emitter.on('DOMContentLoaded', function () {
    emitter.on('auth:login', logIn)
  })

  function logIn (payload) {
    state.auth.errors = []
    state.auth.checkingAuth = true
    emitter.emit('render')
    var url = API_BASE + '/users/login'
    xhr.post(
      url,
      {
        body: {
          user: payload
        },
        json: true
      },
      function (err, res) {
        state.auth.checkingAuth = false
        if (err) {
          state.authenticated = false
          emitter.emit('log:error', 'Error logging in: `err`')
        } else if (res.statusCode === 422) {
          state.auth.errors = res.body.errors
          state.authenticated = false
          emitter.emit('log:error', 'Unauthorized')
          emitter.emit('render')
        } else if (res.statusCode !== 200) {
          state.authenticated = false
          emitter.emit('log:error', `Login API returned ${res.statusCode}`)
        } else {
          state.auth.authenticated = true
          emitter.emit('pushState', '/')
        }
      }
    )
  }
}
