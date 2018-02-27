/* eslint-env mocha */
const expect = require('./chai').expect
const Graph = require('..').Graph
const read = require('..').json.read
const write = require('..').json.write

describe('json', function () {
  it('preserves the graph options', function () {
    expect(rw(new Graph({ directed: true })).isDirected()).to.equal(true)
    expect(rw(new Graph({ directed: false })).isDirected()).to.equal(false)
    expect(rw(new Graph({ multigraph: true })).isMultigraph()).to.equal(true)
    expect(rw(new Graph({ multigraph: false })).isMultigraph()).to.equal(false)
    expect(rw(new Graph({ compound: true })).isCompound()).to.equal(true)
    expect(rw(new Graph({ compound: false })).isCompound()).to.equal(false)
  })

  it('preserves the graph value, if any', function () {
    expect(rw(new Graph().setGraph(1)).graph()).equals(1)
    expect(rw(new Graph().setGraph({ foo: 'bar' })).graph()).eqls({ foo: 'bar' })
    expect(rw(new Graph()).graph()).to.equal(undefined)
  })

  it('preserves nodes', function () {
    expect(rw(new Graph().setNode('a')).hasNode('a')).to.equal(true)
    expect(rw(new Graph().setNode('a')).node('a')).to.equal(undefined)
    expect(rw(new Graph().setNode('a', 1)).node('a')).equals(1)
    expect(rw(new Graph().setNode('a', { foo: 'bar' })).node('a'))
      .eqls({ foo: 'bar' })
  })

  it('preserves simple edges', function () {
    expect(rw(new Graph().setEdge('a', 'b')).hasEdge('a', 'b')).to.equal(true)
    expect(rw(new Graph().setEdge('a', 'b')).edge('a', 'b')).to.equal(undefined)
    expect(rw(new Graph().setEdge('a', 'b', 1)).edge('a', 'b')).equals(1)
    expect(rw(new Graph().setEdge('a', 'b', { foo: 'bar' })).edge('a', 'b'))
      .eqls({ foo: 'bar' })
  })

  it('preserves multi-edges', function () {
    var g = new Graph({ multigraph: true })

    g.setEdge({ v: 'a', w: 'b', name: 'foo' })
    expect(rw(g).hasEdge('a', 'b', 'foo')).to.equal(true)

    g.setEdge({ v: 'a', w: 'b', name: 'foo' })
    expect(rw(g).edge('a', 'b', 'foo')).to.equal(undefined)

    g.setEdge({ v: 'a', w: 'b', name: 'foo' }, 1)
    expect(rw(g).edge('a', 'b', 'foo')).equals(1)

    g.setEdge({ v: 'a', w: 'b', name: 'foo' }, { foo: 'bar' })
    expect(rw(g).edge('a', 'b', 'foo')).eqls({ foo: 'bar' })
  })

  it('preserves parent / child relationships', function () {
    expect(rw(new Graph({ compound: true }).setNode('a')).parent('a'))
      .to.equal(undefined)
    expect(rw(new Graph({ compound: true }).setParent('a', 'parent')).parent('a'))
      .to.equal('parent')
  })
})

function rw (g) {
  return read(write(g))
}
