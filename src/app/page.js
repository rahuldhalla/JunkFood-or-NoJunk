'use client';

import { useMemo, useState } from 'react';

const junkKeywords = [
  'chips',
  'candy',
  'soda',
  'burger',
  'fries',
  'pizza',
  'donut',
  'cookie',
  'ice cream',
  'hot dog',
  'nugget',
  'milkshake',
  'cake',
  'chocolate bar',
  'energy drink',
];

const healthyKeywords = [
  'apple',
  'banana',
  'broccoli',
  'spinach',
  'lentils',
  'oats',
  'salmon',
  'egg',
  'yogurt',
  'brown rice',
  'carrot',
  'nuts',
  'beans',
  'chicken breast',
  'quinoa',
];

function classifyFood(input) {
  const normalizedInput = input.trim().toLowerCase();

  if (!normalizedInput) {
    return {
      label: '',
      message: 'Type a food item to get started.',
      color: 'text-slate-600',
    };
  }

  const matchesJunk = junkKeywords.some((keyword) =>
    normalizedInput.includes(keyword),
  );

  const matchesHealthy = healthyKeywords.some((keyword) =>
    normalizedInput.includes(keyword),
  );

  if (matchesJunk && !matchesHealthy) {
    return {
      label: 'Junk Food',
      message:
        'This sounds like junk food. Enjoy occasionally and balance with whole foods.',
      color: 'text-red-600',
    };
  }

  if (matchesHealthy && !matchesJunk) {
    return {
      label: 'Not Junk Food',
      message: 'Great choice! This sounds like a nutrient-rich food.',
      color: 'text-emerald-700',
    };
  }

  return {
    label: 'Maybe / Mixed',
    message:
      'This could be healthy or junk depending on ingredients and preparation.',
    color: 'text-amber-600',
  };
}

export default function Home() {
  const [food, setFood] = useState('');

  const result = useMemo(() => classifyFood(food), [food]);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-12">
      <div className="w-full rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Junk or No</h1>
        <p className="mt-2 text-slate-600">
          Enter a food item and this beginner-friendly app will guess if it is junk
          food or not.
        </p>

        <label htmlFor="food-input" className="mt-6 block text-sm font-semibold">
          Food item
        </label>
        <input
          id="food-input"
          type="text"
          value={food}
          onChange={(event) => setFood(event.target.value)}
          placeholder="Try: pizza, apple, oats, french fries"
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none ring-emerald-500 transition focus:ring-2"
        />

        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="text-sm uppercase tracking-wide text-slate-500">Result</p>
          <p className={`mt-1 text-xl font-bold ${result.color}`}>
            {result.label || 'Waiting for input...'}
          </p>
          <p className="mt-1 text-slate-700">{result.message}</p>
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Tip: This is a simple keyword-based demo, not medical advice.
        </p>
      </div>
    </main>
  );
}
