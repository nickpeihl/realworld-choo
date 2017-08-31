var html = require('choo/html')

var banner = require('../components/banner')
var articlePreview = require('../components/Article/article-preview')
var sidebar = require('../components/sidebar')

module.exports = home

function home (state, emit) {
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
            ${state.articles.map(articlePreview)}
          </div>
          <div class="col-md-3">
            ${sidebar(state.tags)}
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
