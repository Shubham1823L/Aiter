import 'dotenv/config'
import * as z from 'zod'

const EnvSchema = z.object({
    PORT: z.coerce.number().gt(0).default(8080),
    POSTGRES_URL: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production"]),
})

// const env = {
//     PORT: process.env.PORT,
//     POSTGRES_URL: process.env.POSTGRES_URL,
//     ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
//     REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
//     NODE_ENV: process.env.NODE_ENV,
// }

const parsedData = EnvSchema.safeParse(process.env)
if (!parsedData.success) {
    console.error("Invalid Environment Variables Detected, exiting...")
    process.exit(1)
}

const env = parsedData.data

export default env