import React, { useState } from 'react'
import './App.css'
import { FilterValuesType, TaskType, Todolist } from './components/Todolist'
import { v1 } from 'uuid'

type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

function App() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'active' },
		{ id: todolistId2, title: 'What to buy', filter: 'completed' }
	])

	const [tasksObj, setTasksObj] = useState({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
			{ id: v1(), title: 'Redux', isDone: false }
		],
		[todolistId2]: [
			{ id: v1(), title: 'Book', isDone: false },
			{ id: v1(), title: 'Milk', isDone: true }
		]
	})

	const removeTask = (id: string, todolistId: string) => {
		let tasks = tasksObj[todolistId]
		let filteredTasks = tasks.filter((t) => t.id !== id)
		tasksObj[todolistId] = filteredTasks
		setTasksObj({ ...tasksObj })
	}

	const addTask = (title: string, todolistId: string) => {
		let task = { id: v1(), title: title, isDone: false }
		let tasks = tasksObj[todolistId]
		let newTask = [task, ...tasks]
		tasksObj[todolistId] = newTask
		setTasksObj({ ...tasksObj })
	}

	const changeFilter = (value: FilterValuesType, todolistId: string) => {
		let todolist = todolists.find((tl) => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}

	const changeStatus = (
		taskId: string,
		isDone: boolean,
		todolistId: string
	) => {
		let tasks = tasksObj[todolistId]
		let task = tasks.find((t) => t.id === taskId)
		if (task) {
			task.isDone = isDone
			setTasksObj({ ...tasksObj })
		}
	}

	const removeTodolist = (todolistId: string) => {
		let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
		setTodolists(filteredTodolists)
		delete tasksObj[todolistId]
		setTasksObj({ ...tasksObj })
	}

	return (
		<div className='App'>
			{todolists.map((tl) => {
				let tasksForTodolist = tasksObj[tl.id]
				if (tl.filter === 'completed') {
					tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
				}
				if (tl.filter === 'active') {
					tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
				}
				return (
					<Todolist
						key={tl.id}
						id={tl.id}
						title={tl.title}
						tasks={tasksForTodolist}
						removeTask={removeTask}
						changeFilter={changeFilter}
						addTask={addTask}
						changeStatus={changeStatus}
						removeTodolist={removeTodolist}
						filter={tl.filter}
					/>
				)
			})}
		</div>
	)
}

export default App
