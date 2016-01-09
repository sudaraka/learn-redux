(() => {
  'use strict';

  const
    expect = require('chai').expect,
    reducer = require('../src/reducer');

  describe('Reducer', () => {

    describe('Counter', () => {

      it('Increment from 0 must return 1', () => {
        expect(
          reducer.counter(0, { 'type': 'INC' })
        ).to.equal(1);
      });

      it('Increment from 1 must return 2', () => {
        expect(
          reducer.counter(1, { 'type': 'INC' })
        ).to.equal(2);
      });

      it('Decrement from 2 must return 1', () => {
        expect(
          reducer.counter(2, { 'type': 'DEC' })
        ).to.equal(1);
      });

      it('Decrement from 1 must return 0', () => {
        expect(
          reducer.counter(1, { 'type': 'DEC' })
        ).to.equal(0);
      });

      it('Unknown action must return current state', () => {
        expect(
          reducer.counter(5, { 'type': '????' })
        ).to.equal(5);
      });

      it('Defined state must return state 0', () => {
        expect(
          reducer.counter(undefined, {})
        ).to.equal(0);
      });

    });

  });

})();
