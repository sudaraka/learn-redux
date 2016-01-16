(() => {
  'use strict';

  const
    expect = require('expect'),
    deepFreeze = require('deep-freeze'),
    todos = require('../src/todo-store');

  describe('Todo List', () => {

    it('ADD_TODO must put a new todo item in the store', () => {
      const
        stateBefore = [],
        action = {
          'type': 'ADD_TODO',
          'id': 0,
          'text': 'Learn Redux'
        },
        stateAfter = [
          {
            'id': 0,
            'text': 'Learn Redux',
            'completed': false
          }
        ];

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(
        todos(stateBefore, action)
      ).toEqual(stateAfter);

    });

  });

})();

