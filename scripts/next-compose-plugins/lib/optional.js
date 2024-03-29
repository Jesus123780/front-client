'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.resolveOptionalPlugin = exports.isOptional = exports.markOptional = exports.OPTIONAL_SYMBOL = void 0
const OPTIONAL_SYMBOL = Symbol('__NEXT_COMPOSE_PLUGINS_OPTIONAL')
/**
 * Marks a plugin as optional
 *
 * @param {function} plugin - function which requires a plugin
 */

exports.OPTIONAL_SYMBOL = OPTIONAL_SYMBOL

const markOptional = plugin => {
  plugin[OPTIONAL_SYMBOL] = true // eslint-disable-line no-param-reassign

  return plugin
}
/**
 * Check if a plugin has been marked as optional before
 *
 * @param {function} plugin - plugin to check
 */


exports.markOptional = markOptional

const isOptional = plugin => { return plugin[OPTIONAL_SYMBOL] === true }
/**
 * Resolve an optional plugin
 *
 * @param {function} plugin - function which requires a plugin
 */


exports.isOptional = isOptional

const resolveOptionalPlugin = plugin => { return plugin() }

exports.resolveOptionalPlugin = resolveOptionalPlugin
