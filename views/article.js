var html = require('choo/html')

var articleMeta = require('../components/Article/article-meta')
var articleContent = require('../components/Article/article-content')
var articleCommentForm = require('../components/Article/article-comment-form')
var articleCommentCard = require('../components/Article/article-comment-card')

module.exports = article

var loaded = false

function article (state, emit) {
  if (!state.article || state.params.slug !== state.article.slug) {
    loaded = false
  }
  if (loaded) {
    return html`
      <div class="article-page">
        <div class="banner">
          <div class="container">
            <h1>${state.article.title}</h1>
            ${articleMeta(state.article)}
          </div>
        </div>
        <div class="container page">
          ${articleContent(state.article)}
        </div>
        <hr />
        <div class="article-actions">
          ${articleMeta(state.article)}
        </div>
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            ${articleCommentForm(state.article)}
            ${state.comments.map(articleCommentCard)}
          </div>
        </div>
      </div>
    `
  } else {
    emit('article:download', state.params.slug)
    emit('comments:download', state.params.slug)
    loaded = true
    return html`<div>Loading...</div>`
  }
}
