var html = require('choo/html')

var banner = require('../components/banner')
var articlePreview = require('../components/Article/article-preview')

module.exports = home

function home (state, emit) {
  return html`
    <div class="home-page">
      ${banner(state.banner, bannerContent())}
      ${container(state)}
    </div>
  `
}

function bannerContent () {
  return html`
    <p>A place to share your knowledge</p>
  `
}

function container (state) {
  return html`
  <div class="container page">
    <div class="row">
      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link disabled" href="">Your Feed</a>
            </li>
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

function tagLink (tag) {
  return html`
    <a href="" class="tag-pill tag-default">${tag}</a>
  `
}