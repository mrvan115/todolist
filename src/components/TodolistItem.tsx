import {Task} from "../App.tsx";
import {Button} from "./Button.tsx";

type Props = {
    title: string
    tasks: Task[]
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
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button title={'All'}/>
                <Button title={'Active'}/>
                <Button title={'Completed'}/>
            </div>
        </div>
    );
};
