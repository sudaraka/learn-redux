(() => {
  'use strict';

  const
    expect = require('chai').expect,
    deepFreeze = require('deep-freeze'),
    immutable = require('../src/immutable');

  describe('Avoid Array Mutation', () => {

    it('addCounter must return new list without mutating the existing list', () => {
      const listBefore = [1];
      let listAfter;

      deepFreeze(listBefore);

      listAfter = immutable.addCounter(listBefore);

      expect(listBefore).not.have.members([0]);
      expect(listAfter).have.members([1, 0]);
    });

    it('removeCounter must return new list without mutating the existing list', () => {
      const listBefore = [0, 10, 20];
      let listAfter;

      deepFreeze(listBefore);

      listAfter = immutable.removeCounter(listBefore, 1);

      expect(listBefore).have.members([0, 10, 20]);
      expect(listAfter).have.members([0, 20]);
      expect(listAfter).not.have.members([10]);
    });

    it('removeCounter must return new list without mutating the existing list', () => {
      const listBefore = [0, 10, 20];
      let listAfter;

      deepFreeze(listBefore);

      listAfter = immutable.incCounter(listBefore, 1);

      expect(listBefore).have.members([0, 10, 20]);
      expect(listAfter).have.members([0, 11, 20]);
      expect(listAfter).not.have.members([10]);
    });

  });

})();
