import { PluginOption } from "vite"

import packageJson from "../package.json" assert { type: "json" }

const InjectAttributesPlugin = (
    resolve: (version: string) => Record<string, string>,
): PluginOption => {
    return {
        name: "InjectAttributesPlugin",
        enforce: "post",
        async generateBundle(options, bundle) {
            const indexHtml = bundle["index.html"]
            if (indexHtml.type === "asset") {
                const data = packageJson.version
                const record = resolve(data)
                console.log("\n\n", record, "\n\n")

                const string = Object.entries(record)
                    .map(([key, value]) => `${key}="${value}"`)
                    .join(" ")

                indexHtml.source = indexHtml.source.toString().replace("%attributes%", string)
            }
        },
    }
}

export default InjectAttributesPlugin
