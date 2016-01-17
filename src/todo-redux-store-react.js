(() => {
  'use strict';

  const
    Redux = require('redux'),
    React = require('react'),  // eslint-disable-line no-unused-vars
    ReactDOM = require('react-dom'),
    todoApp = require('./todo-store'),

    store = Redux.createStore(todoApp),

    getVisibleTodos = (todos, filter) => {
      if('SHOW_COMPLETED' === filter) {
        return todos.filter((todo) => todo.completed);
      }
      else if('SHOW_ACTIVE' === filter) {
        return todos.filter((todo) => !todo.completed);
      }

      return todos;
    },

    TodoApp = ({ todos, visibilityFilter }) => {  // eslint-disable-line no-unused-vars
      const visibleTodos = getVisibleTodos(todos, visibilityFilter);

      return <div>
        <input ref={(node) => {
          this.input = node;
        }} />
        <button
          onClick={() => {
            store.dispatch({
              'type': 'ADD_TODO',
              'text': this.input.value,
              'id': nextTodoId += 1
            });

            this.input.value = '';
          }}
        >Add Todo</button>

        <ul>
        {visibleTodos.map(
          (todo) => {
            return <li key={todo.id}
              onClick={() => {
                store.dispatch({
                  'type': 'TOGGLE_TODO',
                  'id': todo.id
                });
              }}

              style={{
                'textDecoration': todo.completed ? 'line-through' : 'none'
              }}
            >{todo.text}</li>;
          }
        )}
        </ul>
        <p>
          Show:
          {' '}
          <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter}>All</FilterLink>
          {' '}
          <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter}>Active</FilterLink>
          {' '}
          <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter}>Completed</FilterLink>
        </p>
      </div>;
    },

    FilterLink = ({ filter, currentFilter, children }) => {  // eslint-disable-line no-unused-vars
      if(filter === currentFilter) {
        return <span>{children}</span>;
      }

      return <a href='#'
        onClick={(e) => {
          e.preventDefault();

          store.dispatch({
            'type': 'SET_VISIBILITY_FILTER',
            filter
          });
        }}
        >{children}</a>;
    },

    render = () => {
      ReactDOM.render(
        <TodoApp
          {...store.getState()}
        />,
        document.getElementById('root')
      );
    };

  let nextTodoId = 1;

  store.subscribe(render);
  render();

})();
