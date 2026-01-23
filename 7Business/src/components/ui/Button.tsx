import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

export default function Button({ variant = 'primary', children, ...rest }: Props) {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none';
  const styles =
    variant === 'primary'
      ? `${base} bg-blue-600 text-white hover:bg-blue-700`
      : `${base} bg-transparent text-gray-700 hover:bg-gray-100`;
  return (
    <button className={styles} {...rest}>
      {children}
    </button>
  );
}
