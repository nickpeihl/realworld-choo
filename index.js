var choo = require('choo')
var API = require('./api')

var layout = require('./views/layout')

var app = choo()
if (process.env.NODE_ENV !== 'production') {
  app.use(require('choo-devtools')())
  app.use(require('choo-log')())
}
app.use(require('choo-service-worker')())

app.use(function (state, emitter) {
  state.title = 'Conduit'
  state.client = new API()
  state.banner = {
    titleClass: 'logo-font',
    title: 'conduit'
  }
  state.navs = [
    {
      name: 'Home',
      href: '/',
      active: true
    },
    {
      name: 'New Post',
      href: '',
      active: false
    },
    {
      name: 'Sign in',
      href: '/login',
      active: false
    },
    {
      name: 'Sign up',
      href: '',
      active: false
    }
  ]
})

app.use(require('./models/tags'))
app.use(require('./models/articles'))
app.use(require('./models/article'))
app.use(require('./models/comments'))
app.use(require('./models/profile'))
app.use(require('./models/auth'))

app.route('/', layout(require('./views/home')))
app.route('/login', layout(require('./views/login')))
app.route('/article/:slug', layout(require('./views/article')))
app.route('/profile/:username', layout(require('./views/profile')))
app.route('/*', require('./views/404'))

if (!module.parent) app.mount('body')
else module.exports = app
