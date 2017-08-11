import Tween from 'mojs-tween';
import Timeline from 'mojs-timeline';
import ClassProto from 'mojs-util-class-proto';

import Tweenable from '../src/tweenable.babel.js';

describe('tweenable ->', function () {
  describe('extension ->', function() {
    it('should extend `Tween`', function () {
      var tweenable = Tweenable();

      expect(ClassProto.__mojsClass.isPrototypeOf(tweenable)).toBe(true);
    });
  });

  describe('tween public methods proxy #timeline ->', function() {
    var tweenable = Tweenable();
    tweenable.tween = new Tween;
    tweenable.timeline = new Timeline;

    it('should proxy public methods of `Tween`', function () {
      var methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];

      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        spyOn(tweenable.timeline, method);
        const args = [ Math.random(), Math.random(), Math.random(), Math.random() ];
        tweenable[method](args[0], args[1], args[2], args[3]);
        expect(tweenable.timeline[method]).toHaveBeenCalledWith(args[0], args[1], args[2], args[3]);
      }
    });
  });

  describe('tween public methods proxy if no timeline #tween ->', function() {
    var tweenable = Tweenable();
    tweenable.tween = new Tween;

    it('should proxy public methods of `Tween`', function () {
      var methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];

      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        spyOn(tweenable.tween, method);
        const args = [ Math.random(), Math.random(), Math.random(), Math.random() ];
        tweenable[method](args[0], args[1], args[2], args[3]);
        expect(tweenable.tween[method]).toHaveBeenCalledWith(args[0], args[1], args[2], args[3]);
      }
    });

    it('should return this for the proxied methods', function () {
      var methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];

      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        spyOn(tweenable.tween, method);
        const args = [ Math.random(), Math.random(), Math.random(), Math.random() ];
        const result = tweenable[method](args[0], args[1], args[2], args[3]);
        expect(result).toBe(tweenable);
      }
    });
  });
});
