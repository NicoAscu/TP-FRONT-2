import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#3b82f6', '#ec4899', '#14b8a6']

export default function GraficoGastos({ gastos }) {
  const data = Object.entries(
    gastos.reduce((acc, g) => {
      acc[g.categoria] = (acc[g.categoria] || 0) + parseFloat(g.monto)
      return acc
    }, {})
  ).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }))

  if (data.length === 0) return (
    <div className="card">
      <h2>Distribución por categoría</h2>
      <p>Agregá gastos para ver el gráfico.</p>
    </div>
  )

  return (
    <div className="card">
      <h2>Distribución por categoría</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip formatter={(v) => `$${v}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}