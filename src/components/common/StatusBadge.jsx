export default function StatusBadge({ status, className = '' }) {
  const getStatusStyles = (statusStr) => {
    const s = statusStr?.toLowerCase();
    switch (s) {
      case 'verified':
      case 'active':
      case 'minted':
      case 'completed':
        return 'bg-[#e8f5e9] text-[#2e7d32] border border-[#2e7d32]/20';
      case 'pending':
        return 'bg-[#fff3e0] text-[#f57f17] border border-[#f57f17]/20';
      case 'under review':
        return 'bg-[#fff8e1] text-[#f57f17] border border-[#f57f17]/20';
      case 'rejected':
      case 'retired':
        return 'bg-[#ffdad6] text-[#d32f2f] border border-[#d32f2f]/20';
      case 'draft':
      default:
        return 'bg-[#f3e5f5] text-[#7b1fa2] border border-[#7b1fa2]/20';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-label-md text-label-md ${getStatusStyles(status)} ${className}`}>
      {status || 'Unknown'}
    </span>
  );
}
