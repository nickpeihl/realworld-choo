var html = require('bel')

module.exports = footer

function footer (state, emit) {
  return html`
    <footer>
      <div class="container">
        <a href="/" class="logo-font">conduit</a>
        <span class="attribution">
          An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code & design licensed under MIT.
        </span>
      </div>
    </footer>
  `
}
