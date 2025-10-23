import React from 'react'
import { useParams } from 'react-router-dom'

export default function GuestDetails(){
  const { id } = useParams()
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Guest Details — ID {id}</h2>
      <div className="bg-white p-4 rounded shadow">
        <p>This page would show guest details (demo).</p>
      </div>
    </div>
  )
}
