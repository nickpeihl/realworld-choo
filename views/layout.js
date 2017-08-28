var html = require('choo/html')
var header = require('../components/header')
var footer = require('../components/footer')

module.exports = layout

function layout (page) {
  return function (state, emit) {
    return html`
      <body class="sans-serif">
        ${header(state.navs, emit)}
        ${page(state, emit)}
        ${footer(state, emit)}
      </body>
    `
  }
}
