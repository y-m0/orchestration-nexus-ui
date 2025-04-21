
interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendValue?: string;
}

export function StatusCard({ title, value, icon, trend, trendValue }: StatusCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</p>
          <h3 className="text-2xl font-semibold mt-2 dark:text-white">{value}</h3>
          {trend && (
            <p className="text-sm mt-2">
              <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                {trendValue}
              </span>
            </p>
          )}
        </div>
        <div className="text-[#9b87f5] dark:text-[#9b87f5]">
          {icon}
        </div>
      </div>
    </div>
  );
}
