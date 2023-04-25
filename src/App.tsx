import React from 'react'
import './App.css'
import TodoList from './components/TodoList'

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}
function App(): JSX.Element {
	const tasks: TaskType[] = [
		{ id: 1, title: 'HTML&CSS', isDone: true },
		{ id: 2, title: 'JS', isDone: true },
		{ id: 3, title: 'React', isDone: false }
	]

	const tasks1: TaskType[] = [
		{ id: 1, title: 'HTML&CSS', isDone: false },
		{ id: 2, title: 'JS', isDone: false },
		{ id: 3, title: 'React', isDone: false }
	]

	return (
		<div className='App'>
			<TodoList title={'What to learn'} tasks={tasks} />
			<TodoList title={'What to learn'} tasks={tasks1} />
			{/*<TodoList title={'What to learn'} />*/}
			{/*<TodoList title={'What to learn'} />*/}
		</div>
	)
}

export default App
