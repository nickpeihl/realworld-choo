var html = require('bel')

module.exports = articleMeta

function articleMeta (article) {
  return html`
    <div class="article-meta">
      <a href=""><img src="${article.author.image}" /></a>
      <div class="info">
        <a href="" class="author">${article.author.username}</a>
        <span class="date">${article.createdAt}</span>
      </div>
    </div>
  `
}
