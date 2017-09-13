module.exports = ArticleModel

function ArticleModel (state, emitter) {
  var client = state.client
  state.article = null

  emitter.on('DOMContentLoaded', function () {
    emitter.on('article:download', getArticle)
  })

  function getArticle (slug) {
    client.getArticle(slug, function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching article: `err`')
      state.article = res.article
      emitter.emit('render')
    })
  }
}
