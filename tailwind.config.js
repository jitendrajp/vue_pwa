export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      borderRadius: {
        xl: '16px',
        '2xl': '24px'
      },
      backdropBlur: {
        xl: '20px'
      }
    }
  },
  plugins: []
}
