/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/*.tsx", "./src/components/*.tsx"],
	theme: {
		extend: {
			container: {
				screens: {
					sm: "100%",
					md: "100%",
					lg: "100%",
				},
			},
		},
	},
	plugins: [],
}
