var html = require('bel')

module.exports = listErrors

function listErrors (errors) {
  if (errors) {
    return html`
      <ul class="error-messages">
        ${Object.keys(errors).map(function (key) {
          return html`
            <li>${key} ${errors[key]}</li>
          `
        })}
      </ul>
    `
  } else {
    return null
  }
}
