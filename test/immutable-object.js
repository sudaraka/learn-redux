(() => {
  'use strict';

  const
    expect = require('expect'),
    deepFreeze = require('deep-freeze'),
    immutable = require('../src/immutable-object');

  describe('Avoid Object Mutation', () => {

    it('toggleTodo must return new object without mutating the existing object', () => {
      const
        todoBefore = {
          'id': 0,
          'text': 'Learn Redux',
          'completed': false
        },
        todoAfter = {
          'id': 0,
          'text': 'Learn Redux',
          'completed': true
        };

      deepFreeze(todoBefore);

      expect(
        immutable.toggleTodo(todoBefore)
      ).toEqual(todoAfter);

    });

  });

})();
