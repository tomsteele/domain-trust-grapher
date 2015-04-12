var Querystring = require('querystring')
var React = require('react')
var Concat = require('concat-stream')
var FileReaderStream = require('filereader-stream')
var Triplesec = require('triplesec')
var Elementer = require('../lib/elementer')
var Graph = require('./graph')

module.exports = React.createClass({
  displayName: 'app',
  getInitialState: function () {
    var cipher = Querystring.parse(window.location.search.replace('?', '')).e
    if (!cipher) {
      return {elements: {}, cipher: ''}
    }
    return {elements: {}, cipher: cipher}
  },
  handleClick: function () {
    if (this.state.cipher) {
      var keyNode = this.refs.key.getDOMNode()
      var key = keyNode.value
      keyNode.value = ''
      Triplesec.decrypt({
        data: new Triplesec.Buffer(this.state.cipher, 'hex'),
        key: new Triplesec.Buffer(key)
      }, function (err, buff) {
        if (err) {
          console.log(err)
          return
        }
        this.setState({elements: JSON.parse(buff.toString())})
      }.bind(this))
      return
    }
    var node = this.refs.file.getDOMNode()
    var file = node.files[0]
    if (typeof file === 'undefined') {
      return
    }
    FileReaderStream(file).pipe(Concat(function (data) {
      this.setState({elements: Elementer(data.toString().trimRight().split('\n'))})
    }.bind(this)))
  },
  render: function () {
    var keyInputClassName = 'hidden'
    if (this.state.cipher !== '') {
      keyInputClassName = 'u-full-width'
    }
    var graph = ''
    if (typeof this.state.elements.nodes !== 'undefined') {
      graph = <Graph elements={this.state.elements} />
    }

    return (
      <div>
        <div className='navbar'>
          <div className='container'>
            <span className='brand'>DOMAIN TRUST GRAPHER</span>
            <ul className='u-pull-right'>
              <li><a href='https://github.com/tomsteele/domain-trust-grapher'><i className='fa fa-github fa-lg'></i></a></li>
            </ul>
          </div>
        </div>
        <div className='container main'>
          <div className='row'>
            <div className='twelve columns'>
              <div>
                <p>Upload a csv generated from <a href='https://github.com/Veil-Framework/PowerTools/tree/master/PowerView'>PowerView</a>. All data is processed in your browser. You should also check out <a href='https://github.com/sixdub/DomainTrustExplorer'>DomainTrustExplorer</a>, created by <a href='https://twitter.com/sixdub'>sixdub</a>, which spawned the idea for this project. For more information on trust exploration and for some sample data, check out this <a href='http://www.harmj0y.net/blog/redteaming/domain-trusts-why-you-should-care/'>post</a> by <a href='https://twitter.com/harmj0y'>harmj0y</a>.</p>
                <p>To generate the csv run:<br /> <code>Invoke-MapDomainTrusts | Export-CSV -NoTypeInformation trusts.csv</code></p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='twelve columns'>
              <div className='middle'>
                <input type='text' ref='key' className={keyInputClassName} placeholder='Key to decrypt querystring'/><br />
                <input type='file' ref='file' /><br />
                <button className='button-primary in-group' onClick={this.handleClick}>Generate Graph</button>
                </div>
              </div>
            </div>
          </div>
        {graph}
      </div>
    )
  }
})
