import {v1} from 'uuid'
import {beforeEach, expect, test} from "vitest";
import {Todolist} from "../App.tsx";
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistsReducer
} from "./todolists-reducer.ts";

let todolistId1 = v1()
let todolistId2 = v1()
let startState: Todolist[] = []

beforeEach(() => {

    // 1. Стартовый state
    startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})


test('correct todolist should be deleted', () => {

    // 2. Action(действие)
    const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be created', () => {
    const title = 'New todolist'
    const endState = todolistsReducer(startState, createTodolistAC(title))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(title)
})
test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistsReducer(startState, changeTodolistTitleAC({todolistId: todolistId2, newTitle: title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})
test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todolistsReducer(startState, changeTodolistFilterAC({todolistId: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})