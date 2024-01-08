import React, { useState } from 'react'
import './App.css'
import { FilterValuesType, TaskType, Todolist } from './components/Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './components/AddItemForm'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material/'
import MenuIcon from '@mui/icons-material/Menu'
import { Container, Grid, Paper } from '@mui/material'

export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}
export type TasksStateType = {
	[key: string]: TaskType[]
}

function App() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	const [todolists, setTodolists] = useState<TodolistType[]>([
		{ id: todolistId1, title: 'What to learn', filter: 'active' },
		{ id: todolistId2, title: 'What to buy', filter: 'completed' }
	])
	const [tasksObj, setTasksObj] = useState<TasksStateType>({
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
		//достаем нужный массив по todolistId
		let tasks = tasksObj[todolistId]
		//найдём нужную таску
		let task = tasks.find((t) => t.id === taskId)
		//изменим таску, если она нашлась
		if (task) {
			task.isDone = isDone
			setTasksObj({ ...tasksObj })
		}
	}

	const removeTodolist = (todolistId: string) => {
		let filteredTodolists = todolists.filter((tl) => tl.id !== todolistId)
		setTodolists(filteredTodolists)
		delete tasksObj[todolistId]
		//засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasksObj({ ...tasksObj })
	}
	const changeTodolistTitle = (id: string, newTitle: string) => {
		let todolist = todolists.find((tl) => tl.id === id)
		if (todolist) {
			todolist.title = newTitle
			setTodolists([...todolists])
		}
	}
	const changeTaskTitle = (
		taskId: string,
		newTitle: string,
		todolistId: string
	) => {
		//достаем нужный массив по todolistId
		let tasks = tasksObj[todolistId]
		//найдём нужную таску
		let task = tasks.find((t) => t.id === taskId)
		//изменим таску, если она нашлась
		if (task) {
			task.title = newTitle
			//засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasksObj({ ...tasksObj })
		}
	}
	const addTodolistHandler = (title: string) => {
		let todolist: TodolistType = {
			id: v1(),
			title: title,
			filter: 'all'
		}
		setTodolists([todolist, ...todolists])
		setTasksObj({ ...tasksObj, [todolist.id]: [] })
	}

	return (
		<div className='App'>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='menu'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						TODO
					</Typography>
					<Button color='inherit'>Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ margin: '30px 0px 30px 0px' }}>
					<AddItemForm addItem={addTodolistHandler} />
				</Grid>
				<Grid container spacing={5}>
					{todolists.map((tl) => {
						let tasksForTodolist = tasksObj[tl.id]
						if (tl.filter === 'completed') {
							tasksForTodolist = tasksForTodolist.filter((t) => t.isDone)
						}
						if (tl.filter === 'active') {
							tasksForTodolist = tasksForTodolist.filter((t) => !t.isDone)
						}
						return (
							<Grid item>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeStatus={changeStatus}
										changeTaskTitle={changeTaskTitle}
										removeTodolist={removeTodolist}
										changeTodolistTitle={changeTodolistTitle}
										filter={tl.filter}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default App
