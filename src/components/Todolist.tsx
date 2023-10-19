import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react'
import { AddItemForm } from './AddItemForm'

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}
export type FilterValuesType = 'all' | 'active' | 'completed'
type PropsType = {
	id: string
	title: string
	tasks: TaskType[]
	removeTask: (id: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (todolistId: string) => void
	filter: FilterValuesType
}

export const Todolist: FC<PropsType> = (props) => {
	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}

	const addTaskHandler = (title: string) => {
		props.addTask(title, props.id)
	}

	return (
		<div>
			<h3>
				{props.title}
				<button onClick={removeTodolist}>✖️</button>
			</h3>
			<AddItemForm addItem={addTaskHandler} />
			<ul>
				{props.tasks.map((t) => {
					const onRemoveHandler = () => props.removeTask(t.id, props.id)
					const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(t.id, e.currentTarget.checked, props.id)
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
