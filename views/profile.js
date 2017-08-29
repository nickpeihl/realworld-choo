var html = require('choo/html')

var userInfo = require('../components/Profile/user-info')
var articlePreview = require('../components/Article/article-preview')

module.exports = profile

var loaded = false

function profile (state, emit) {
  if (!state.profile || state.params.username !== state.profile.username) {
    loaded = false
  }
  if (loaded) {
    return html`
<div class="profile-page">
  <div class="user-info">
    ${userInfo(state.profile)}
  </div>
  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-md-10 offset-md-l">
        <div class="articles-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item">
              <a class="nav-link active" href="">My Articles</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="">Favorited Articles</a>
            </li>
          </ul>
        </div>
        ${state.articles.map(articlePreview)}
      </div>
    </div>
  </div>
</div>
    `
  } else {
    state.query = { author: state.params.username }
    emit('profile:download', state.params.username)
    emit('articles:download')
    loaded = true
    return html`<div>Loading...</div>`
  }
}
