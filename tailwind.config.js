/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		screens: {
			sm: "480px",
			md: "768px",
			lg: "1025px",
			xl: "1280px",
			xl2: "1360px",
		},
		extend: {
			spacing: {
				"88px": "88px",
				"92px": "92px",
				"100px": "100px",
			},
			animation: {
				"spin-slow": "spin 3s linear infinite",
			},
		},
	},
	plugins: [],
};
