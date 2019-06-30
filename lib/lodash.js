/* global window */

var lodash = {}

if (typeof require === 'function') {
  try {
    lodash['clone'] = require('lodash/clone')
    lodash['constant'] = require('lodash/constant')
    lodash['each'] = require('lodash/each')
    lodash['filter'] = require('lodash/filter')
    lodash['has'] = require('lodash/has')
    lodash['isArray'] = require('lodash/isArray')
    lodash['isEmpty'] = require('lodash/isEmpty')
    lodash['isFunction'] = require('lodash/isFunction')
    lodash['isUndefined'] = require('lodash/isUndefined')
    lodash['keys'] = require('lodash/keys')
    lodash['map'] = require('lodash/map')
    lodash['reduce'] = require('lodash/reduce')
    lodash['size'] = require('lodash/size')
    lodash['transform'] = require('lodash/transform')
    lodash['union'] = require('lodash/union')
    lodash['values'] = require('lodash/values')
  } catch (e) {}
}

if (!lodash) {
  lodash = window._
}

module.exports = lodash
