export type EnvConfig = {
    env: "production" | "development"
    port: number
    mongodb_uri: string
}
process.env.NODE_ENV ??= "development"

const Parser = () => {
    const errors: string[] = []
    return {
        showErrorIfExist: () => {
            if (errors.length === 0) return

            const message = "Environment variables not defined:\n" + errors.join("\n") + "\n"

            throw new Error(message)
        },
        getOrThrow<T = string>(key: string, defaultValue?: T) {
            const value = process.env[key] ?? defaultValue
            if (value === undefined) {
                errors.push(`${key}=`)
                return
            }
            return value as T
        },
    }
}

export default (): EnvConfig => {
    const { getOrThrow, showErrorIfExist } = Parser()

    const env: EnvConfig = {
        env: getOrThrow("NODE_ENV", "development"),
        port: parseInt(getOrThrow("PORT", "3000")),
        mongodb_uri: getOrThrow("MONGODB_URI"),
    }

    showErrorIfExist()

    return env
}
