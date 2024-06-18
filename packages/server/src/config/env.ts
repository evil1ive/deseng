import { config, DotenvParseOutput } from "dotenv"

export type EnvConfig = {
    port: number
    mongodb_uri: string
    access_key: string
    refresh_key: string
}

const Parser = () => {
    const errors: string[] = []
    let conf:DotenvParseOutput
    const {error, parsed} = config();    
    if(error){
        throw new Error(".env не найден")
    }
    else if(!parsed){
        throw new Error('.env не заполнен');
    }
    conf = parsed;
    return {
        showErrorIfExist: () => {
            if (errors.length === 0) return

            const message = "Environment variables not defined:\n" + errors.join("\n") + "\n"

            throw new Error(message)
        },
        getOrThrow<T = string>(key: string, defaultValue?: T) {
            const value = conf[key] ?? defaultValue
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
        port: parseInt(getOrThrow("PORT", "3000")),
        mongodb_uri: getOrThrow("MONGODB_URI"),
        access_key:getOrThrow("ACCESS_SIGNATURE"),
        refresh_key:getOrThrow("REFRESH_SIGNATURE")
    }

    showErrorIfExist()

    return env
}
