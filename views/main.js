var html = require('choo/html')

module.exports = view

function view (page) {
  return html`
    <div>${page}</div>
  `
}
