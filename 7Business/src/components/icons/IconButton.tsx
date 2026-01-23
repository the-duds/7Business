import React from 'react';
import { ChevronRight } from 'lucide-react';

type Props = {
  label?: string;
  onClick?: () => void;
};

export default function IconButton({ label = '', onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
      aria-label={label}
    >
      <span>{label}</span>
      <ChevronRight size={18} />
    </button>
  );
}
