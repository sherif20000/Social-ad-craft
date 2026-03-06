import React from 'react';

export const CharacterCounter = ({ current, recommended, max, fieldName }) => {
  const pct = max ? (current / max) * 100 : 0;
  const isOverMax = max && current > max;
  const isNearMax = max && current > max * 0.85;
  const isOverRec = recommended && current > recommended;

  const color = isOverMax
    ? 'text-red-500'
    : isNearMax
    ? 'text-amber-500'
    : isOverRec
    ? 'text-amber-400'
    : 'text-zinc-400';

  return (
    <div className={`flex items-center justify-end gap-1 text-[10px] font-medium mt-0.5 ${color}`}>
      <span data-testid={`char-counter-${fieldName}`}>{current}</span>
      {recommended && (
        <span className="text-zinc-300">/ {recommended} rec</span>
      )}
      {max && (
        <span className={isOverMax ? 'text-red-500 font-bold' : 'text-zinc-300'}>
          ({max} max)
        </span>
      )}
    </div>
  );
};
