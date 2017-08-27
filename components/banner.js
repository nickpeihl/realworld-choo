var html = require('bel')

module.exports = banner

function banner (banner, content) {
  return html`
    <div class="banner">
      <div class="container">
        <h1 class="${banner.titleClass}">${banner.title}</h1>
        ${content}
      </div>
    </div>
  `
}
