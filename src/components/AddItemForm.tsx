import { ChangeEvent, FC, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'

type AddItemFormPropsType = {
	addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
		setError(null)
	}
	const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.ctrlKey && e.key === 'Enter') {
			if (newTaskTitle.trim() !== '') {
				props.addItem(newTaskTitle)
				setNewTaskTitle('')
			} else {
				setError('Title is required')
			}
		}
	}
	const addTaskHandler = () => {
		if (newTaskTitle.trim() !== '') {
			props.addItem(newTaskTitle)
			setNewTaskTitle('')
		} else {
			setError('Title is required')
		}
	}

	return (
		<div>
			<TextField
				variant={'outlined'}
				label={'Type value'}
				value={newTaskTitle}
				onChange={onChangeHandler}
				onKeyDown={onKeyDownHandler}
				error={!!error}
				helperText={error}
			/>
			<IconButton color={'primary'} size={'small'} onClick={addTaskHandler}>
				<AddBoxIcon />
			</IconButton>
		</div>
	)
}
