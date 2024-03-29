/* eslint-disable no-var */
'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mergePhaseConfiguration = exports.isInCurrentPhase = void 0

function _objectSpread (target) { for (let i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; let ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable })) } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]) }) } return target }

function _defineProperty (obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true }) } else { obj[key] = value } return obj }

/**
 * Check if the current phase is in the phase config and so a plugin should get applied
 *
 * @param {string} currentPhase - current phase
 * @param {array|string} phaseConfig - phase config in an array ([PHASE1, PHASE2])
 *                                     or string (PHASE1 + PHASE2)
 */
const isInCurrentPhase = (currentPhase, phaseConfig) => {
  // phase config can be an array or string, so always convert it to a string
  const parsedPhaseConfig = phaseConfig instanceof Array ? phaseConfig.join('') : phaseConfig // negate the check

  if (parsedPhaseConfig.substr(0, 1) === '!') {
    return parsedPhaseConfig.indexOf(currentPhase) < 0
  }

  return parsedPhaseConfig.indexOf(currentPhase) >= 0
}
/**
 * Merge the configuration of a plugin with specific values only applied on the current phase
 *
 * @param {string} currentPhase - current phase
 * @param {object} config - plugin configuration
 */


exports.isInCurrentPhase = isInCurrentPhase

const mergePhaseConfiguration = (currentPhase, config) => {
  let mergedConfig = {}
  Object.keys(config).forEach(key => {
    if (key.startsWith('phase-') || key.startsWith('!phase-')) {
      if (isInCurrentPhase(currentPhase, key)) {
        mergedConfig = _objectSpread({}, mergedConfig, config[key])
      }
    } else {
      mergedConfig[key] = config[key]
    }
  })
  return mergedConfig
}

exports.mergePhaseConfiguration = mergePhaseConfiguration
