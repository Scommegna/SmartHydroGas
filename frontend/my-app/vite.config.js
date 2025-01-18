import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default {
  server: {
    proxy: {
      "/api": {
        target: "http://localhost/",
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
};
