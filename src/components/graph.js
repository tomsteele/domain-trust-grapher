var React = require('react')
var Grapher = require('../lib/grapher')

module.exports = React.createClass({
  componentDidUpdate: function () {
    if (typeof this.props.elements.nodes === 'undefined') {
      return
    }
    Grapher(this.props.elements, this.refs.cy.getDOMNode())
  },
  render: function () {
    return (
      <div>
        <div ref='cy' className='cy'></div>
      </div>
    )
  }
})
