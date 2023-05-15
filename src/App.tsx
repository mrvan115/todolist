import React, { useState } from 'react'
import { v1 } from 'uuid'
import './App.css'
import { TaskType, FilterValuesType } from './components/TodoList'
import TodoList from './components/TodoList'

function App() {
	const titleTask: string = 'What to learn'

	//Data
	const initialTasks: TaskType[] = [
		{ id: v1(), titleTask: 'HTML&CSS', isDone: true },
		{ id: v1(), titleTask: 'JS', isDone: true },
		{ id: v1(), titleTask: 'React', isDone: false }
	]

	//State of data
	const [tasks, setTasks] = useState<TaskType[]>(initialTasks)

	//Filter state
	const [filter, setFilter] = useState<FilterValuesType>('all')

	//Add task
	const addTask = (titleInput: string) => {
		let newTask = { id: v1(), titleTask: titleInput, isDone: false }
		let newTasks = [newTask, ...tasks]
		setTasks(newTasks)
	}

	//Delete data from todolist
	const removeTask = (taskId: string) => {
		let updatedTask = tasks.filter((t) => taskId !== t.id)
		setTasks(updatedTask)
	}

	//Change filter state
	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	//Data filtering
	const getFilteredTasks = (
		tasks: TaskType[],
		filter: FilterValuesType
	): TaskType[] => {
		switch (filter) {
			case 'active':
				return tasks.filter((t) => !t.isDone)
			case 'completed':
				return tasks.filter((t) => t.isDone)
			default:
				return tasks
		}
	}

	// Filtered data
	const filteredTasks: TaskType[] = getFilteredTasks(tasks, filter)

	return (
		<div className='App'>
			<TodoList
				titleTask={titleTask}
				tasks={filteredTasks}
				removeTask={removeTask}
				changeFilter={changeFilter}
				addTask={addTask}
			/>
		</div>
	)
}

export default App
