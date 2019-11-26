import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './TaskList.css';

const TaskListTitle = props => {
	return(
		<h1 className="main-title my-3">{props.listTitle}</h1>
	)
}

const TaskListBody = props => {
	let addClass = "list-group-item list-group-item-action"

	const tasks = props.tasksListItems.map((task, index) => {

		if (task.status) {
			addClass = "list-group-item list-group-item-action list-group-item-success taskDone"
		} else {
			addClass = "list-group-item list-group-item-action"
		}

		return(
			<div className="taskItemWrap" key={index}>
				<button className={addClass} onClick={() => props.changeStatus(index)}>{task.text}</button>
				<button className="btn btn-danger taskItemRemove" onClick={() => props.removeTask(index)}>
					<FontAwesomeIcon icon={faTrashAlt} />
				</button>	
			</div>
		)
	})
	return(
		<div className="list-group mb-4">
			{tasks}
		</div>
	)
}

class TaskList extends Component {
	render() {
		const { tasksListItems, removeTask, changeStatus } = this.props

		return (
			<div>
				<TaskListTitle listTitle="Lista de tareas" />
				<TaskListBody tasksListItems={tasksListItems} removeTask={removeTask} changeStatus={changeStatus} />
			</div>
	  )
	}
}

export default TaskList;