var html = require('bel')

module.exports = banner

function banner (banner) {
  return html`
    <div class="banner">
      <div class="container">
        <h1 class="${banner.titleClass}">${banner.title}</h1>
        <p>A place to share your knowledge</p>
      </div>
    </div>
  `
}
