import { FC } from 'react'

type TodoListPropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: number) => void
	changeFilter: (filter: FilterValuesType) => void
}

export type TaskType = {
	id: number
	title: string
	isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'
const TodoList: FC<TodoListPropsType> = ({
	title,
	tasks,
	removeTask,
	changeFilter
}) => {
	return (
		<div>
			<div className='todolist'>
				<h3>{title}</h3>
				<div>
					<input />
					<button>+</button>
				</div>
				<ul>
					{tasks.map((t) => {
						return (
							<li key={t.id}>
								<input type='checkbox' checked={t.isDone} />{' '}
								<span>{t.title}</span>
								<button onClick={() => removeTask(t.id)}>✖️</button>
							</li>
						)
					})}
				</ul>
				<div>
					<button onClick={() => changeFilter('all')}>All</button>
					<button onClick={() => changeFilter('active')}>Active</button>
					<button onClick={() => changeFilter('completed')}>Completed</button>
				</div>
			</div>
		</div>
	)
}

export default TodoList
