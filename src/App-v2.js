import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './TaskList.css';
import './Form.css';

function TaskItem(props) {
	let taskClass = "list-group-item list-group-item-action";
	props.taskStatus ? taskClass = "list-group-item list-group-item-action list-group-item-success taskDone" : taskClass = "list-group-item list-group-item-action";

	return (
		<div className="taskItemWrap">
			<button 
				className={taskClass}
				onClick={props.handleTaskStatus}
				>
					{props.taskNumber}. {props.taskText}
			</button>
			<button 
				className="btn btn-danger taskItemRemove"
				onClick={props.removeTask}
			>
				<FontAwesomeIcon icon={faTrashAlt} />
			</button>
		</div>
	);
}

class TaskList extends Component {
	render() {
		const { listTitle, listItems } = this.props;

		return (
			<section className="col-md-7 col-lg-6">
				<h1 className="main-title my-3">{listTitle}</h1>
				<div className="list-group">
					{!listItems.length ? 
						<div className="list-group-item text-muted">No tienes tareas creadas aún.</div> 
						: 
						listItems}
				</div>
			</section>
		);
	}
}

class AddTaskForm extends Component {
	constructor(props) {
		super(props);

		this.initialState = {
			taskText: '',
			taskStatus: false,
		}
		this.handleChange = this.handleChange.bind(this);
		this.state = this.initialState;
	}

	submitForm = (event) => {
		this.props.handleSubmit(this.state)
		this.setState(this.initialState)
		event.preventDefault();
	}

	handleChange = event => {
		const { name, type, checked } = event.target
		const value = type === "checkbox" ? checked : event.target.value;

		this.setState({
			[name]: value,
		})
	}

	render() {
		const { taskText, taskStatus } = this.state;
		let blockBtn = taskText === "" ? true : false;

		return (
			<section className="col-md-5 col-lg-4 my-4">
				<div className="jumbotron">
					<h2 className="subtitle">{this.props.formTitle}</h2>
					<form onSubmit={this.submitForm}>
						<div className="form-group">
							<label className="sr-only taskNew" htmlFor="taskName">Tarea</label>
		          <input 
		          	type="text" 
		          	className="form-control" 
		          	id="taskName" 
		          	placeholder="Ingresa el texto de la tarea" 
		          	name="taskText" 
		          	value={taskText} 
		          	onChange={this.handleChange} 
		          />
		        </div>

	          <div className="form-group form-check">
	            <input 
	            	type="checkbox" 
	            	className="form-check-input" 
	            	id="taskDone"
	            	name="taskStatus" 
	            	checked={taskStatus} 
	            	onChange={this.handleChange}
	            	/>
	            <label className="form-check-label" htmlFor="taskDone">
	              Completada
	            </label>
	          </div>

	          <button id="submitBtn" className="btn btn-primary taskAdd" disabled={blockBtn}>Agregar tarea</button>
					</form>
				</div>
			</section>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.handleTaskStatus = this.handleTaskStatus.bind(this);
		this.state = {
			tasks: [
				// {
				// 	taskText: "Texto de la primera tarea",
				// 	taskStatus: false,
				// },
				// {
				// 	taskText: "Texto de la tarea número dos",
				// 	taskStatus: true,
				// },
				// {
				// 	taskText: "Este es el texto de la tarea número tres, o sea la tercera tarea.",
				// 	taskStatus: false,
				// },
			]
		}
	}

	handleSubmit = task => {
		this.setState({tasks: [...this.state.tasks, task] })
	}

	removeTask(i) {
		const tasks = this.state.tasks.slice();

		this.setState({
			tasks: tasks.filter((task, index) => {
				return index !== i
			}),
		})
	}

	handleTaskStatus(i) {
		const tasks = this.state.tasks.slice();
		tasks[i].taskStatus = !tasks[i].taskStatus;
		this.setState({tasks: tasks});
	}

	renderListItems(i) {
		return (
			<TaskItem 
				key={i}
				taskNumber={i+1}
				taskText={this.state.tasks[i].taskText} 
				taskStatus={this.state.tasks[i].taskStatus} 
				handleTaskStatus={() => this.handleTaskStatus(i)} 
				removeTask={() => this.removeTask(i)} 
			/>
		);
	}

	render() {
		const tasks = this.state.tasks;
		const listItems = tasks.map((task, index) => {
				return (
					this.renderListItems(index)
				);
			}
		);

		return (
			<div className="container-fluid">
				<div className="row justify-content-md-center flex-row-reverse">
					<TaskList listTitle="Lista de tareas" listItems={listItems} />
					<AddTaskForm formTitle="Agrega una tarea" handleSubmit={this.handleSubmit} />
				</div>
			</div>
		);
	}
}

export default App;
