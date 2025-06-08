import {FilterValues, Todolist} from "../App.tsx";
import {v1} from "uuid";

const initialState: Todolist[] = []

//-TYPES------------------------------------------------------
type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>


//---------------------------------------------------------------
export const deleteTodolistAC = (id: string) => {
    return {type: "delete_todolist", payload: {id}} as const
}

export const createTodolistAC = (title: string) => {
    const todolistId = v1()

    return {type: 'create_todolist', payload: {title, id: todolistId}} as const
}

export const changeTodolistTitleAC = (payload: { todolistId: string, newTitle: string }) => {
    return {type: 'change_todolist_title', payload} as const
}

export const changeTodolistFilterAC = (payload: {todolistId: string, filter: FilterValues}) => {
    return {type: 'change_todolist_filter', payload} as const
}


export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
    switch (action.type) {
        case 'delete_todolist': {
            return state.filter(todolist => todolist.id !== action.payload.id)
        }
        case "create_todolist": {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: "all"}]
        }
        case "change_todolist_title": {
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, title: action.payload.newTitle} : todolist)
        }
        case "change_todolist_filter": {
            return state.map(todolist => todolist.id === action.payload.todolistId ? {...todolist, filter: action.payload.filter} : todolist)
        }
        default:
            return state
    }
}


