var html = require('choo/html')

var banner = require('../components/banner')
var articleList = require('../components/Article/article-list')
var tagList = require('../components/tags')

module.exports = home

function home (state, emit) {
  var articles = state.articles.values || []
  var articlesReady = state.articles.ready
  var tags = state.tags.values || []
  var tagsReady = state.tags.ready
  var token = state.auth.token

  if (!tagsReady) emit('tags:download')
  if (!articlesReady) emit('articles:download')

  return html`
    <div class="home-page">
      ${banner(state.banner)}
      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <div class="feed-toggle">
              <ul class="nav nav-pills outline-active">
                ${yourFeedTab(state.auth.authenticated)}
                <li class="nav-item">
                  <a class="nav-link active" href="">Global Feed</a>
                </li>
              </ul>
            </div>
            ${articleList({
              articles: articles,
              ready: articlesReady
            })}
          </div>
          <div class="col-md-3">
            <aside class="sidebar">
              <p>Popular Tags</p>
              ${tagList({
                tags: tags,
                ready: tagsReady
              })}
            </aside>
          </div>
        </div>
      </div>
    </div>
  `
}

function yourFeedTab (authenticated) {
  if (authenticated) {
    return html`
      <li class="nav-item">
        <a class="nav-link" href="">Your Feed</a>
      </li>
    `
  } else {
    return null
  }
}
