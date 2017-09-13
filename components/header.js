var html = require('bel')
var Component = require('nanocomponent')

module.exports = Header

function Header (opts) {
  if (!(this instanceof Header)) return new Header(opts)

  Component.call(this)
}

Header.prototype = Object.create(Component.prototype)

Header.prototype._createLi = function (item) {
  return html`
    <li class="nav-item">
      <a class="nav-link ${item.active
        ? 'active'
        : ''}" href=${item.href}>${item.name}</a>
    </li>
  `
}

Header.prototype.createElement = function (navs, emit) {
  this._navs = navs
  return html`
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          ${navs.map(this._createLi)}
        </ul>
      </div>
    </nav>
  `
}

Header.prototype.update = function (navs, emit) {
  return this._navs !== navs
}
