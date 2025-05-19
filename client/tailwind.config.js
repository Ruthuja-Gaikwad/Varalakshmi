module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Example of adding custom colors (add more as needed)
      colors: {
        customYellow: '#FFCC00',
        customBlue: '#0066FF',
      },
      // Adding additional spacing options if needed
      spacing: {
        128: '32rem', // Example: Add extra large spacing option
      },
      scrollBehavior: ['responsive'],
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    // Optional plugins for better utilities
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
};
