

const sparklinePaths = {
  'active-projects': 'M0,25 Q10,20 20,22 T40,15 T60,18 T80,5 T100,2',
  'area-restored': 'M0,28 L20,25 L40,20 L60,15 L80,10 L100,5',
  'co2e-sequestered': 'M0,28 C20,28 30,20 50,15 S80,10 100,2',
  'verified-credits': 'M0,20 L33,20 L66,10 L100,10',
  'awaiting-verification': 'M0,10 L20,15 L40,12 L60,20 L80,25 L100,22',
  'registered-orgs': 'M0,28 L20,28 L20,20 L40,20 L40,15 L60,15 L60,10 L80,10 L80,5 L100,5'
};

export default function StatCard({
  id,
  label,
  value,
  trend,
  trendDirection,
  icon,
  accentColor
}) {
  const isUp = trendDirection === 'up';
  const trendColorClass = isUp ? 'text-secondary' : 'text-error';
  const trendBgClass = isUp ? 'bg-secondary-container/30' : 'bg-error-container/50';
  const trendIcon = isUp ? (id === 'registered-orgs' ? 'arrow_upward' : 'trending_up') : 'trending_down';

  // Format value: if it's large, format like 24,500, or 1.2M, or 850k.
  const formatValue = (val) => {
    if (val === 1200000) return '1.2M';
    if (val === 850000) return '850k';
    return val.toLocaleString();
  };

  const formattedValue = formatValue(value);
  const sparklinePath = sparklinePaths[id] || sparklinePaths['active-projects'];

  return (
    <div className="bg-surface rounded-xl p-md shadow-sm flex flex-col gap-sm relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`absolute top-0 left-0 w-full h-1 bg-${accentColor}`}></div>
      <div className="flex justify-between items-center">
        <span className="font-label-md text-on-surface-variant uppercase tracking-wider">{label}</span>
        <span className={`material-symbols-outlined text-${accentColor} opacity-80`}>{icon}</span>
      </div>
      <div className="flex items-end gap-sm mt-xs">
        <span className="font-headline-lg text-on-surface">{formattedValue}</span>
        <div className={`flex items-center ${trendColorClass} font-label-md mb-[6px] ${trendBgClass} px-[6px] py-[2px] rounded`}>
          <span className="material-symbols-outlined text-[14px]">{trendIcon}</span>
          {id === 'registered-orgs' ? trend : `${trend}%`}
        </div>
      </div>
      <div className={`w-full h-10 mt-xs text-${accentColor}`}>
        <svg className="w-full h-full stroke-current" fill="none" preserveAspectRatio="none" viewBox="0 0 100 30">
          <path d={sparklinePath} strokeWidth="2" vectorEffect="non-scaling-stroke"></path>
        </svg>
      </div>
    </div>
  );
}
