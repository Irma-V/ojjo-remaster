// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    // content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
    theme: {
      extend: {
      },
    },
    // plugins: [require("@tailwindcss/forms")],
    plugins: [],
  };
