import { z } from "zod";

const configSchema = z.object({
  NEXT_PUBLIC_API: z.string(),
});

const parsedConfig = configSchema.safeParse({NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API});
if (!parsedConfig.success) {
  console.error("Invalid environment variables:", parsedConfig.error.issues);
  throw new Error("Invalid environment variables");
}
const config = parsedConfig.data;
export default config;