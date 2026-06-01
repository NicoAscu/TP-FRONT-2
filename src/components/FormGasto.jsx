import { useState } from 'react'
import { supabase } from '../supabase/client'

const CATEGORIAS = ['Comida', 'Transporte', 'Entretenimiento', 'Salud', 'Ropa', 'Educación', 'Otros']

export default function FormGasto({ onGastoAgregado, userId }) {
  const [form, setForm] = useState({
    descripcion: '',
    monto: '',
    categoria: 'Comida',
    fecha: new Date().toISOString().split('T')[0]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.from('gastos').insert([{
      ...form,
      monto: parseFloat(form.monto),
      user_id: userId
    }])

    if (error) setError(error.message)
    else {
      setForm({ descripcion: '', monto: '', categoria: 'Comida', fecha: new Date().toISOString().split('T')[0] })
      onGastoAgregado()
    }
    setLoading(false)
  }

  return (
    <div className="card">
      <h2>Agregar gasto</h2>
      <form onSubmit={handleSubmit}>
        <input name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} required />
        <input name="monto" type="number" step="0.01" min="0" placeholder="Monto ($)" value={form.monto} onChange={handleChange} required />
        <select name="categoria" value={form.categoria} onChange={handleChange}>
          {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
        </select>
        <input name="fecha" type="date" value={form.fecha} onChange={handleChange} required />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Agregar'}</button>
      </form>
    </div>
  )
}