
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Mon', tasks: 24 },
  { name: 'Tue', tasks: 32 },
  { name: 'Wed', tasks: 28 },
  { name: 'Thu', tasks: 46 },
  { name: 'Fri', tasks: 38 },
  { name: 'Sat', tasks: 16 },
  { name: 'Sun', tasks: 12 },
];

export function TaskCompletionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
        <XAxis dataKey="name" stroke="#888" />
        <YAxis stroke="#888" />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'rgba(30, 30, 30, 0.8)',
            borderColor: '#666',
            color: '#fff' 
          }} 
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="tasks"
          stroke="#9b87f5"
          strokeWidth={2}
          activeDot={{ r: 8 }}
          name="Tasks Completed"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
