import { useState } from 'react'
import { supabase } from '../supabase/client'
import { Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [mensaje, setMensaje] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else setMensaje('¡Cuenta creada! Revisá tu email para confirmar.')
    setLoading(false)
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>💰 Dashboard de Gastos</h1>
        <h2>Crear cuenta</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña (mín. 6 caracteres)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          {mensaje && <p className="success">{mensaje}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </form>
        <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
      </div>
    </div>
  )
}