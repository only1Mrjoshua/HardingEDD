import { Loader2 } from 'lucide-react';

const VARIANT_CLASSES = {
  primary:
    'bg-navy-700 text-white hover:bg-navy-600 focus-visible:ring-gold-500 focus-visible:ring-offset-navy-900',
  secondary:
    'border border-navy-100 bg-white text-navy-800 hover:bg-navy-50 focus-visible:ring-navy-700',
  ghost: 'bg-transparent text-navy-700 hover:bg-navy-50 focus-visible:ring-navy-700',
  danger: 'bg-danger text-white hover:opacity-90 focus-visible:ring-gold-500',
};

const SIZE_CLASSES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
};

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
      disabled={Tag === 'button' ? disabled || loading : undefined}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      {children}
    </Tag>
  );
}