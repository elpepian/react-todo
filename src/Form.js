import React, { Component } from 'react';
import './Form.css';

const FormTitle = props => {
	return(
		<h2 className="subtitle mb-3">{props.subTitle}</h2>
	)
}

class Form extends Component {
	constructor(props) {
		super(props)

		this.initialState = {
			text: "",
			status: false,
		}

		this.state = this.initialState
	}

	newTask = event => {
		let { name, value } = event.target

		if (event.target.type==="text") {
			event.target.value = value
		} else if (event.target.type==="checkbox" && event.target.checked) {
			value = true
		} else {
			value = false
		}

		this.setState({
			[name]: value,
		})
	}

	sendTask = () => {
		this.props.addTask(this.state)
		this.setState(this.initialState)
	}

	render() {
		const { text, status } = this.state

		return(
			<div>
				<FormTitle subTitle="Agregar tarea" />

        <form className="form-inline mb-3">
          <label className="sr-only taskNew" htmlFor="taskName">Tarea</label>
          <input 
          	type="text" 
          	className="form-control taskNew mb-2 mr-sm-2" 
          	id="taskName" 
          	placeholder="Ingresa el texto de la tarea" 
          	name="text"
          	value={text} 
          	onChange={this.newTask} />

          <div className="form-check mb-2 mr-sm-3">
            <input 
            	type="checkbox" 
            	className="form-check-input" 
            	id="taskDone"
            	name="status"
            	checked={status} 
            	onChange={this.newTask} />
            <label className="form-check-label" htmlFor="taskDone">
              Completada
            </label>
          </div>

          <button type="button" className="btn btn-primary taskAdd mb-2" onClick={this.sendTask}>Agregar tarea</button>
        </form>
			</div>
		)
	}
}

export default Form;