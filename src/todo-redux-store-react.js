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

    Todo = ({ text, completed, onClick }) => {  // eslint-disable-line no-unused-vars
      return <li
        onClick={onClick}

        style={{
          'textDecoration': completed ? 'line-through' : 'none'
        }}
      >{text}</li>;
    },

    TodoList = ({ todos, onTodoClick }) => {  // eslint-disable-line no-unused-vars
      return <ul>
        {todos.map((todo) => <Todo
          key={todo.id}
          {...todo}
          onClick={() => onTodoClick(todo.id) }
        />)}
      </ul>;
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

        <TodoList
          todos={visibleTodos}
          onTodoClick={(id) => {
            store.dispatch({
              'type': 'TOGGLE_TODO',
              id
            });
          }}
        />

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
