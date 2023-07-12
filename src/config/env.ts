import { z } from 'zod';

const envVariables = z.object({
  DATABASE_LOCAL: z.string(),
  PORT: z.number(),
});

export default envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
