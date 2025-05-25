import {FilterValues, Task, Todolist} from "../App.tsx";
import {Button} from "./Button.tsx";
import {ChangeEvent} from "react";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

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
                <Button title={'x'} onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <CreateItemForm onCreateItem={createTaskHandler}/>
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
                        const changeTaskTitleHandler = (title: string) => {
                            props.changeTaskTitle(props.todolist.id, task.id, title)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
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
