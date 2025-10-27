import React, { useState } from 'react'

type Booking = { id: number; hotel: string; from: string; to: string; price: string }
type User = { name: string; email: string; phone?: string }

export default function ProfilePage(){
  // placeholder data (replace with fetch from backend later)
  const [user, setUser] = useState<User>({ name: 'Luyanda Lior', email: 'lior@example.com', phone: '+27 71 234 5678' })
  const [bookings] = useState<Booking[]>([
    { id:1, hotel:'The Bay Hotel', from:'2025-11-01', to:'2025-11-03', price:'ZAR 2,000' },
    { id:2, hotel:'Ocean View', from:'2025-12-10', to:'2025-12-12', price:'ZAR 3,500' }
  ])
  const [favorites] = useState<string[]>(['Radisson Blu', 'Sunset Resort'])

  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(user)

  function startEdit(){ setForm(user); setEditing(true) }
  function cancelEdit(){ setEditing(false) }
  function saveEdit(){ setUser(form); setEditing(false); /* replace with API call */ }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6 bg-white p-6 rounded shadow">
        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="avatar" className="w-20 h-20 rounded-full" />
        <div className="flex-1">
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-slate-600">{user.email}</p>
          <p className="text-slate-600">{user.phone}</p>
        </div>
        <div>
          {!editing ? <button onClick={startEdit} className="px-4 py-2 bg-sky-600 text-white rounded">Edit Profile</button> :
            <div className="flex gap-2">
              <button onClick={saveEdit} className="px-4 py-2 bg-green-600 text-white rounded">Save</button>
              <button onClick={cancelEdit} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          }
        </div>
      </div>

      {editing && (
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-semibold mb-4">Edit Profile (placeholder — connect API)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border p-2 rounded" name="name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <input className="border p-2 rounded" name="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            <input className="border p-2 rounded" name="phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          </div>
        </div>
      )}

      <section className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Your Bookings</h3>
        {bookings.length ? (
          <ul className="space-y-3">
            {bookings.map(b=> (
              <li key={b.id} className="flex justify-between items-center border rounded p-3">
                <div>
                  <div className="font-medium">{b.hotel}</div>
                  <div className="text-sm text-slate-500">{b.from} → {b.to}</div>
                </div>
                <div className="text-slate-700">{b.price}</div>
              </li>
            ))}
          </ul>
        ) : <p className="text-slate-500">No bookings yet.</p>}
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-4">Favorites</h3>
        {favorites.length ? (
          <ul className="list-disc list-inside space-y-1 text-slate-700">
            {favorites.map((f,i)=>(<li key={i}>{f}</li>))}
          </ul>
        ) : <p className="text-slate-500">No favorites yet.</p>}
      </section>
    </div>
  )
}
