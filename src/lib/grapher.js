var Cytoscape = require('cytoscape/dist/cytoscape.min.js')

module.exports = function (elements, container) {
  return Cytoscape({
    container: container,
    style: [
      {
        selector: 'node',
        css: {
          'width': 'data(width)',
          'height': '50px',
          'background-color': '#f1c40f',
          'background-opacity': 0.5,
          'border-color': '#000000',
          'border-width': '1',
          'border-style': 'solid',
          'shape': 'rectangle',
          'content': 'data(id)',
          'text-valign': 'center',
          'text-halign': 'center'
        }
      },
      {
        selector: '$node > node',
        css: {
          'text-valign': 'center',
          'text-halign': 'center'
        }
      },
      {
        selector: 'edge',
        css: {
          'width': '2px',
          'target-arrow-shape': 'triangle',
          'mid-target-arrow-shape': 'triangle',
          'line-color': 'data(color)',
          'source-arrow-color': 'data(color)',
          'target-arrow-color': 'data(color)',
          'mid-target-arrow-color': 'data(color)'
        }
      },
      {
        selector: ':selected',
        css: {
          'background-color': 'black',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black'
        }
      }
    ],
    elements: elements,
    layout: {
      name: 'breadthfirst',
      fit: true,
      directed: false,
      padding: 10,
      circle: false,
      boundingBox: undefined,
      avoidOverlap: true,
      roots: undefined,
      maximalAdjustments: 0,
      animate: true,
      animationDuration: 500,
      ready: undefined,
      stop: undefined
    }
  })
}
