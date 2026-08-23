export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon,
  iconPosition = 'left',
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-title-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface-container-lowest';
  
  const variants = {
    primary: 'bg-primary text-on-primary hover:bg-primary-container shadow-sm hover:shadow-md focus:ring-primary',
    secondary: 'bg-secondary text-on-secondary hover:bg-secondary-container shadow-sm hover:shadow-md focus:ring-secondary',
    outline: 'bg-transparent border border-outline text-primary hover:bg-surface-variant focus:ring-primary',
    text: 'bg-transparent text-primary hover:bg-surface-variant focus:ring-primary',
    error: 'bg-error text-on-error hover:bg-error-container focus:ring-error',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      )}
    </button>
  );
}
