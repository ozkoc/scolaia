# Hugging Face Integration Setup

## 1. Get Your Free API Key

1. Go to [Hugging Face](https://huggingface.co/)
2. Sign up or log in
3. Go to **Settings** → **Access Tokens**
4. Click **New token**
5. Select **Read** access
6. Copy the token (starts with `hf_...`)

## 2. Add API Key to Server

1. Open `server/.env`
2. Replace `your_huggingface_token_here` with your actual token:
   ```
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxx
   ```

## 3. Test the Integration

```bash
cd server
npm run dev
```

Then test Askia chat in the browser!

## Model Information

**Current Model**: `mistralai/Mixtral-8x7B-Instruct-v0.1`

- ✅ Excellent German & English support
- ✅ Good for educational content
- ✅ Free tier available
- ⚡ Fast responses

## Troubleshooting

If you get rate limit errors:

1. Wait a few minutes
2. Or switch to a different model in `server/src/services/chat.ts`

Alternative models:

- `meta-llama/Llama-3.1-8B-Instruct` (faster, lighter)
- `google/gemma-2-9b-it` (good quality)
