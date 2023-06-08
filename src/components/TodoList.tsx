import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react'
import { Simulate } from 'react-dom/test-utils'
import error = Simulate.error

type TodoListPropsType = {
	titleTask: string
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (titleInput: string) => void
	resetTasks: () => void
	changeTaskStatus: (taskId: string, isDone: boolean) => void
	filter: FilterValuesType
}

export type TaskType = {
	id: string
	titleTask: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

//-----------------------------------------------------------------------------------
const TodoList: FC<TodoListPropsType> = ({
	titleTask,
	tasks,
	removeTask,
	changeFilter,
	addTask,
	resetTasks,
	changeTaskStatus,
	filter
}) => {
	const inputLi = tasks.map((t) => {
		const onChangeHandlerInLi = (e: ChangeEvent<HTMLInputElement>) => {
			let newStatus = e.currentTarget.checked
			changeTaskStatus(t.id, newStatus)
		}
		return (
			<li key={t.id} className={t.isDone ? 'is-done' : ''}>
				<input
					type='checkbox'
					checked={t.isDone}
					onChange={onChangeHandlerInLi}
				/>{' '}
				<span>{t.titleTask}</span>
				<button onClick={() => removeTask(t.id)}>✖️</button>
			</li>
		)
	})

	const allButton = () => changeFilter('all')
	const activeButton = () => changeFilter('active')
	const completedButton = () => changeFilter('completed')

	const [titleInput, setTitleInput] = useState('')
	const [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleInput(e.currentTarget.value)
		setError(null)
	}

	const addTaskCB = () => {
		if (titleInput.trim() !== '') {
			addTask(titleInput)
			setTitleInput('')
		} else {
			setError('Title is required')
		}
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>
		e.key === 'Enter' ? addTaskCB() : ''

	return (
		<div>
			<div className='todolist'>
				<h3>{titleTask}</h3>
				<div>
					<input
						value={titleInput}
						onChange={onChangeHandler}
						onKeyDown={onKeyPressHandler}
						className={error ? 'error' : ''}
					/>
					<button onClick={addTaskCB}>+</button>
					{error && <div className='error-messege'>{error}</div>}
				</div>
				<ul>{inputLi}</ul>
				<div>
					<button
						className={filter === 'all' ? 'active-filter' : ''}
						onClick={allButton}
					>
						All
					</button>
					<button
						className={filter === 'active' ? 'active-filter' : ''}
						onClick={activeButton}
					>
						Active
					</button>
					<button
						className={filter === 'completed' ? 'active-filter' : ''}
						onClick={completedButton}
					>
						Completed
					</button>
					<button className='reset' onClick={resetTasks}>
						Reset
					</button>
				</div>
			</div>
		</div>
	)
}

export default TodoList
