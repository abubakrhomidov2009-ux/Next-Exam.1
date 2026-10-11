"use client"

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { img_url, useAddImgMutation, useCompleteTodoMutation, useDeleteImgMutation, useGetTodoByIdQuery } from '../../store/todoStore'

const Info = () => {
    const {id} = useParams()
    const {data} = useGetTodoByIdQuery(Number(id))
    const todo = data?.data

    const [deleteImg] = useDeleteImgMutation()
    const [completeTodo] = useCompleteTodoMutation()
    const [addImg] = useAddImgMutation()

    const [newImages,setNewImages] = useState<File[]>([])

    const AddImage = (e:any) => {
        e.preventDefault()
        if (!todo || newImages.length === 0) return

        const fromdata = new FormData()
        newImages.forEach((image) => fromdata.append('Images', image))
        addImg({id:todo.id , body:fromdata})

        e.target.reset()
        setNewImages([])
    }

    if (!todo) return <p className='min-h-screen bg-gray-100 p-4 text-center text-gray-500'>Loading...</p>

  return (
    <div className='min-h-screen bg-gray-100 p-4'>
    <div className='max-w-md mx-auto'>
        <Link href="/" className='inline-block bg-gray-700 text-white rounded px-3 py-1 mb-4 hover:bg-gray-800'>Back</Link>

        <div className='bg-white rounded-xl shadow p-4 text-center'>
            <div className='flex flex-wrap justify-center gap-2 mb-3'>
            {
                todo.images.map((el) => (
                    <div key={el.id}>
                        <img className='w-16 h-16 object-cover rounded-lg' src={`${img_url}/${el.imageName}`} alt="" />
                        <button className='text-xs text-red-500 hover:underline' onClick={() => deleteImg(el.id)}>remove</button>
                    </div>
                ))
            }
            </div>
            <h2 className='font-bold text-lg'>{todo.name}</h2>
            <h3 className='text-gray-500'>{todo.description}</h3>
            <p
                onClick={() => completeTodo(todo.id)}
                className={`cursor-pointer text-sm font-medium my-2 ${todo.isCompleted ? 'text-green-500' : 'text-red-500'}`}
            >
                {todo.isCompleted ? "Active" : "Inactive"}
            </p>
            <form onSubmit={AddImage} className='flex justify-center items-center gap-2 my-3'>
                <input className='w-40 text-xs file:mr-2 file:rounded file:border-0 file:bg-gray-100 file:px-2 file:py-1' type="file" multiple onChange={(e) => setNewImages(Array.from(e.target.files ?? []))} name="" id="" />
                <button className='bg-gray-200 rounded px-2 py-1 text-xs hover:bg-gray-300' type='submit'>Add</button>
            </form>
        </div>
    </div>
    </div>
  )
}

export default Info