(() => {
  'use strict';

  const
    expect = require('chai').expect,
    deepFreeze = require('deep-freeze'),
    immutable = require('../src/immutable-object');

  describe('Avoid Object Mutation', () => {

    it('toggleTodo must return new object without mutating the existing object', () => {
      const
        todoBefore = {
          'id': 0,
          'text': 'Learn Redux',
          'completed': false
        };

      let todoAfter;

      deepFreeze(todoBefore);

      todoAfter = immutable.toggleTodo(todoBefore);

      expect(todoBefore.completed).to.be.false;  // eslint-disable-line no-unused-expressions
      expect(todoAfter.completed).to.be.true;  // eslint-disable-line no-unused-expressions
    });

  });

})();
