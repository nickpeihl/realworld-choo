var html = require('bel')
var Component = require('nanocomponent')

module.exports = Footer

function Footer (opts) {
  Component.call(this)
}

Footer.prototype = Object.create(Component.prototype)

Footer.prototype.createElement = function (state, emit) {
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

Footer.prototype.update = function (state, emit) {
  return false
}
