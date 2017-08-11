import { ClassProto, extendClass, createClass } from 'mojs-util-class-proto';

/* --------------------- */
/* The `Tweenable` class */
/* --------------------- */

const TweenableClass = extendClass(ClassProto);
const Super = ClassProto.__mojsClass;

/**
 * `init` - lifecycle initialization function.
 *
 * @private
 * @extends @ ClassProto
 */
TweenableClass.init = function (o) {
  Super.init.call(this, o);
  // proxy all tween public methods to `timeline` with fallback to `tween`
  const methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];
  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];
    this[method] = (...rest) => {
      // eslint-disable-next-line no-unused-expressions
      rest; // otherwise rest arguments got lost
      (this.timeline || this.tween)[method](...rest);
      // return `this` for chaining
      return this;
    };
  }
};

export const Tweenable = createClass(TweenableClass);
export default Tweenable;
