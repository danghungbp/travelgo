/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0F2A3D", // deep night-map navy
          light: "#1B4B5A", // ocean teal
          dark: "#081824",
        },
        sand: {
          DEFAULT: "#EFE6D3", // paper / poster background
          dark: "#E0D2B4",
        },
        coral: {
          DEFAULT: "#E8633A", // sunset accent / CTA
          dark: "#C84F2A",
        },
        gold: {
          DEFAULT: "#C9A24B", // ticket stitching, dividers
          light: "#E1C788",
        },
        paper: "#FAF6EE",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Public Sans", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(15,42,61,0.06) 1px, transparent 0)",
        "poster-gradient": "linear-gradient(135deg, #0F2A3D 0%, #1B4B5A 50%, #0F2A3D 100%)",
      },
      borderRadius: {
        ticket: "6px",
      },
      boxShadow: {
        ticket: "0 4px 14px -2px rgba(15, 42, 61, 0.08), 0 2px 6px -1px rgba(15, 42, 61, 0.04)",
        poster: "0 10px 25px -3px rgba(15, 42, 61, 0.12), 0 4px 10px -2px rgba(15, 42, 61, 0.06)",
        "poster-hover": "0 20px 35px -5px rgba(15, 42, 61, 0.18), 0 8px 15px -3px rgba(15, 42, 61, 0.08)",
        inner: "inset 0 2px 4px 0 rgba(15, 42, 61, 0.06)",
      },
    },
  },
  plugins: [],
};
