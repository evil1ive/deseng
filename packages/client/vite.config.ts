import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

import injectAttributes from "./plugins/injectAttributes"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        svgr(),
        injectAttributes((version) => ({
            version: `Версия: ${version}`,
            "build-date": new Date().toISOString(),
        })),
    ],
    server: {
        host: "0.0.0.0",
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3000/",
                changeOrigin: true,
                ws: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})
