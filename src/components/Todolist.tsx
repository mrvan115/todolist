import React, { ChangeEvent, KeyboardEvent, FC, useState } from 'react'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { Button, Checkbox, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

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
	changeTaskTitle: (
		taskId: string,
		newTitle: string,
		todolistId: string
	) => void
	removeTodolist: (todolistId: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
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
	const changeTodolistTitleHandler = (newTitle: string) => {
		props.changeTodolistTitle(props.id, newTitle)
	}
	const addTaskHandler = (title: string) => {
		props.addTask(title, props.id)
	}

	return (
		<div>
			<h3>
				<EditableSpan
					title={props.title}
					onChange={changeTodolistTitleHandler}
				/>
				<IconButton aria-label='delete' onClick={removeTodolist}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTaskHandler} />
			<ul>
				{props.tasks.map((t) => {
					const onRemoveHandler = () => props.removeTask(t.id, props.id)
					const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
						props.changeStatus(t.id, e.currentTarget.checked, props.id)
					}
					const onChangeTitleHandler = (newValue: string) => {
						props.changeTaskTitle(t.id, newValue, props.id)
					}
					return (
						<li key={t.id} className={t.isDone ? 'is-done' : ''}>
							<Checkbox onChange={onChangeStatusHandler} checked={t.isDone} />
							<EditableSpan title={t.title} onChange={onChangeTitleHandler} />
							<IconButton aria-label='delete' onClick={onRemoveHandler}>
								<DeleteForeverIcon color={'secondary'} />
							</IconButton>
						</li>
					)
				})}
			</ul>
			<div>
				<Button
					color={'primary'}
					variant={props.filter === 'all' ? 'contained' : 'text'}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					color={'secondary'}
					variant={props.filter === 'active' ? 'contained' : 'text'}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					color={'success'}
					variant={props.filter === 'completed' ? 'contained' : 'text'}
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	)
}
