import dotenv from 'dotenv'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentDir = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(currentDir, '../.env')
console.log('📁 Loading .env from:', envPath)
dotenv.config({ path: envPath })
console.log('🔐 GROQ_API_KEY:', process.env.GROQ_API_KEY ? `Loaded (${process.env.GROQ_API_KEY.substring(0, 10)}...)` : 'Not found')
