var html = require('choo/html')
var serialize = require('form-serialize')

var listErrors = require('../components/list-errors')

module.exports = login

function login (state, emit) {
  var checkingAuth = state.auth.checkingAuth
  var authenticated = state.auth.authenticated
  if (checkingAuth) {
    if (authenticated) {
      emit('go', '/')
    } else {
      return html`<div></div>`
    }
  } else {
    return html`
<div class="auth-page">
  <div class="container-page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign In</h1>
        <p class="text-xs-center">
          <a href="">Need an account?</a>
        </p>
        ${listErrors(state.auth.errors)}
        <form onsubmit=${submitForm}>
          <fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                name="email"
                type="email"
                placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg"
                name="password"
                type="password"
                placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              disabled="false">
              Sign In
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
  `
  }

  function submitForm (e) {
    e.preventDefault()
    var form = e.target
    var data = serialize(form)
    emit('auth:login', { user: data })
  }
}
