/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                bungee: ['Bungee Tint', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
                lilita: ['Lilita One', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
