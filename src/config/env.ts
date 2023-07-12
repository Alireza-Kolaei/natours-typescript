import { z } from 'zod'
import * as path from 'path';
import * as dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVariables = z.object({
    DATABASE_URL: z.string()
})

envVariables.parse(process.env)

declare global {
    namespace NodeJS {
        interface ProcessEnv
        extends z.infer<typeof envVariables> {}
    }
}

console.log(process.env.DATABASE_URL);
