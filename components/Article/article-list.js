var html = require('bel')

var articlePreview = require('./article-preview')

module.exports = articleList

function articleList (props) {
  var articles = props.articles
  var isReady = props.ready
  if (isReady && articles) {
    return articles.length
      ? html`${articles.map(articlePreview)}`
      : html`<div>No articles... yet`
  } else {
    return html`<div>Loading articles...</div>`
  }
}
