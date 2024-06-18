import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"
import injectAttributes from "./plugins/injectAttributes"
import { VitePWA } from "vite-plugin-pwa"

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
        VitePWA({
            registerType: "autoUpdate",
            devOptions: {
                enabled: true,
            },
            manifest: {
                name: "DesEng",
                short_name: "DesEng",
                description: "Приложения для помощи изучения английского дизайнерам",
                theme_color: "#ffffff",
            },
            
        }),
        
    ],
    define:{
        __APP_ENV__:JSON.stringify(loadEnv('','.env'))
    },
    server: {
        host: "0.0.0.0",
        // proxy: {
        //     "/api": {
        //         target: "http://127.0.0.1:3000/",
        //         changeOrigin: true,
        //         ws: true,
        //         rewrite: (path) => path.replace(/^\/api/, ""),
        //     },
        // },
    },
}) 
