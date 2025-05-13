import {FilterValues, Task} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
    deleteTask: (taskId: number) => void
    changeFilter: (filter: FilterValues) => void
}

export const TodolistItem = (props: Props) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'}/>
            </div>
            {props.tasks.length === 0 ? (
                <p>Tasks is empty</p>
            ) : (
                <ul>
                    {props.tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={()=>props.deleteTask(task.id)}/>
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
