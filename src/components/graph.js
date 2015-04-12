var React = require('react')
var Triplesec = require('triplesec')
var Grapher = require('../lib/grapher')

var cy
var png = ''
module.exports = React.createClass({
  getInitialState: function () {
    return {key: '', link: ''}
  },
  componentDidMount: function () {
    cy = Grapher(this.props.elements, this.refs.cy.getDOMNode())
  },
  handleShareClick: function () {
    var key = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 20)
    Triplesec.encrypt({
      data: new Triplesec.Buffer(JSON.stringify(this.props.elements)),
      key: new Triplesec.Buffer(key)
    }, function (err, buff) {
      if (err) {
        return
      }
      this.setState({
        link: window.location.origin + '/?e=' + buff.toString('hex'),
        key: key
      })
    }.bind(this))
  },
  handlePNGClick: function () {
    png = cy.png()
    var node = this.refs.download.getDOMNode()
    node.className = 'button button-primary'
    node.href = png
  },
  render: function () {
    return (
      <div>
        <div className='row'>
          <div className='twelve columns middle'>
            <button className='button button-primary in-group' onClick={this.handleShareClick}>Encrypt &amp; Share</button>
            <button className='button button-primary in-group' onClick={this.handlePNGClick}>Generate PNG</button>
            <a ref='download' className='button button-primary hidden' download='graph.png'>Download PNG</a>
            <div className={this.state.link === '' ? 'hidden' : ''}>
              Friends can go <a href={this.state.link}>here</a> and use the key {this.state.key} to decrypt and view this graph.
            </div>
          </div>
        </div>
        <div ref='cy' className='cy outline'></div>
      </div>
    )
  }
})
