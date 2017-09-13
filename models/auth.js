module.exports = AuthModel

function AuthModel (state, emitter) {
  var client = state.client
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
    client.login(payload, function (err, res) {
      state.auth.checkingAuth = false
      if (err) {
        state.authenticated = false
        emitter.emit('log:error', 'Error logging in: `err`')
      } else if (res.errors) {
        state.auth.errors = res.errors
        state.authenticated = false
        emitter.emit('log:error', 'Unauthorized')
        emitter.emit('render')
      } else {
        state.auth.authenticated = true
        window.localStorage.setItem('jwt', res.user.token)
        state.client.setToken(res.user.token)
        emitter.emit('pushState', '/')
      }
    })
  }
}
