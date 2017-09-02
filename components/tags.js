var html = require('bel')

module.exports = Tags

function Tags (props) {
  var tags = props.tags
  var isReady = props.ready
  if (isReady && tags) {
    return html`
      <div class="tag-list">
        ${tags.map(function (tag) {
          return tagLink(tag)
        })}
      </div>
    `
  } else {
    return html`<div>Loading Tags...</div>`
  }
}

function tagLink (tag) {
  return html`
    <a href="?tag=${tag}" class="tag-pill tag-default">${tag}</a>
  `
}
