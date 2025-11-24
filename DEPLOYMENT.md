# Scolaia Backend Deployment Guide

## Quick Deploy to Render (Recommended - Free Tier)

### 1. Create Render Account

- Go to https://render.com
- Sign up with your GitHub account

### 2. Deploy from GitHub

1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `ozkoc/scolaia`
3. Configure:
   - **Name**: `scolaia-api`
   - **Region**: Frankfurt (EU Central)
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Add Environment Variables

In Render dashboard, add:

- `GROQ_API_KEY`: Your Groq API key
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render default)
- `API_PREFIX`: `/api`

### 4. Update Netlify Configuration

After deployment, copy your Render URL (e.g., `https://scolaia-api.onrender.com`) and update `netlify.toml`:

```toml
[[redirects]]
  from = "/api/*"
  to = "https://scolaia-api.onrender.com/api/:splat"
  status = 200
  force = true
```

Then commit and push:

```bash
git add netlify.toml
git commit -m "Update backend URL for production"
git push
```

### 5. Verify Deployment

- Check Render logs for "API ready on..."
- Test health endpoint: `https://scolaia-api.onrender.com/api/health`
- Wait for Netlify to rebuild (automatic)

## Alternative: Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select `ozkoc/scolaia`
4. Add environment variables (same as above)
5. Railway will auto-detect Node.js and deploy

## Local Development

```bash
cd server
npm install
cp .env.example .env
# Add your GROQ_API_KEY to .env
npm run dev
```

## Notes

- Render free tier may sleep after 15 minutes of inactivity (first request takes ~30s to wake)
- Railway free tier includes $5/month credit
- Both support automatic deployments from GitHub
