module.exports = function (data) {
  var elements = {
    nodes: [],
    edges: []
  }

  // Check if we need to start at index 1 as the first line in the csv file
  // could be the field types.
  var s = 0
  if (data.length < 1) {
    return elements
  }
  if (data[0] === '"SourceDomain","TargetDomain","TrustType","TrustDirection"' || data[0] === 'SourceDomain,TargetDomain,TrustType,TrustDirection') {
    s = 1
  }
  for (var i = s; i < (data.length - 1); i++) {
    var parts = data[i].replace(/\"/g, '').split(',')
    if (parts.length < 4) {
      continue
    }
    var source = parts[0].toUpperCase()
    var target = parts[1].toUpperCase()
    var trustType = parts[2].toUpperCase()
    var trustDirection = parts[3].toUpperCase()
    elements.nodes.push({
      data: {
        id: source,
        width: (source.length * 16) + 'px'
      }
    })
    elements.nodes.push({
      data: {
        id: target,
        width: (target.length * 16) + 'px'
      }
    })
    var color = ''
    switch (trustType) {
      case 'CROSSLINK':
        color = '#3498db'
        break
      case 'PARENTCHILD':
        color = '#e74c3c'
        break
      case 'EXTERNAL':
        color = '#1abc9c'
        break
    }
    switch (trustDirection) {
      case 'BIDIRECTIONAL':
        elements.edges.push({
          data: {
            id: source + target,
            source: source,
            target: target,
            color: color
          }
        })
        elements.edges.push({
          data: {
            id: target + source,
            source: target,
            target: source,
            color: color
          }
        })
        break
      case 'OUTBOUND':
        elements.edges.push({
          data: {
            id: target + source,
            source: target,
            target: source,
            color: color
          }
        })
        break
      case 'INBOUND':
        elements.edges.push({
          data: {
            id: source + target,
            source: source,
            target: target,
            color: color
          }
        })
        break
    }
  }
  return elements
}
