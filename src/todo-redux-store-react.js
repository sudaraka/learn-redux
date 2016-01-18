(() => {
  'use strict';

  const
    Redux = require('redux'),
    React = require('react'),  // eslint-disable-line no-unused-vars
    Provider = require('react-redux').Provider,  // eslint-disable-line no-unused-vars
    connect = require('react-redux').connect,  // eslint-disable-line no-unused-vars
    ReactDOM = require('react-dom'),
    todoApp = require('./todo-store'),

    getVisibleTodos = (todos, filter) => {
      if('SHOW_COMPLETED' === filter) {
        return todos.filter((todo) => todo.completed);
      }
      else if('SHOW_ACTIVE' === filter) {
        return todos.filter((todo) => !todo.completed);
      }

      return todos;
    },

    mapStateToLinkProps = (state, ownProps) => {
      return {
        'active': ownProps.filter === state.visibilityFilter
      };
    },

    mapDispatchToLinkProps = (dispatch, ownProps) => {
      return {
        'onClick': () => {
          dispatch({
            'type': 'SET_VISIBILITY_FILTER',
            'filter': ownProps.filter
          });
        }
      };
    },

    mapStateToTodoListProps = (state) => {
      return {
        'todos': getVisibleTodos(state.todos, state.visibilityFilter)
      };
    },

    mapDispatchToTodoListProps = (dispatch) => {
      return {
        'onTodoClick': (id) => {
          dispatch({
            'type': 'TOGGLE_TODO',
            id
          });
        }
      };
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

    Link = ({ active, children, onClick }) => {  // eslint-disable-line no-unused-vars
      if(active) {
        return <span>{children}</span>;
      }

      return <a href='#'
        onClick={(e) => {
          e.preventDefault();

          onClick();
        }}
        >{children}</a>;
    },

    Footer = () => {  // eslint-disable-line no-unused-vars
      return <p>
        Show:
        {' '}
        <FilterLink filter='SHOW_ALL'>All</FilterLink>
        {' '}
        <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
        {' '}
        <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
      </p>;
    },

    VisibleTodoList = connect(mapStateToTodoListProps, mapDispatchToTodoListProps)(TodoList), // eslint-disable-line no-unused-vars
    FilterLink = connect(mapStateToLinkProps, mapDispatchToLinkProps)(Link),  // eslint-disable-line no-unused-vars

    TodoApp = () => {  // eslint-disable-line no-unused-vars
      return <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />

      </div>;
    };

  let
    nextTodoId = 1,

    AddTodo = ({ dispatch }) => {  // eslint-disable-line no-unused-vars
      let input;

      return <div>
        <input ref={(node) => {
          input = node;
        }} />
        <button
          onClick={() => {
            dispatch({
              'type': 'ADD_TODO',
              'id': nextTodoId += 1,
              'text': input.value
            });

            input.value = '';
          }}
        >Add Todo</button>
      </div>;
    };

  AddTodo = connect()(AddTodo);

  ReactDOM.render(
    <Provider store={Redux.createStore(todoApp)}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  );

})();
