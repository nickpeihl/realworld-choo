var xtend = require('xtend')
var querystring = require('querystring')

module.exports = ArticlesModel

function ArticlesModel (state, emitter) {
  var client = state.client
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
    client.listAllArticles(function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching articles: `err`')
      else {
        state.articles.values = res.articles
        state.articles.ready = true
        emitter.emit('render')
      }
    })
  }
}
