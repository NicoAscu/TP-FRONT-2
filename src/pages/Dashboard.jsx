import { useEffect, useState } from 'react'
import { supabase } from '../supabase/client'
import FormGasto from '../components/FormGasto'
import TablaGastos from '../components/TablaGastos'
import GraficoGastos from '../components/GraficoGastos'
import Resumen from '../components/Resumen'

export default function Dashboard({ session }) {
  const [gastos, setGastos] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchGastos = async () => {
    const { data, error } = await supabase
      .from('gastos')
      .select('*')
      .order('fecha', { ascending: false })

    if (!error) setGastos(data)
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  useEffect(() => {
    fetchGastos()
  }, [])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>💰 Mis Gastos</h1>
        <div className="user-info">
          <span>{session.user.email}</span>
          <button onClick={handleLogout} className="btn-logout">Cerrar sesión</button>
        </div>
      </header>

      <main className="dashboard-main">
        <Resumen gastos={gastos} />
        <div className="dashboard-grid">
          <FormGasto onGastoAgregado={fetchGastos} userId={session.user.id} />
          <GraficoGastos gastos={gastos} />
        </div>
        {loading ? <p>Cargando gastos...</p> : <TablaGastos gastos={gastos} onActualizar={fetchGastos} />}
      </main>
    </div>
  )
}