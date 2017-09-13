var html = require('choo/html')
var Header = require('../components/header')
var footer = require('../components/footer')

var header = new Header()

module.exports = layout

function layout (page) {
  return function (state, emit) {
    return html`
      <body class="sans-serif">
        ${header.render(state.navs, emit)}
        ${page(state, emit)}
        ${footer(state, emit)}
      </body>
    `
  }
}
