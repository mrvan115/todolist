import './App.css'
import {TodolistItem} from "./components/TodolistItem.tsx";
import {useReducer, useState} from "react";
import {v1} from "uuid";
import {CreateItemForm} from "./components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import {NavButton} from "./components/NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {containerSx} from "./components/TodolistItem.styles.ts";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC, deleteTodolistAC,
    todolistsReducer
} from "./model/todolists-reducer.ts";
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteTaskAC,
    tasksReducer
} from "./model/tasks-reducer.ts";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export type Todolist = {
    id: string
    title: string
    filter: FilterValues
}

//Также для этой задачи также подходит утилитный тип Typescript Record (style guide):
export type TasksState = {
    [key: string]: Task[]
}

type ThemeMode = 'dark' | 'light'

export const App = () => {
    const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [])

    // const [tasks, setTasks] = useState<TasksState>({})
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {})


    const changeFilter = (todolistId: string, filter: FilterValues) => {
        // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))

        dispatchToTodolists(changeTodolistFilterAC({todolistId, filter}))
    }

    const createTodolist = (title: string) => {
        // const todolistId = v1()
        // const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [todolistId]: []})

        const action = createTodolistAC(title)
        dispatchToTodolists(action)

        // setTasks({...tasks, [action.payload.id]: []})

        dispatchToTasks(action)
    }

    const deleteTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})

        const action = deleteTodolistAC(todolistId)

        dispatchToTodolists(action)

        // delete tasks[todolistId]
        // setTasks({...tasks})

        dispatchToTasks(action)

    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))

        dispatchToTodolists(changeTodolistTitleAC({todolistId, newTitle: title}))
    }


    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

        dispatchToTasks(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // const newTask = {id: v1(), title: title, isDone: false}

        dispatchToTasks(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})

        dispatchToTasks(changeTaskStatusAC({todolistId, taskId, isDone}))
    }


    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})

        dispatchToTasks(changeTaskTitleAC({todolistId, taskId, title}))
    }


    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const theme = createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: '#087EA4'
            }
        }
    })

    const changeMode = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="app">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppBar position="static" sx={{mb: '30px'}}>
                    <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Container maxWidth={'lg'} sx={containerSx}>
                            <IconButton color={"inherit"}>
                                <MenuIcon/>
                            </IconButton>
                            <div>
                                <NavButton>Sign in</NavButton>
                                <NavButton>Sign up</NavButton>
                                <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                                <Switch color={'default'} onChange={changeMode}/>
                            </div>
                        </Container>
                    </Toolbar>
                </AppBar>
                <Container maxWidth={'lg'}>
                    <Grid container sx={{mb: '30px'}}>
                        <CreateItemForm onCreateItem={createTodolist}/>
                    </Grid>

                    <Grid container spacing={4}>
                        {todolists.map(todolist => {
                            const todolistTasks = tasks[todolist.id]
                            let filteredTasks = todolistTasks
                            if (todolist.filter === 'active') {
                                filteredTasks = todolistTasks.filter(task => !task.isDone)
                            }
                            if (todolist.filter === 'completed') {
                                filteredTasks = todolistTasks.filter(task => task.isDone)
                            }

                            return (
                                <Grid key={todolist.id}>
                                    <Paper sx={{p: '0 20px 20px 20px'}}>
                                        <TodolistItem todolist={todolist} tasks={filteredTasks} deleteTask={deleteTask}
                                                      changeFilter={changeFilter} createTask={createTask}
                                                      changeTaskStatus={changeTaskStatus}
                                                      deleteTodolist={deleteTodolist}
                                                      changeTaskTitle={changeTaskTitle}
                                                      changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    )
}

