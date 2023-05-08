import React, { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList'
import { TaskType, FilterValuesType } from './components/TodoList'

function App() {
	const title: string = 'What to learn'

	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'React', isDone: false }
	])

	const [filter, setFilter] = useState<FilterValuesType>('all')

	//Удаление тасок из тудулиста
	const removeTask = (taskId: number) => {
		let updatedTask = tasks.filter((t) => taskId !== t.id)
		setTasks(updatedTask)
	}

	//Фильтрация тасок
	const getFilteredTasks = (
		tasks: Array<TaskType>,
		filter: FilterValuesType
	): Array<TaskType> => {
		switch (filter) {
			case 'active':
				return tasks.filter((t) => !t.isDone)
			case 'completed':
				return tasks.filter((t) => t.isDone)
			default:
				return tasks
		}
	}

	const changeFilter = (filter: FilterValuesType) => {
		setFilter(filter)
	}

	const filteredTasks: Array<TaskType> = getFilteredTasks(tasks, filter)

	return (
		<div className='App'>
			<TodoList
				title={title}
				tasks={filteredTasks}
				removeTask={removeTask}
				changeFilter={changeFilter}
			/>
		</div>
	)
}

export default App
