var API = require('../api')
var TestCluster = require('./helper')
var parallel = require('run-parallel')

var port = 57888
var url = `http://localhost:${port}/api`

var client = new API({
  apiRoot: url
})

TestCluster.test(
  'get methods',
  {
    port: port
  },
  function (cluster, t) {
    parallel(tests, function (err, res) {
      t.error(err, 'no errors in get tests')
      Object.keys(res).forEach(function (key) {
        t.equal(res[key].method, 'GET', `${key} method is GET`)
        t.equal(res[key].url, expected[key].url, `${key} sends correct URL`)
      })
      t.end()
    })
  }
)

var expected = {
  'get-profile': {
    url: '/api/profiles/nickpeihl'
  },
  'get-article': {
    url: '/api/articles/fizzbuzz'
  },
  'get-tags': {
    url: '/api/tags'
  },
  'get-comments': {
    url: '/api/articles/foo/comments'
  },
  'article-list-all-0': {
    url: '/api/articles?limit=20&offset=0'
  },
  'article-list-all-5': {
    url: '/api/articles?limit=20&offset=100'
  },
  'article-list-tag-0': {
    url: '/api/articles?tag=bar&limit=10&offset=0'
  },
  'article-list-tag-2': {
    url: '/api/articles?tag=baz&limit=10&offset=20'
  },
  'article-list-author-0': {
    url: '/api/articles?author=biz&limit=5&offset=0'
  },
  'article-list-author-6': {
    url: '/api/articles?author=fizz&limit=5&offset=30'
  },
  'article-list-author-favs-0': {
    url: '/api/articles?favorited=fizz&limit=20&offset=0'
  },
  'article-list-author-favs-4': {
    url: '/api/articles?favorited=flam&limit=20&offset=80'
  },
  'feed-articles-0': {
    url: '/api/articles/feed?limit=10&offset=0'
  },
  'feed-articles-10': {
    url: '/api/articles/feed?limit=10&offset=100'
  }
}

var tests = {
  'get-profile': function (cb) {
    client.getProfile('nickpeihl', cb)
  },
  'get-article': function (cb) {
    client.getArticle('fizzbuzz', cb)
  },
  'get-tags': function (cb) {
    client.getTags(cb)
  },
  'get-comments': function (cb) {
    client.getComments('foo', cb)
  },
  'article-list-all-0': function (cb) {
    client.listAllArticles(cb)
  },
  'article-list-all-5': function (cb) {
    client.listAllArticles(5, cb)
  },
  'article-list-tag-0': function (cb) {
    client.listArticlesByTag('bar', cb)
  },
  'article-list-tag-2': function (cb) {
    client.listArticlesByTag('baz', 2, cb)
  },
  'article-list-author-0': function (cb) {
    client.listArticlesByAuthor('biz', cb)
  },
  'article-list-author-6': function (cb) {
    client.listArticlesByAuthor('fizz', 6, cb)
  },
  'article-list-author-favs-0': function (cb) {
    client.listArticlesByAuthorFavorites('fizz', cb)
  },
  'article-list-author-favs-4': function (cb) {
    client.listArticlesByAuthorFavorites('flam', 4, cb)
  },
  'feed-articles-0': function (cb) {
    client.feedArticles(cb)
  },
  'feed-articles-10': function (cb) {
    client.feedArticles(10, cb)
  }
}
