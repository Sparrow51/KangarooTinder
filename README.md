# 🦘 Kangaroo Tinder

**Live site:** https://sparrow51.github.io/KangarooTinder/

A Tinder-style dating app for kangaroos, made with generative AI:

| Tool | Used for |
|---|---|
| **Higgsfield** | Profile photos |
| **ChatGPT** | Bios, taglines and chat replies |
| **Claude Code** | All the code (React + Vite) |

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Add your AI content

1. **Text:** use the ChatGPT prompt in [docs/ai-prompts.md](docs/ai-prompts.md) and paste the JSON into `src/data/kangaroos.json`.
2. **Photos:** generate them in Higgsfield with the template in the same doc, then save them as `public/images/kangaroos/<id>-1.jpg` and `<id>-2.jpg`.
3. Set `"aiText": true` / `"aiImage": true` on each profile so the AI labels show.

## Features

- Swipe cards: drag, use the buttons, or press ← / → (↑ opens the profile)
- "It's a Match!" popup when a kangaroo with `likesYou: true` is liked
- Profile view with photos, bio, interests and kangaroo stats
- Matches list and chat with scripted replies, including a typing indicator
- Likes, matches and chats are saved in the browser (localStorage)
- About page that discloses which AI tools made what

## Build and deploy

```bash
npm run build
```

This creates a `dist/` folder of static files. Because `vite.config.js` uses `base: './'`, the folder works on any host:

- **Netlify Drop:** drag `dist/` onto https://app.netlify.com/drop
- **GitHub Pages:** push the repo, then publish `dist/` (for example with the `gh-pages` package: `npx gh-pages -d dist`)
- **Vercel / Cloudflare Pages:** import the repo, with build command `npm run build` and output folder `dist`
