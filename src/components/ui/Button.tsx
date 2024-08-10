import classNames from 'classnames';
import { forwardRef, PropsWithoutRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

type Size = 'xs' | 'small' | 'medium' | 'large';

type Variant =
  | 'primary'
  | 'publish'
  | 'secondary'
  | 'white'
  | 'danger'
  | 'gray'
  | 'none';

export interface ButtonProps
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements['button']>, 'className'> {
  size?: Size;
  variant?: Variant;
  loading?: boolean;
  spinner?: boolean;
  isGroupCenter?: boolean;
  isGroupLeft?: boolean;
  isGroupRight?: boolean;
}

const sizeClassNames: Record<Size, string> = {
  xs: 'p-1 text-xs leading-none',
  small: 'px-3 py-2 text-sm leading-4',
  medium: 'px-5 py-2 text-sm',
  large: 'px-5 py-2 text-base',
};

const variantClassNames: Record<Variant, string> = {
  primary:
    'border-transparent text-white bg-teal hover:bg-teal-800 focus:ring-teal-700',
  publish:
    'border-transparent text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
  danger:
    'border-transparent text-destructive-foreground bg-destructive hover:bg-destructive/80 focus:ring-destructive',
  secondary:
    'border-transparent text-teal-800 bg-teal-200 hover:bg-teal-300 hover:text-teal-900 focus:ring-teal-500',
  white:
    'border-gray-300 text-gray-700 bg-gray-50 hover:bg-white focus:ring-teal-500',
  none: 'border-none text-gray-700 shadow-none',
  gray: 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-500',
};

export const getButtonClassNames = ({
  size = 'medium',
  variant = 'primary',
  loading,
  isGroupCenter,
  isGroupRight,
  isGroupLeft,
}: Pick<
  ButtonProps,
  | 'size'
  | 'variant'
  | 'loading'
  | 'isGroupCenter'
  | 'isGroupLeft'
  | 'isGroupRight'
> = {}) =>
  classNames(
    'inline-flex items-center border font-medium justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
    {
      'cursor-wait': loading,
      'disabled:cursor-not-allowed': !loading,
    },
    !(isGroupCenter || isGroupLeft || isGroupRight)
      ? 'rounded'
      : isGroupCenter
        ? '-ml-px'
        : isGroupLeft
          ? 'rounded-l'
          : isGroupRight
            ? 'rounded-r -ml-px'
            : '',
    sizeClassNames[size],
    variantClassNames[variant],
  );

// eslint-disable-next-line react/display-name
export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & { className?: string }
>(
  (
    {
      children,
      size,
      variant,
      loading,
      spinner: withSpinner,
      isGroupCenter,
      isGroupLeft,
      isGroupRight,
      className,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      {...props}
      className={getButtonClassNames({
        size,
        variant,
        loading,
        isGroupCenter,
        isGroupLeft,
        isGroupRight,
      })}
    >
      {children}
      {loading && withSpinner && (
        <span className="inline-block ml-2">
          <LoadingSpinner className="w-3 h-3" />
        </span>
      )}
    </button>
  ),
);
