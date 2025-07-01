import {FilterValues, Task, Todolist} from "../app/App.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import {containerSx, getListItemSx} from "./TodolistItem.styles.ts";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export const TodolistItem = (props: Props) => {

    const changeFilterHandler = (filter: FilterValues) => {
        props.changeFilter(props.todolist.id, filter)
    }

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolist.id)
    }

    const createTaskHandler = (title: string) => {
        props.createTask(props.todolist.id, title)
    }

    const changeTodolistTitleHandler = (title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }

    return (
        <div>
            <div className={'container'}>
                <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitleHandler}/></h3>
                <IconButton onClick={deleteTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
            </div>
            {props.tasks.length === 0 ? (
                <p>Tasks is empty</p>
            ) : (
                <List>
                    {props.tasks.map(task => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(props.todolist.id, task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            props.changeTaskStatus(props.todolist.id, task.id, newStatusValue)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolist.id, task.id, title)
                        }
                        return (
                            <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
                                <div>
                                    <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                    <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                </div>
                                <IconButton onClick={deleteTaskHandler}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                        color={'inherit'}
                        onClick={() => changeFilterHandler('all')}>
                    All
                </Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                        color={'primary'}
                        onClick={() => changeFilterHandler('active')}>
                    Active
                </Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                        color={'secondary'}
                        onClick={() => changeFilterHandler('completed')}>
                    Completed
                </Button>
            </Box>
        </div>
    );
};
