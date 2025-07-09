import {createTodolistAC, deleteTodolistAC} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: TasksState = {}

//-TYPES------------------------------------------------------

//Также для этой задачи также подходит утилитный тип Typescript Record (style guide):
export type TasksState = {
    [key: string]: Task[]
}

export type Task = {
    id: string
    title: string
    isDone: boolean
}


// type Actions =
//     CreateTodolistAction
//     | DeleteTodolistAction
//     | DeleteTaskAction
//     | CreateTaskAction
//     | ChangeTaskStatusAction | ChangeTaskTitleAction

// export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
// export type CreateTaskAction = ReturnType<typeof createTaskAC>
// export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

//---------------------------------------------------------------
// export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
//     return {type: 'delete_task', payload} as const
// }

export const deleteTaskAC = createAction<{ todolistId: string, taskId: string }>('tasks/deleteTask')

// export const createTaskAC = (payload: { todolistId: string, title: string }) => {
//     return {type: 'create_task', payload} as const
// }

export const createTaskAC = createAction<{ todolistId: string, title: string }>('tasks/createTask')

// export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
//     return {type: 'change_task_status', payload} as const
// }

export const changeTaskStatusAC = createAction<{
    todolistId: string,
    taskId: string,
    isDone: boolean
}>('tasks/changeTaskStatus')

// export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
//     return {type: 'change_task_title', payload} as const
// }

export const changeTaskTitleAC = createAction<{
    todolistId: string,
    taskId: string,
    title: string
}>('tasks/changeTaskTitle')

// export const tasksReducer = (state: TasksState = initialState, action: Actions) => {
//     switch (action.type) {
//         case 'create_todolist': {
//             return {...state, [action.payload.id]: []}
//         }
//         case "delete_todolist": {
//             const newState = {...state}
//             delete newState[action.payload.id]
//             return newState
//         }
//         case "delete_task": {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
//             }
//         }
//         case 'create_task': {
//             const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
//             return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
//         }
//         case "change_task_status": {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     isDone: action.payload.isDone
//                 } : task)
//             }
//         }
//         case 'change_task_title': {
//             return {...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     title: action.payload.title
//                 } : task)
//             }
//         }
//         default:
//             return state
//     }
// }

export const tasksReducer = createReducer(initialState, builder => {
    builder
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        .addCase(deleteTaskAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks.splice(index, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            const newTask = {id: nanoid(), title: action.payload.title, isDone: false}
            state[action.payload.todolistId].unshift(newTask)
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) {
                task.isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const task = tasks.find(task => task.id === action.payload.taskId)
            if (task) {
                task.title = action.payload.title
            }
        })
})
