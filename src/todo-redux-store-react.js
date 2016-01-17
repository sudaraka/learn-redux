(() => {
  'use strict';

  const
    Redux = require('redux'),
    React = require('react'),  // eslint-disable-line no-unused-vars
    ReactDOM = require('react-dom'),
    todoApp = require('./todo-store'),

    store = Redux.createStore(todoApp),

    TodoApp = ({ todos }) => {  // eslint-disable-line no-unused-vars
      return <div>
        <input ref={(node) => {
          this.input = node;
        }} />
        <button
          onClick={() => {
            console.log(nextTodoId);
            store.dispatch({
              'type': 'ADD_TODO',
              'text': this.input.value,
              'id': nextTodoId += 1
            });

            this.input.value = '';
          }}
        >Add Todo</button>

        <ul>
        {todos.map(
          (todo) => {
            return <li key={todo.id}>{todo.text}</li>;
          }
        )}
        </ul>
      </div>;
    },

    render = () => {
      ReactDOM.render(
        <TodoApp
          todos={store.getState().todos}
        />,
        document.getElementById('root')
      );
    };

  let nextTodoId = 1;

  store.subscribe(render);
  render();

})();
