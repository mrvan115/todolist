import React, { KeyboardEvent, ChangeEvent, FC, useState } from 'react'

type TodoListPropsType = {
	titleTask: string
	tasks: Array<TaskType>
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (titleInput: string) => void
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
	addTask
}) => {
	const inputLi = tasks.map((t) => {
		return (
			<li key={t.id}>
				<input type='checkbox' checked={t.isDone} /> <span>{t.titleTask}</span>
				<button onClick={() => removeTask(t.id)}>✖️</button>
			</li>
		)
	})

	const allButton = () => changeFilter('all')
	const activeButton = () => changeFilter('active')
	const completedButton = () => changeFilter('completed')

	const [titleInput, setTitleInput] = useState('')

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitleInput(e.currentTarget.value)
	}

	const addTaskCB = () => {
		addTask(titleInput)
		setTitleInput('')
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
					/>
					<button onClick={addTaskCB}>+</button>
				</div>
				<ul>{inputLi}</ul>
				<div>
					<button onClick={allButton}>All</button>
					<button onClick={activeButton}>Active</button>
					<button onClick={completedButton}>Completed</button>
				</div>
			</div>
		</div>
	)
}

export default TodoList
