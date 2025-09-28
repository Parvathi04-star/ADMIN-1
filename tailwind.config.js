/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  // --- ADD THIS SAFELIST BLOCK ---
  safelist: [
    "bg-green-100",
    "text-green-800",
    "bg-green-500",
    "bg-blue-100",
    "text-blue-800",
    "bg-blue-500",
    "bg-yellow-100",
    "text-yellow-800",
    "bg-yellow-500",
    "bg-red-500",
  ],
  // -----------------------------

  theme: {
    extend: {},
  },
  plugins: [],
};
