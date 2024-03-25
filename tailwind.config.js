/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "450px",
        md: "750px",
        lg: "1100px",
        xl: "1500px",
      },
      colors: {
        blue: "#049DF9",
        green: "#60CE64",
        gray: "#7A92A3",
        yellow: "#FDBC41",
        red: "#F24A4E",
        white: "#fff",
        bcolor: "#ccc",
        lblack: "#777",
        black: "#111",
        input: "#efefef",
        tp: "#00000029",
        redlt: "#F8EAE9",
      },
    },
  },
  plugins: [],
};
