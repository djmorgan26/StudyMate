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
          'light-blue': '#dbeafe',
          gray: '#64748b',
          'light-gray': '#f1f5f9',
          'dark-gray': '#334155',
          background: '#f8fafc',
          card: '#ffffff',
        },
        status: {
          success: '#059669',
          warning: '#d97706',
          error: '#dc2626',
          info: '#0284c7',
        },
        lookup: {
          'popup-bg': '#ffffff',
          border: '#e2e8f0',
          highlight: '#fef3c7',
        }
      },
      fontFamily: {
        'medical': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}