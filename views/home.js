var html = require('choo/html')

var banner = require('../components/banner')
var Container = require('../components/Home/home-container')

module.exports = home

var container = new Container()

function home (state, emit) {
  return html`
    <div class="home-page">
      ${banner(state.banner)}
      ${container.render(state, emit)}
    </div>
  `
}
