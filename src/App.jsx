import React, { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

function App() {
  const [weight, setWeight] = useState('')
  const [baskets, setBaskets] = useState([])

  const fetchBaskets = async () => {
    const { data, error } = await supabase.from('baskets').select('*').order('created_at', { ascending: false })
    if (!error) setBaskets(data)
  }

  const addBasket = async () => {
    if (!weight) return
    await supabase.from('baskets').insert([{ weight_kg: parseFloat(weight) }])
    setWeight('')
    fetchBaskets()
  }

  useEffect(() => {
    fetchBaskets()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>📦 เข่งทุเรียน</h1>
      <input
        type="number"
        placeholder="น้ำหนัก (กก.)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <button onClick={addBasket}>เพิ่ม</button>

      <h2>รายการล่าสุด</h2>
      <ul>
        {baskets.map((b) => (
          <li key={b.id}>{b.weight_kg} กก. ({new Date(b.created_at).toLocaleString()})</li>
        ))}
      </ul>
    </div>
  )
}

export default App
