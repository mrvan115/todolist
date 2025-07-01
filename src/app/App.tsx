import './App.css'
import {TodolistItem} from "../components/TodolistItem.tsx";
import {useState} from "react";
import {CreateItemForm} from "../components/CreateItemForm.tsx";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper';
import {NavButton} from "../components/NavButton.ts";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {containerSx} from "../components/TodolistItem.styles.ts";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from "../model/todolists-reducer.ts";
import {changeTaskStatusAC, changeTaskTitleAC, createTaskAC, deleteTaskAC} from "../model/tasks-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";

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
    const todolists = useAppSelector(selectTodolists)
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    const changeFilter = (todolistId: string, filter: FilterValues) => {
        // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))

        dispatch(changeTodolistFilterAC({todolistId, filter}))
    }

    const createTodolist = (title: string) => {
        // const todolistId = v1()
        // const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
        // setTodolists([newTodolist, ...todolists])
        // setTasks({...tasks, [todolistId]: []})


        dispatch(createTodolistAC(title))

        // setTasks({...tasks, [action.payload.id]: []})


    }

    const deleteTodolist = (todolistId: string) => {
        // setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        // delete tasks[todolistId]
        // setTasks({...tasks})

        dispatch(deleteTodolistAC({id: todolistId}))

        // delete tasks[todolistId]
        // setTasks({...tasks})


    }

    const changeTodolistTitle = (todolistId: string, title: string) => {
        // setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))

        dispatch(changeTodolistTitleAC({todolistId, newTitle: title}))
    }


    const deleteTask = (todolistId: string, taskId: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)})

        dispatch(deleteTaskAC({todolistId, taskId}))
    }

    const createTask = (todolistId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        // const newTask = {id: v1(), title: title, isDone: false}

        dispatch(createTaskAC({todolistId, title}))
    }

    const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? {...task, isDone} : task)})

        dispatch(changeTaskStatusAC({todolistId, taskId, isDone}))
    }


    const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
        // setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})

        dispatch(changeTaskTitleAC({todolistId, taskId, title}))
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

