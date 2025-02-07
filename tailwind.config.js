// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111827', // dark background
        card: '#1F2937',       // card background
        accent: '#3B82F6',     // blue accent for highlights
        lightText: '#F3F4F6',
        muted: '#9CA3AF',
      },
    },
  },
  plugins: [],
}

