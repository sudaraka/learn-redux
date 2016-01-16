(() => {
  'use strict';

  const
    expect = require('expect'),
    reducer = require('../src/reducer');

  describe('Reducer - Counter Store', () => {

    it('Increment from 0 must return 1', () => {
      expect(
        reducer.counter(0, { 'type': 'INC' })
      ).toEqual(1);
    });

    it('Increment from 1 must return 2', () => {
      expect(
        reducer.counter(1, { 'type': 'INC' })
      ).toEqual(2);
    });

    it('Decrement from 2 must return 1', () => {
      expect(
        reducer.counter(2, { 'type': 'DEC' })
      ).toEqual(1);
    });

    it('Decrement from 1 must return 0', () => {
      expect(
        reducer.counter(1, { 'type': 'DEC' })
      ).toEqual(0);
    });

    it('Unknown action must return current state', () => {
      expect(
        reducer.counter(5, { 'type': '????' })
      ).toEqual(5);
    });

    it('Defined state must return state 0', () => {
      expect(
        reducer.counter()  // state = undefined
      ).toEqual(0);
    });

  });

})();
