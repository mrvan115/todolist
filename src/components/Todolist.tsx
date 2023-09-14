import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error

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
	changeStatus: (taskId: string, isDone: boolean) => void
	filter: FilterValuesType
}

export const Todolist: FC<PropsType> = (props) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
		setError(null)
	}

	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.ctrlKey && e.key === 'Enter') {
			if (newTaskTitle.trim() !== '') {
				props.addTask(newTaskTitle)
				setNewTaskTitle('')
			} else {
				setError('Title is required')
			}
		}
	}

	const addTaskHandler = () => {
		if (newTaskTitle.trim() !== '') {
			props.addTask(newTaskTitle)
			setNewTaskTitle('')
		} else {
			setError('Title is required')
		}
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
					className={error ? 'error' : ''}
				/>
				<button onClick={addTaskHandler}>+</button>
				{error && <div className='error-message'>{error}</div>}
			</div>
			<ul>
				{props.tasks.map((t) => {
					const onRemoveHandler = () => props.removeTask(t.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(t.id, e.currentTarget.checked)
					}
					return (
						<li key={t.id} className={t.isDone ? 'is-done' : ''}>
							<input
								type='checkbox'
								onChange={onChangeHandler}
								checked={t.isDone}
							/>{' '}
							<span>{t.title}</span>
							<button onClick={onRemoveHandler}>✖️</button>
						</li>
					)
				})}
			</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'active-filter' : ''}
					onClick={onActiveClickHandler}
				>
					Active
				</button>
				<button
					className={props.filter === 'completed' ? 'active-filter' : ''}
					onClick={onCompletedClickHandler}
				>
					Completed
				</button>
			</div>
		</div>
	)
}
