var xtend = require('xtend')

module.exports = TagsModel

function TagsModel (state, emitter) {
  var client = state.client
  state.tags = xtend(
    {
      ready: false,
      values: []
    },
    state.tags
  )

  emitter.on('tags:download', getTags)

  function getTags () {
    state.tags.ready = false
    client.getTags(function (err, res) {
      if (err) emitter.emit('log:error', 'Error fetching tags: `err`')
      else {
        state.tags.values = res.tags
        state.tags.ready = true
        emitter.emit('render')
      }
    })
  }
}
