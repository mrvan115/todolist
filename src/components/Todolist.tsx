import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (title: string) => void
}

export const Todolist: FC<PropsType> = (props) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.ctrlKey && e.key === 'Enter') {
			props.addTask(newTaskTitle)
			setNewTaskTitle('')
		}
	}
	const addTaskHandler = () => {
		props.addTask(newTaskTitle)
		setNewTaskTitle('')
	}
	const onAllClickHandler = () => props.changeFilter('all')
	const onActiveClickHandler = () => props.changeFilter('active')
	const onCompletedClickHandler = () => props.changeFilter('completed')

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input
					value={newTaskTitle}
					onChange={onChangeHandler}
					onKeyDown={onKeyDownHandler}
				/>
				<button onClick={addTaskHandler}>+</button>
			</div>
			<ul>
				{props.tasks.map((t) => {
					const onRemoveHandler = () => props.removeTask(t.id)

					return (
						<li key={t.id}>
							<input type='checkbox' checked={t.isDone} />{' '}
							<span>{t.title}</span>
							<button onClick={onRemoveHandler}>✖️</button>
						</li>
					)
				})}
			</ul>
			<div>
				<button onClick={onAllClickHandler}>All</button>
				<button onClick={onActiveClickHandler}>Active</button>
				<button onClick={onCompletedClickHandler}>Completed</button>
			</div>
		</div>
	)
}
