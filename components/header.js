var html = require('bel')

module.exports = header

function header (navs, emit) {
  return html`
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="/">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          ${navs.map(createLi)}
        </ul>
      </div>
    </nav>
  `
}

function createLi (item) {
  return html`
    <li class="nav-item">
      <a class="nav-link ${item.active ? 'active' : ''}" href=${item.href}>${item.name}</a>
    </li>
  `
}
