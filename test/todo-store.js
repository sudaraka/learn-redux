(() => {
  'use strict';

  const
    expect = require('expect'),
    deepFreeze = require('deep-freeze'),
    todoApp = require('../src/todo-store');

  describe('Todo List', () => {

    it('ADD_TODO must put a new todo item in the store', () => {
      const
        stateBefore = {},
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
        todoApp(stateBefore, action).todos
      ).toEqual(stateAfter);

    });

    it('TOGGLE_TODO must change the matching todo item in the store', () => {
      const
        stateBefore = {
          'todos': [
            {
              'id': 0,
              'text': 'Learn Redux',
              'completed': false
            },
            {
              'id': 1,
              'text': 'Go Shopping',
              'completed': false
            }
          ]
        },
        action = {
          'type': 'TOGGLE_TODO',
          'id': 1
        },
        stateAfter = [
          {
            'id': 0,
            'text': 'Learn Redux',
            'completed': false
          },
          {
            'id': 1,
            'text': 'Go Shopping',
            'completed': true
          }
        ];

      deepFreeze(stateBefore);
      deepFreeze(action);

      expect(
        todoApp(stateBefore, action).todos
      ).toEqual(stateAfter);

    });

  });

})();

