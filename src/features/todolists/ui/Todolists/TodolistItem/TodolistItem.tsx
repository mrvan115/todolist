import {CreateItemForm} from "../../../../../common/components/CreateItemForm/CreateItemForm.tsx";
import {Todolist} from "@/features/todolists/model/todolists-reducer.ts";
import {createTaskAC} from "@/features/todolists/model/tasks-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {TodolistTitle} from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx";
import {Tasks} from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx";
import {FilterButtons} from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx";

type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {
    const {
        todolist: {id}
    } = props

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({todolistId: id, title}))
    }

    return (
        <div>
            <TodolistTitle todolist={props.todolist}/>
            <CreateItemForm onCreateItem={createTask}/>
            <Tasks todolist={props.todolist}/>
            <FilterButtons todolist={props.todolist}/>
        </div>
    );
};
