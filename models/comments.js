module.exports = CommentsModel

function CommentsModel (state, emitter) {
  var client = state.client
  state.comments = []

  emitter.on('DOMContentLoaded', function () {
    getComments()
    emitter.on('comments:download', getComments)
  })

  function getComments (slug) {
    if (slug !== undefined) {
      client.getComments(slug, function (err, res) {
        if (err) emitter.emit('log:error', 'Error fetching article: `err`')
        else {
          state.comments = res.comments
          emitter.emit('render')
        }
      })
    }
  }
}
