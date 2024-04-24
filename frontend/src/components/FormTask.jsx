'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const FormTask = () => {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		//Envio de datos en formato JSON
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/tasks/`,
			{
				method: 'POST',
				body: JSON.stringify({ title, description }),
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
		const data = await res.json()
		router.refresh()
	}

	return (
		<div className='bg-slate-200 p-7 h-fit '>
			<form onSubmit={handleSubmit}>
				<h1 className='font-bold text-black'> Agregar tarea </h1>
				<label htmlFor='title' className='text-xs text-black'>
					Title:
				</label>
				<input
					type='text'
					name='title'
					className='block w-full p-2 mb-2 rounded-md bg-slate-400 text-slate-900'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<label htmlFor='title' className='text-xs text-black'>
					Description:
				</label>
				<textarea
					name='description'
					onChange={(e) => setDescription(e.target.value)}
					className='block w-full p-2 mb-2 rounded-md bg-slate-400 text-slate-900'></textarea>
				<button className='w-full p-4 bg-indigo-500 rounded-md'>Save</button>
			</form>
		</div>
	)
}

export default FormTask
