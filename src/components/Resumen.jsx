export default function Resumen({ gastos }) {
    const total = gastos.reduce((acc, g) => acc + parseFloat(g.monto), 0)
    const mesActual = new Date().toISOString().slice(0, 7)
    const totalMes = gastos
      .filter(g => g.fecha.startsWith(mesActual))
      .reduce((acc, g) => acc + parseFloat(g.monto), 0)
  
    const categorias = [...new Set(gastos.map(g => g.categoria))]
    const mayorCategoria = categorias.sort((a, b) => {
      const sumA = gastos.filter(g => g.categoria === a).reduce((s, g) => s + parseFloat(g.monto), 0)
      const sumB = gastos.filter(g => g.categoria === b).reduce((s, g) => s + parseFloat(g.monto), 0)
      return sumB - sumA
    })[0]
  
    return (
      <div className="resumen-grid">
        <div className="resumen-card">
          <p>Total gastado</p>
          <h2>${total.toFixed(2)}</h2>
        </div>
        <div className="resumen-card">
          <p>Este mes</p>
          <h2>${totalMes.toFixed(2)}</h2>
        </div>
        <div className="resumen-card">
          <p>Cantidad de gastos</p>
          <h2>{gastos.length}</h2>
        </div>
        <div className="resumen-card">
          <p>Mayor categoría</p>
          <h2>{mayorCategoria || '—'}</h2>
        </div>
      </div>
    )
  }