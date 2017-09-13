var html = require('bel')

var Component = require('nanocomponent')
var articleList = require('../Article/article-list')
var tagList = require('../tags')
var yourFeedTab = require('./your-feed-tab')

module.exports = Container

function Container (opts) {
  if (!(this instanceof Container)) return new Container(opts)
  if (!opts) opts = {}

  Component.call(this)
}
Container.prototype = Object.create(Component.prototype)

Container.prototype.createElement = function (state, emit) {
  this._tagsReady = state.tags.ready
  this._articlesReady = state.articles.ready
  this._articles = state.articles.values
  this._tags = state.tags.values

  if (!this._tagsReady) emit('tags:download')
  if (!this._articlesReady) emit('articles:download')

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
            ${articleList({
              articles: this._articles,
              ready: this._articlesReady
            })}
          </div>
          <div class="col-md-3">
            <aside class="sidebar">
              <p>Popular Tags</p>
              ${tagList({
                tags: this._tags,
                ready: this._tagsReady
              })}
            </aside>
          </div>
        </div>
      </div>
  `
}

Container.prototype.update = function (state, emit) {
  if (state.tags.ready && state.articles.ready) {
    return true
  }
  return false
}
