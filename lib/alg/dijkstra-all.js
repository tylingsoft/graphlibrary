const dijkstra = require('./dijkstra')
const _ = require('../lodash')

module.exports = dijkstraAll

function dijkstraAll (g, weightFunc, edgeFunc) {
  return _.transform(g.nodes(), function (acc, v) {
    acc[v] = dijkstra(g, v, weightFunc, edgeFunc)
  }, {})
}
