import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "@/components/TodolistItem.styles.ts";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "@/common/components/EditableSpan/EditableSpan.tsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from "@/features/todolists/model/tasks-reducer.ts";
import {ChangeEvent} from "react";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";

type Props = {
    todolist: Todolist,
    task: Task
}

export const TaskItem = ({todolist, task}: Props) => {
    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId: todolist.id, taskId: task.id}))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const newStatusValue = e.currentTarget.checked
        dispatch(changeTaskStatusAC({todolistId: todolist.id, taskId: task.id, isDone: newStatusValue}))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId: todolist.id, taskId: task.id, title}))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatus}/>
                <EditableSpan value={task.title} onChange={changeTaskTitle}/>
            </div>
            <IconButton onClick={deleteTask}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};
