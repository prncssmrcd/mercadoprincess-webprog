import { useState } from 'react';

export const useInputClasses = () => {
  return 'w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm text-zinc-900 placeholder-zinc-500 focus:border-accent-color focus:outline-none focus:ring-2 focus:ring-accent-color/20 transition-all';
};
