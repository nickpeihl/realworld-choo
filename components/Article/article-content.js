var html = require('bel')

module.exports = articleContent

function articleContent (article) {
  return html`
    <div class="row article-content">
      <div class="col-md-12">
        <p>${article.body}</p>
        <ul class="tag-list">
          ${article.tagList.map(tagLi)}
        </ul>
      </div>
    </div>
  `
}

function tagLi (tag) {
  return html`
    <li class="tag-default tag-pill tag-outline">${tag}</li>
  `
}
