var html = require('bel')

module.exports = articlePreview

function articlePreview (article) {
  return html`
    <div class="article-preview">
      <div class="article-meta">
        <a href=""><img src="${article.author.image}" /></a>
        <div class="info">
          <a href="/profile/${article.author.username}"
            class="author">${article.author.username}</a>
          <span class="date">${article.createdAt}</span>
        </div>
        <button class="btn btn-outline-primary btn-sm pull-xs-right">
          <i class="ion-heart"></i>${article.favoritesCount}
        </button>
      </div>
      <a href="/article/${article.slug}" class="preview-link">
        <h1>${article.title}</h1>
        <p>${article.description}</p>
        <span>Read more...</span>
      </a>
    </div>
  `
}
