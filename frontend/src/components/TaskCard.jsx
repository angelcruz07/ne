'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TaskCard = ({ task }) => {
	const router = useRouter()

	const [edit, setEdit] = useState(false)
	const [newTitle, setNewTitle] = useState(task.title)
	const [newDescription, setNewDescription] = useState(task.description)

	const handleTaskDone = async (id) => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/done/`,
			{
				method: 'POST'
			}
		)
		if (res.status === 200) {
			router.refresh()
		}
	}

	const handleDelete = (id) => {
		if (window.confirm('¿Estás seguro de eliminar la tarea?')) {
			fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}`, {
				method: 'DELETE'
			})
			router.refresh()
		}
	}

	// Update task
	const handleUpdate = async (id) => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/${id}/`,
			{
				method: 'PUT',
				body: JSON.stringify({ title: newTitle, description: newDescription }),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const data = await res.json()
		setNewTitle(data.title)
		setNewDescription(data.description)
		setEdit(false)
	}

	return (
		<div className='flex items-center justify-between p-4 my-3 mb-2 rounded-md bg-slate-500'>
			<div className='flex flex-col'>
				{!edit ? (
					<h2 className='font-bold'>
						{newTitle}
						{task.done && <span>✔</span>}
					</h2>
				) : (
					<input
						type='text'
						placeholder={task.title}
						className='p-2 text-white border-none outline-none bg-slate-500'
						onChange={(e) => setNewTitle(e.target.value)}
					/>
				)}

				{!edit ? (
					<p>{newDescription}</p>
				) : (
					<textarea
						placeholder={task.description}
						className='w-full p-2 text-green-500 border-none outline-none resize-none bg-slate-500'
						row={1}
						onChange={(e) => setNewDescription(e.target.value)}></textarea>
				)}
			</div>

			<div>
				<div className='flex justify-between gap-x-2'>
					{edit && (
						<button
							className='p-4 text-black rounded-md bg-slate-300'
							onClick={() => handleUpdate(task.id)}>
							Guardar cambios
						</button>
					)}

					<button
						className={
							'text-white rounded-md p-2' +
							(task.done ? ' bg-gray-800' : ' bg-green-500')
						}
						onClick={() => handleTaskDone(task.id)}>
						{task.done ? 'Desmarcar' : 'Marcar'}
					</button>
					<button
						className='p-4 bg-red-500 rounded-md'
						onClick={() => handleDelete(task.id)}>
						Eliminar
					</button>
					<button
						className='p-4 bg-indigo-500 rounded-md'
						onClick={() => setEdit(!edit)}>
						{edit ? 'Cancelar' : 'Editar'}
					</button>
				</div>
			</div>
		</div>
	)
}

export default TaskCard
