'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Swal from 'sweetalert2'

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  category: z.string().min(1, 'Category is required'),
  duration: z.enum(['1h', '12h', '24h']),
  tags: z.string().min(1, 'At least one tag is required'),
  image: z.any().optional(),
})

export default function CreateDebatePage() {


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  })

  const { data: session } = useSession()
  const [uploading, setUploading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (session === null) {
      router.push('/')
    }
  }, [session, router])

  const onSubmit = async (data) => {
    if (!session) return alert('Please log in to create a debate.')

    setUploading(true)

    // Handle image upload to imgbb or your backend
    let imageUrl = ''
    if (data.image && data.image[0]) {
      const formData = new FormData()
      formData.append('image', data.image[0])
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_imgBB_key}`, {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()
      imageUrl = result.data.url
    }

    const payload = {
      ...data,
      tags: data.tags.split(',').map(tag => tag.trim()),
      image: imageUrl,
      createdBy: {
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      },
      createdAt: new Date().toISOString(),
    }

    const res = await fetch('/api/debates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      //alert('Debate created successfully!')
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your debate has been created",
        showConfirmButton: false,
        timer: 1500
      });
      reset();
      router.push('/all-debates')
    } else {
      //alert('Failed to create debate')
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to create debate",
        showConfirmButton: false,
        timer: 1500
      });
    }

    setUploading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 bg-base-200 rounded-lg space-y-4 mt-8">
      <h2 className="text-3xl font-bold text-center mt-5">📝 Create a New Debate</h2>

      <label className="label mt-5">Debate Title</label>
      <input {...register('title')} placeholder="Debate Title" className="input input-bordered w-full " />
      {errors.title && <p className="text-error">{errors.title.message}</p>}

      <label className="label">Description</label>
      <textarea {...register('description')} placeholder="Description" className="textarea textarea-bordered w-full" />
      {errors.description && <p className="text-error">{errors.description.message}</p>}

      <label className="label">Category</label>
      <input {...register('category')} placeholder="Category (e.g., Ethics)" className="input input-bordered w-full" />
      {errors.category && <p className="text-error">{errors.category.message}</p>}

      <label className="label">Tags</label>
      <input {...register('tags')} placeholder="Tags (comma-separated)" className="input input-bordered w-full" />
      {errors.tags && <p className="text-error">{errors.tags.message}</p>}

      <select {...register('duration')} className="select select-bordered w-full">
        <option value="">Select Duration</option>
        <option value="1h">1 hour</option>
        <option value="12h">12 hours</option>
        <option value="24h">24 hours</option>
      </select>
      {errors.duration && <p className="text-error">{errors.duration.message}</p>}

      <label className="label">Banner Upload</label>

      <input type="file" accept="image/*" {...register('image')} className="file-input file-input-bordered w-full" />

      <button type="submit" className="btn btn-primary w-full rounded-full" disabled={uploading}>
        {uploading ? 'Creating...' : 'Create Debate'}
      </button>
    </form>
  )
}
