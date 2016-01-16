(() => {
  'use strict';

  const
    expect = require('expect'),
    deepFreeze = require('deep-freeze'),
    immutable = require('../src/immutable-array');

  describe('Avoid Array Mutation', () => {

    it('addCounter must return new list without mutating the existing list', () => {
      const
        listBefore = [1],
        listAfter = [1, 0];

      deepFreeze(listBefore);

      expect(
        immutable.addCounter(listBefore)
      ).toEqual(listAfter);

    });

    it('removeCounter must return new list without mutating the existing list', () => {
      const
        listBefore = [0, 10, 20],
        listAfter = [0, 20];

      deepFreeze(listBefore);

      expect(
        immutable.removeCounter(listBefore, 1)
      ).toEqual(listAfter);

    });

    it('incCounter must return new list without mutating the existing list', () => {
      const
        listBefore = [0, 10, 20],
        listAfter = [0, 11, 20];

      deepFreeze(listBefore);

      expect(
        immutable.incCounter(listBefore, 1)
      ).toEqual(listAfter);

    });

  });

})();
