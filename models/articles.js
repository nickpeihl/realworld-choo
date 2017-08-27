var xhr = require('xhr')
var querystring = require('querystring')

var API_BASE = require('../api').base

module.exports = ArticlesModel

function ArticlesModel (state, emitter) {
  state.articles = []

  emitter.on('DOMContentLoaded', function () {
    getArticles()
    emitter.on('articles:download', getArticles)
  })

  function getArticles () {
    var url = API_BASE + '/articles'
    if (state.query) {
      url += '?' + querystring.stringify(state.query)
    }
    xhr.get(url, function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching articles: `err`')
      else if (res.statusCode !== 200) {
        emitter.emit('log:error', `Articles API returned ${res.statusCode}`)
      } else {
        state.articles = JSON.parse(res.body).articles
        emitter.emit('render')
      }
    })
  }
}
