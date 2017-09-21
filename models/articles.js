var xtend = require('xtend')

module.exports = ArticlesModel

function ArticlesModel (state, emitter) {
  var client = state.client
  state.articles = xtend(
    {
      values: [],
      count: 0,
      currentPage: 0,
      ready: false
    },
    state.articles
  )

  emitter.on('articles:download', getArticles)

  function getArticles (opts) {
    state.articles.ready = false
    client.listAllArticles(state.articles.currentPage, function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching articles: `err`')
      else {
        state.articles.values = res.articles
        state.articles.count = res.articlesCount
        state.articles.ready = true
        emitter.emit('render')
      }
    })
  }
}
