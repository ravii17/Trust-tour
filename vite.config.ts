const isDev = process.env.NODE_ENV === "development";

export default defineConfig({
  plugins: [
    react(),
    isDev && componentTagger()
  ].filter(Boolean),
});