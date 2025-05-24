import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle !== '') {
            props.createTask(props.todolist.id, trimmedTitle)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    const changeFilterHandler = (filter: FilterValues) => {
        props.changeFilter(props.todolist.id, filter)
    }

    const deleteTodolistHandler = () => {
        props.deleteTodolist(props.todolist.id)
    }

    return (
        <div>
            <div className={'container'}>
                <h3>{props.todolist.title}</h3>
                <Button title={'x'} onClick={deleteTodolistHandler} />
            </div>
            <div>
                <input className={error ? 'error' : ''} value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            {props.tasks.length === 0 ? (
                <p>Tasks is empty</p>
            ) : (
                <ul>
                    {props.tasks.map(task => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(props.todolist.id, task.id)
                        }
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            props.changeTaskStatus(props.todolist.id, task.id, newStatusValue)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={props.todolist.filter === 'all' ? 'active-filter' : ''} title={'All'}
                        onClick={() => changeFilterHandler('all')}/>
                <Button className={props.todolist.filter === 'active' ? 'active-filter' : ''} title={'Active'}
                        onClick={() => changeFilterHandler('active')}/>
                <Button className={props.todolist.filter === 'completed' ? 'active-filter' : ''} title={'Completed'}
                        onClick={() => changeFilterHandler('completed')}/>
            </div>
        </div>
    );
};
