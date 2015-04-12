var React = require('react')
var Grapher = require('../lib/grapher')

var cy
var png = ''
module.exports = React.createClass({
  componentDidUpdate: function () {
    if (typeof this.props.elements.nodes === 'undefined') {
      return
    }
    cy = Grapher(this.props.elements, this.refs.cy.getDOMNode())
  },
  handleClick: function () {
    png = cy.png()
    var node = this.refs.download.getDOMNode()
    node.className = 'button button-primary'
    node.href = png
  },
  render: function () {
    if (!this.props.elements.nodes) {
      return (
        <div>
          <div ref='cy' className='cy'></div>
        </div>
      )
    }
    return (
      <div>
        <div className='row'>
          <div className='twelve columns middle'>
            <button className='button button-primary in-group' onClick={this.handleClick}>Generate PNG</button>
            <a ref='download' className='button button-primary hidden' download='graph.png'>Download PNG</a>
          </div>
        </div>
        <div ref='cy' className='cy outline'></div>
      </div>
    )
  }
})
