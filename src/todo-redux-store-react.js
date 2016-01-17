(() => {
  'use strict';

  const
    Redux = require('redux'),
    React = require('react'),  // eslint-disable-line no-unused-vars
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

    AddTodo = (props, { store }) => {  // eslint-disable-line no-unused-vars
      let input;

      return <div>
        <input ref={(node) => {
          input = node;
        }} />
        <button
          onClick={() => {
            store.dispatch({
              'type': 'ADD_TODO',
              'id': nextTodoId += 1,
              'text': input.value
            });

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

    TodoApp = () => {  // eslint-disable-line no-unused-vars
      return <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />

      </div>;
    };

  let nextTodoId = 1;

  class FilterLink extends React.Component {  // eslint-disable-line no-unused-vars
    componentDidMount() {
      const { store } = this.context;

      this.unsubscribe = store.subscribe(() => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const
        props = this.props,
        { store } = this.context,
        state = store.getState();

      return <Link
        active={props.filter === state.visibilityFilter}

        onClick={() => {
          store.dispatch({
            'type': 'SET_VISIBILITY_FILTER',
            'filter': props.filter
          });
        }}
      >{props.children}</Link>;
    }
  }

  class VisibleTodoList extends React.Component {  // eslint-disable-line no-unused-vars
    componentDidMount() {
      const { store } = this.context;

      this.unsubscribe = store.subscribe(() => {
        this.forceUpdate();
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    render() {
      const
        { store } = this.context,
        state = store.getState();

      return <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}

        onTodoClick={(id) => {
          store.dispatch({
            'type': 'TOGGLE_TODO',
            id
          });
        }}
      />;
    }
  }

  class Provider extends React.Component {  // eslint-disable-line no-unused-vars
    getChildContext() {
      return {
        'store': this.props.store
      };
    }

    render() {
      return this.props.children;
    }
  }

  Provider.childContextTypes = {
    'store': React.PropTypes.object
  };

  FilterLink.contextTypes = {
    'store': React.PropTypes.object
  };

  VisibleTodoList.contextTypes = {
    'store': React.PropTypes.object
  };

  AddTodo.contextTypes = {
    'store': React.PropTypes.object
  };

  ReactDOM.render(
    <Provider store={Redux.createStore(todoApp)}>
      <TodoApp />
    </Provider>,
    document.getElementById('root')
  );

})();
