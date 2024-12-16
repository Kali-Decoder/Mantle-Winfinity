/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["class", "[data-theme='dark']"], // Flexibility with `class` and custom attribute
  daisyui: {
    themes: [
      {
        light: {
          primary: "#4A90E2", // Vibrant blue
          "primary-content": "#FFFFFF", // White text for contrast
          secondary: "#A6C9FF", // Muted blue for secondary actions
          "secondary-content": "#1A202C", // Dark text for readability
          accent: "#FFB233", // Bright orange for accents
          "accent-content": "#1A202C",
          neutral: "#F4F5F7", // Light gray background for cards
          "neutral-content": "#1A202C",
          "base-100": "#FFFFFF", // Main background
          "base-200": "#F7FAFC", // Slightly lighter sections
          "base-300": "#E2E8F0", // Borders or subtle contrasts
          "base-content": "#1A202C", // Main text color
          info: "#3ABFF8", // Cool blue for informational elements
          success: "#22C55E", // Green for success
          warning: "#F59E0B", // Yellow for warnings
          error: "#EF4444", // Red for errors
          "--rounded-btn": "0.5rem", // Smooth button corners
        },
      },
      {
        dark: {
          primary: "#0E76FD", // Bright blue for high contrast
          "primary-content": "#0B1120", // Very dark blue-gray
          secondary: "#222E46", // Deep muted blue for secondary actions
          "secondary-content": "#9BA9C6", // Softer light gray for readability
          accent: "#FDC500", // High-contrast yellow for accents
          "accent-content": "#0B1120", // Dark text for accents
          neutral: "#121212", // Very dark neutral background
          "neutral-content": "#F5F5F5", // Very light gray for contrast
          "base-100": "#181818", // Darker main background
          "base-200": "#1E1E1E", // Slightly lighter sections
          "base-300": "#252525", // Borders or subtle contrasts
          "base-content": "#EAEAEA", // High-contrast light text color
          info: "#0E76FD", // Same bright blue for information
          success: "#34EEB6", // Bright green for success
          warning: "#FFA500", // Orange for warnings
          error: "#FF4D4D", // Bright red for errors
          "--rounded-btn": "0.375rem", // Slightly rounded corners for buttons
          "--shadow-high-contrast": "0px 0px 8px 2px rgba(14, 118, 253, 0.5)", // High contrast shadow for primary
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: {
        "high-contrast-primary": "0px 0px 12px 4px rgba(14, 118, 253, 0.75)", // Glow effect for primary elements
        "high-contrast-accent": "0px 0px 12px 4px rgba(253, 197, 0, 0.75)", // Glow effect for accent elements
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
};
