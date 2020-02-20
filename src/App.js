import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todos from './components/Todos'
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import axios from 'axios';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users/1/todos?_limit=10')
    .then(response => {
      this.setState({todos: response.data})
    });
  }

  markCompleted = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.isCompleted = !todo.isCompleted;
      }
      return todo;
    })});
  }

  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(response => 
      this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id)]}));
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/users/1/todos', {
      title: title, 
      isCompleted: false})
    .then(response => {
      this.setState({todos: [...this.state.todos, response.data]});
    })
  }


    render() {
      return(
        <Router>
          <div className="App">
            <div className='container'>
              <Header />
              <Route exact path='/' render={props => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo}/>
                  <Todos todos={this.state.todos} markCompleted={this.markCompleted} deleteTodo={this.deleteTodo}/>
                </React.Fragment>
              )} />
            <Route path='/about' component={About} />
            </div>
        </div>
      </Router>
      );
    }
}

export default App;
