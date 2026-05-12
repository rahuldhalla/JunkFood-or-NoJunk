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

function normalize(text) {
  return text.trim().toLowerCase().replace(/\s+/g, ' ');
}

function matchesKeyword(normalizedInput, keywordList) {
  return keywordList.some((keyword) => normalizedInput.includes(keyword));
}

function classifyFood(input) {
  const normalizedInput = normalize(input);

  if (!normalizedInput) {
    return {
      label: '',
      message: 'Type a food item to get started.',
      color: 'text-slate-600',
    };
  }

  const matchesJunk = matchesKeyword(normalizedInput, junkKeywords);
  const matchesHealthy = matchesKeyword(normalizedInput, healthyKeywords);

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

const examples = ['Pizza', 'Apple', 'Ice cream', 'Brown rice'];

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

        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((example) => (
            <button
              key={example}
              type="button"
              onClick={() => setFood(example)}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
            >
              {example}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-lg bg-slate-50 p-4" aria-live="polite">
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
