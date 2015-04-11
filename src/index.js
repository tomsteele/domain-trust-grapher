require('./styles/vendor/normalize.css')
require('./styles/vendor/skeleton.css')
require('./styles/main.styl')
var domready = require('domready')
var React = require('react')
var App = require('./components/app')

domready(function () {
  React.render(<App />, document.body)
})
