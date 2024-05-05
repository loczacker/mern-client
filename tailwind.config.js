/** @type {import('tailwindcss').Config} */

import { colors } from '@mui/material';

const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'primary': '#b68bdcb1',
        'secondary': '#2E4CFF',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

