/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("@vellumlabs/cexplorer-sdk/tailwind.config")],
  content: ["./src/**/*.{ts,tsx}", "./node_modules/@vellumlabs/cexplorer-sdk/**/*.{js,ts,tsx,mjs,cjs}"],
};
