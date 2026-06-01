import { supabase } from '../supabase/client'

export default function TablaGastos({ gastos, onActualizar }) {
  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este gasto?')) return
    await supabase.from('gastos').delete().eq('id', id)
    onActualizar()
  }

  if (gastos.length === 0) return <div className="card"><p>No hay gastos registrados aún.</p></div>

  return (
    <div className="card">
      <h2>Historial de gastos</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map(g => (
            <tr key={g.id}>
              <td>{g.fecha}</td>
              <td>{g.descripcion}</td>
              <td><span className="badge">{g.categoria}</span></td>
              <td>${parseFloat(g.monto).toFixed(2)}</td>
              <td>
                <button className="btn-danger" onClick={() => handleEliminar(g.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}