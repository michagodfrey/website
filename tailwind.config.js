/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  safelist: [
    "prose", // Ensure the prose class is always included
    "prose-lg", // If you use the larger prose
    "prose-img", // Prose images
    "prose-h1",
    "prose-h2",
    "prose-h3", // Headers used in your content
    "prose-p", // Paragraphs
    "w-6",
    "h-6", // SVG icon sizes for your footer
    "hover:text-blue-500", // Hover color for icons
  ],
};

