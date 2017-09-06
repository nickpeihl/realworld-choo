var http = require('http')
var test = require('tape')
var tapeCluster = require('tape-cluster')

RealWorldTestCluster.test = tapeCluster(test, RealWorldTestCluster)

module.exports = RealWorldTestCluster

function RealWorldTestCluster (opts) {
  if (!(this instanceof RealWorldTestCluster)) {
    return new RealWorldTestCluster(opts)
  }

  var self = this

  self.assert = opts.assert
  self.port = opts.port
  self.server = http.createServer()

  self.server.on('request', onRequest)

  function onRequest (req, res) {
    var data = JSON.stringify({
      url: req.url,
      method: req.method,
      headers: req.headers
    })
    res.end(data)
  }
}

RealWorldTestCluster.prototype.bootstrap = function (cb) {
  var self = this
  self.server.once('listening', cb)
  self.server.listen(self.port)
}

RealWorldTestCluster.prototype.close = function (cb) {
  var self = this
  self.server.close(cb)
}
