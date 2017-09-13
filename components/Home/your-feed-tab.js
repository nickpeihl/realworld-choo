var html = require('bel')

module.exports = yourFeedTab

function yourFeedTab (authenticated) {
  function clickHandler (e) {
    e.preventDefault()
    console.log('Feed tab clicked')
  }
  if (authenticated) {
    return html`
      <li class="nav-item">
        <a class="nav-link" href="" onclick=${clickHandler}>Your Feed</a>
      </li>
    `
  } else {
    return null
  }
}
