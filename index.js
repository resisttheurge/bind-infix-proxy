'use strict'

/**
 * Given a function that takes n parameters, returns a proxy of that function
 * that takes n - 1 parameters and can be called with an infix bind operator.
 * The bound value will be provided to the given function as its first parameter,
 * followed by any additional arguments passed to the proxy.
 *
 * @param  {function} target the function to make infix.
 * @return {function}   A proxy of the given function that can be called with an
 *                      infix bind operator
 */
const infix = target =>
  new Proxy(target, {
    apply: function (target, thisArg, argumentList) {
      return target(thisArg, ...argumentList)
    },
    get: function (target, key) {
      switch (key) {
        case 'length':
          return target.length > 0
            ? target.length - 1
            : target.length
        default:
          return target[key]
      }
    }
  })

module.exports = infix
