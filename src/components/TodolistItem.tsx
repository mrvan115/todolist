import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (taskTitle: string) => void
}

export const TodolistItem = (props: Props) => {
    const [taskTitle, setTaskTitle] = useState<string>('')

    const createTaskHandler = () => {
        props.createTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }

    const createTaskOnEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            createTaskHandler()
        }
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyDown={createTaskOnEnterHandler}/>
                <Button title={'+'} onClick={createTaskHandler}/>
            </div>
            {props.tasks.length === 0 ? (
                <p>Tasks is empty</p>
            ) : (
                <ul>
                    {props.tasks.map(task => {
                        const deleteTaskHandler = () => {
                            props.deleteTask(task.id)
                        }
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'} onClick={() => props.changeFilter('all')}/>
                <Button title={'Active'} onClick={() => props.changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => props.changeFilter('completed')}/>
            </div>
        </div>
    );
};
