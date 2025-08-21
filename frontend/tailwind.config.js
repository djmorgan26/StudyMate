/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          blue: '#2563eb',
          navy: '#1e3a8a',
          gray: '#64748b',
          light: '#f8fafc'
        }
      }
    },
  },
  plugins: [],
}
