import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";

export type Task = {
    id: number
    title: string
    isDone: boolean
}

export const App = () => {
    const tasks: Task[] = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Typescript', isDone: false},
        {id: 5, title: 'RTK query', isDone: false}
    ]


    return (
        <div className="app">
            <TodolistItem title={tasks[0].title} tasks={tasks}/>
            <TodolistItem title={tasks[1].title} tasks={tasks}/>
            <TodolistItem title={tasks[2].title} tasks={tasks}/>
        </div>
    )
}

export default App
