/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media', // Enable dark mode based on system preference
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Inter Placeholder', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light mode colors from original Framer design
        // Use simple names that work with dark: prefix
        bg: {
          light: '#FBF9F5', // rgb(251, 249, 245) - light mode, warm paper
          dark: '#11141D', // rgb(17, 20, 29) - dark mode, night blue (hue of the link purple)
        },
        text: {
          primary: '#050505', // rgb(10, 10, 10) - light mode primary text
          'primary-dark': '#EDEDED', // rgb(237, 237, 237) - dark mode primary text
          gray: '#74747B', // rgb(116, 116, 123) - light mode gray text
          'gray-dark': '#9B9BA0', // hsl(240, 4%, 63%) - dark mode gray text
          footer: '#666666', // rgb(102, 102, 102) - light mode footer
          'footer-dark': '#9B9BA0', // dark mode footer
        },
        link: {
          DEFAULT: '#FF4700', // rgb(255, 71, 0) - light mode, Cron orange
          dark: '#7B92ED', // rgb(123, 146, 237) - dark mode
          'hover-dark': '#8CA0ED', // rgb(140, 160, 237) - dark mode hover
        },
        divider: {
          DEFAULT: '#CAC5D3', // rgb(202, 205, 211) - light mode
          dark: '#515151', // hsl(223, 2%, 32%) - dark mode
        },
        // Keep existing gray for backward compatibility
        gray: {
          text: '#74747B',
          light: '#CAC5D3',
          divider: '#E2E4E9',
        },
      },
      spacing: {
        // Custom spacing values from original design
        'section-gap': '54px', // Gap between sections
        'item-gap': '24px', // Gap between items within sections
      },
      screens: {
        // Match original breakpoint at 1200px
        'desktop': '1200px',
      },
    },
  },
  plugins: [],
}

