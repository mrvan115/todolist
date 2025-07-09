import {ChangeEvent, useState} from "react";
import TextField from "@mui/material/TextField";

type Props = {
    value: string
    onChange: (title: string) => void
}

export const EditableSpan = (props: Props) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.value)

    const turnOnEditMode = () => {
        setIsEditMode(true)
    }

    const turnOffEditMode = () => {
        setIsEditMode(false)
        props.onChange(title)
    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        <>
            {isEditMode ? (
                <TextField variant={'outlined'}
                           value={title}
                           size={'small'}
                           onChange={changeTitle}
                           onBlur={turnOffEditMode}
                           autoFocus/>
            ) : (
                <span onDoubleClick={turnOnEditMode}>{props.value}</span>
            )}
        </>
    )
};
