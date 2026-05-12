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
      message: 'Submit details about a food item to get started.',
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

const examples = [
  {
    food: 'Pizza',
    description: 'Cheesy slice with pepperoni and white flour crust.',
    preparation: 'Baked in a hot oven with lots of cheese and processed toppings.',
  },
  {
    food: 'Apple oatmeal bowl',
    description: 'Oats topped with fresh apples and nuts.',
    preparation: 'Cooked oats in water and added chopped apple and almonds.',
  },
];

export default function Home() {
  const [food, setFood] = useState('');
  const [description, setDescription] = useState('');
  const [preparation, setPreparation] = useState('');
  const [submittedText, setSubmittedText] = useState('');

  const result = useMemo(() => classifyFood(submittedText), [submittedText]);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedText(`${food} ${description} ${preparation}`);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 py-12">
      <div className="w-full rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Junk or No</h1>
        <p className="mt-2 text-slate-600">
          Add a food item, a short description, and how it&apos;s made. Then submit to
          see whether it&apos;s junk food or not.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="food-input" className="mt-6 block text-sm font-semibold">
            Food item
          </label>
          <input
            id="food-input"
            type="text"
            value={food}
            onChange={(event) => setFood(event.target.value)}
            placeholder="Try: pizza, apple oatmeal bowl"
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none ring-emerald-500 transition focus:ring-2"
          />

          <label
            htmlFor="description-input"
            className="mt-4 block text-sm font-semibold"
          >
            Short description
          </label>
          <textarea
            id="description-input"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe the food briefly"
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none ring-emerald-500 transition focus:ring-2"
          />

          <label
            htmlFor="preparation-input"
            className="mt-4 block text-sm font-semibold"
          >
            How it&apos;s made
          </label>
          <textarea
            id="preparation-input"
            value={preparation}
            onChange={(event) => setPreparation(event.target.value)}
            placeholder="How was it prepared?"
            rows={3}
            className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-base outline-none ring-emerald-500 transition focus:ring-2"
          />

          <button
            type="submit"
            className="mt-5 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700"
          >
            Check Food
          </button>

          <div className="mt-3 flex flex-wrap gap-2">
            {examples.map((example) => (
              <button
                key={example.food}
                type="button"
                onClick={() => {
                  setFood(example.food);
                  setDescription(example.description);
                  setPreparation(example.preparation);
                }}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-100"
              >
                {example.food}
              </button>
            ))}
          </div>
        </form>

        <div className="mt-6 rounded-lg bg-slate-50 p-4" aria-live="polite">
          <p className="text-sm uppercase tracking-wide text-slate-500">Result</p>
          <p className={`mt-1 text-xl font-bold ${result.color}`}>
            {result.label || 'Waiting for submission...'}
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
