import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// Custom plugin to handle figma:asset imports by providing a placeholder image
const figmaAssetPlugin = () => {
  return {
    name: 'figma-asset-plugin',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return id;
      }
    },
    load(id: string) {
      if (id.startsWith('figma:asset/')) {
        return `export default "https://placehold.co/200x200?text=Figma+Asset"`;
      }
    }
  };
};

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    figmaAssetPlugin(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './nextjs-export'),
      'next/image': path.resolve(__dirname, './src/next-image'),
      'next/link': path.resolve(__dirname, './src/next-link'),
      'next/navigation': path.resolve(__dirname, './src/next-navigation'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
