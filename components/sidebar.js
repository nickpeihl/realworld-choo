var html = require('bel')

module.exports = Sidebar

function Sidebar (tags) {
  return html`
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        ${tags.map(tagLink)}
      </div>
    </div>
  `
}

function tagLink (tag) {
  return html`
    <a href="" class="tag-pill tag-default">${tag}</a>
  `
}
