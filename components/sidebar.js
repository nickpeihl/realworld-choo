var html = require('bel')

module.exports = Sidebar

function Sidebar (tags) {
  return html`
    <aside class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        ${tags.map(tagLink)}
      </div>
    </aside>
  `
}

function tagLink (tag) {
  return html`
    <a href="" class="tag-pill tag-default">${tag}</a>
  `
}
