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

    AddTodo = ({ onAddClick }) => {  // eslint-disable-line no-unused-vars
      let input;

      return <div>
        <input ref={(node) => {
          input = node;
        }} />
        <button
          onClick={() => {
            onAddClick(input.value);

            input.value = '';
          }}
        >Add Todo</button>
      </div>;
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

    FilterLink = ({ filter, currentFilter, children, onClick }) => {  // eslint-disable-line no-unused-vars
      if(filter === currentFilter) {
        return <span>{children}</span>;
      }

      return <a href='#'
        onClick={(e) => {
          e.preventDefault();

          onClick(filter);
        }}
        >{children}</a>;
    },

    Footer = ({ visibilityFilter, onFilterClick }) => {  // eslint-disable-line no-unused-vars
      return <p>
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL' currentFilter={visibilityFilter} onClick={onFilterClick}>All</FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE' currentFilter={visibilityFilter} onClick={onFilterClick}>Active</FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED' currentFilter={visibilityFilter} onClick={onFilterClick}>Completed</FilterLink>
      </p>;
    },

    TodoApp = ({ todos, visibilityFilter }) => {  // eslint-disable-line no-unused-vars
      return <div>
        <AddTodo
          onAddClick={(text) => {
            store.dispatch({
              'type': 'ADD_TODO',
              'id': nextTodoId += 1,
              text
            });
          }}
        />

        <TodoList
          todos={getVisibleTodos(todos, visibilityFilter)}
          onTodoClick={(id) => {
            store.dispatch({
              'type': 'TOGGLE_TODO',
              id
            });
          }}
        />

        <Footer
          visibilityFilter={visibilityFilter}
          onFilterClick={(filter) => {
            store.dispatch({
              'type': 'SET_VISIBILITY_FILTER',
              filter
            });
          }}
        />

      </div>;
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
