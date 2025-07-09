import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

//-TYPES------------------------------------------------------

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}
// type Actions = DeleteTodolistAction | CreateTodolistAction | ChangeTodolistTitleAction | ChangeTodolistFilterAction

// export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
// export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
// export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>


//---------------------------------------------------------------
// export const deleteTodolistAC = (id: string) => {
//     return {type: "delete_todolist", payload: {id}} as const
// }

export const deleteTodolistAC = createAction<{ id: string }>('todolists/deleteTodolist')

// export const createTodolistAC = (title: string) => {
//     const todolistId = v1()
// return {type: 'create_todolist', payload: {title, id: todolistId}} as const
// }

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return {payload: {title, id: nanoid()}}
})


// export const changeTodolistTitleAC = (payload: { todolistId: string, newTitle: string }) => {
//     return {type: 'change_todolist_title', payload} as const
// }

export const changeTodolistTitleAC = createAction<{ todolistId: string, newTitle: string }>('todolists/changeTodolistTitle')

// export const changeTodolistFilterAC = (payload: { todolistId: string, filter: FilterValues }) => {
//     return {type: 'change_todolist_filter', payload} as const
// }

export const changeTodolistFilterAC = createAction<{
    todolistId: string,
    filter: FilterValues
}>('todolists/changeTodolistFilter')


// export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//     switch (action.type) {
//         case 'delete_todolist': {
//             return state.filter(todolist => todolist.id !== action.payload.id)
//         }
//         case "create_todolist": {
//             return [...state, {id: action.payload.id, title: action.payload.title, filter: "all"}]
//         }
//         case "change_todolist_title": {
//             return state.map(todolist => todolist.id === action.payload.todolistId ? {
//                 ...todolist,
//                 title: action.payload.newTitle
//             } : todolist)
//         }
//         case "change_todolist_filter": {
//             return state.map(todolist => todolist.id === action.payload.todolistId ? {
//                 ...todolist,
//                 filter: action.payload.filter
//             } : todolist)
//         }
//         default:
//             return state
//     }
// }

export const todolistsReducer = createReducer(initialState, builder => {
    builder
        .addCase(deleteTodolistAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.id)
            if (index !== -1) {
                state.splice(index, 1)
            }
        })
        .addCase(createTodolistAC, (state, action) => {
            state.push({...action.payload, filter: 'all'})
        })
        .addCase(changeTodolistTitleAC, (state, action) => {
            const index = state.findIndex(todolist => todolist.id === action.payload.todolistId)
            if (index !== -1) {
                state[index].title = action.payload.newTitle
            }
        })
        .addCase(changeTodolistFilterAC, (state, action) => {
            const todolist = state.find(todolist => todolist.id === action.payload.todolistId)
            if (todolist) {
                todolist.filter = action.payload.filter
            }
        })
})


