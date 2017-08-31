var html = require('choo/html')

var banner = require('../components/banner')
var articlePreview = require('../components/Article/article-preview')

module.exports = home

function home (state, emit) {
  return html`
    <div class="home-page">
      ${banner(state.banner)}
      ${container(state)}
    </div>
  `
}

function container (state) {
  return html`
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
        ${sidebarDiv(state.tags)}
      </div>
    </div>
  </div>
  `
}

function sidebarDiv (tags) {
  return html`
    <div class="sidebar">
      <p>Popular Tags</p>
      <div class="tag-list">
        ${tags.map(tagLink)}
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

function tagLink (tag) {
  return html`
    <a href="" class="tag-pill tag-default">${tag}</a>
  `
}
