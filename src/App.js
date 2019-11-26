import React, { Component } from 'react';
import './App.css';
import TaskList from './TaskList';
import Form from './Form';

class App extends Component {

  state = {
    tasks: []
  }

  // changeStatus = index => {
  //   const { tasks } = this.state

  //   this.setState({ 
  //     // tasks[index].status

  //     // tasks: [...this.state.tasks, tasks[index].status = false]

  //         // text: tasks[index].text,
  //         // status: false,
  //         // tasks[index].state = false,
  //   })

  //   // console.log(index)
  //   // console.log(tasks[index].text)
  //   // console.log(tasks[index].status)
  // }

  removeTask = index => {
    const { tasks } = this.state

    this.setState({
      tasks: tasks.filter((task, i) => {
        return i !== index
      }),
    })
  }

  addTask = task => {
    this.setState({ tasks: [...this.state.tasks, task] })
  }

  render () {
    const { tasks } = this.state

    return (
      <div className="container">

        <TaskList tasksListItems={tasks} removeTask={this.removeTask} changeStatus={this.changeStatus} />
        <Form addTask={this.addTask} />
      </div>
    );
  }
}

export default App;
