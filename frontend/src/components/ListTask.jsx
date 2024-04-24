import TaskCard from './TaskCard'

async function loadTask() {
	const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`)
	const tasks = await res.json()
	return tasks
}

const ListTask = async () => {
	const task = await loadTask()

	return (
		<div className='w-full p-4 bg-slate-700'>
			<h1>Lista de tareas</h1>
			{task.map((task) => (
				<TaskCard key={task.id} task={task} />
			))}
		</div>
	)
}

export default ListTask
