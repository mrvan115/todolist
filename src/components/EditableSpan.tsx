import React, { ChangeEvent, FC, useState } from 'react'
import { TextField } from '@mui/material'

type EditableSpanPropsType = {
	title: string
	onChange: (newValue: string) => void
}

export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
	const [editMode, setEditMode] = useState<boolean>(false)
	const [title, setTitle] = useState('')

	const activateEditMode = () => {
		setEditMode(true)
		setTitle(props.title)
	}

	const activateViewMode = () => {
		setEditMode(false)
	}

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
		props.onChange(title)
	}

	return editMode ? (
		<TextField
			variant={'standard'}
			value={title}
			onChange={onChangeTitleHandler}
			onBlur={activateViewMode}
			autoFocus
		/>
	) : (
		<span onDoubleClick={activateEditMode}>{props.title}</span>
	)
}
