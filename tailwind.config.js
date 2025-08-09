/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './plugins/**/*.{js,ts}',
  ],
  safelist: [
    // add any classes you build dynamically at runtime
    'bg-orange-500','hover:bg-orange-400',
    'bg-pink-600','hover:bg-pink-500',
    'text-orange-500','text-pink-400',
    'bg-gradient-to-r','from-orange-500','to-orange-400',
    'from-pink-600','to-pink-500',
  ],
  theme: { extend: {} },
  plugins: [],
}


