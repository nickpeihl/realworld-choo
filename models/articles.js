var xhr = require('xhr')
var querystring = require('querystring')
var xtend = require('xtend')

var API_BASE = require('../api').base

module.exports = ArticlesModel

function ArticlesModel (state, emitter) {
  state.articles = xtend(
    {
      values: [],
      ready: false
    },
    state.articles
  )

  emitter.on('articles:download', getArticles)

  function getArticles (opts) {
    state.articles.ready = false
    var url = API_BASE + '/articles'
    if (state.query) {
      url += '?' + querystring.stringify(state.query)
    }
    if (opts) {
      url += '?' + querystring.stringify(opts)
    }
    xhr.get(url, function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching articles: `err`')
      else if (res.statusCode !== 200) {
        emitter.emit('log:error', `Articles API returned ${res.statusCode}`)
      } else {
        state.articles.values = JSON.parse(res.body).articles
        state.articles.ready = true
        emitter.emit('render')
      }
    })
  }
}
