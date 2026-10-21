# AI prompts for Kangaroo Tinder

Ready-made prompts for the two content tools. Save your actual conversations and screenshots too, because the report needs them (prompts, iterations, mistakes).

---

## 1. ChatGPT – profile text and chat replies

Paste this into ChatGPT. It returns JSON that can go straight into `src/data/kangaroos.json`.

```
You are writing fun, family-friendly dating profiles for a parody app called "Kangaroo Tinder",
where all the users are kangaroos in the Australian outback.

Write 8 profiles. Return ONLY valid JSON (an array, no comments, no markdown), using exactly this shape:

{
  "id": "lowercase-id-without-spaces",
  "name": "Kangaroo name",
  "age": 3-12,
  "distanceKm": 1-25,
  "tagline": "One short, punchy line (max 60 characters)",
  "bio": "2-3 funny sentences in first person, full of kangaroo puns",
  "interests": ["3-5 short interests"],
  "stats": { "hopDistance": "e.g. 8 m", "pouch": "short funny pouch status", "favouriteSnack": "a real kangaroo food" },
  "photos": ["images/kangaroos/<id>-1.jpg", "images/kangaroos/<id>-2.jpg"],
  "likesYou": true or false (make 5 of them true),
  "aiText": true,
  "aiImage": true,
  "openingLine": "the first chat message this kangaroo sends after a match – a cheesy pickup line",
  "replies": ["3 follow-up chat messages that work no matter what the user wrote, ending with a goodbye"]
}

Rules: every kangaroo has a clearly different personality (e.g. gym bro, poet, single mum, party girl,
nerd, grumpy old boomer, hippie, adventurer). Keep it PG. No real people or brands.
Use these ids and names: skippy/Skippy, matilda/Matilda, boomer/Boomer, kylie/Kylie,
hopscotch/Hopscotch, sheila/Sheila, rooben/Roo-ben, joey-bloom/Joey Bloom.
```

**Tips**
- Keeping the same ids means the image filenames below still match. If you change the ids, rename the images too.
- Check the facts: are the "favourite snacks" real kangaroo food? Are the replies too repetitive? Note what you corrected, because that's material for the quality-assurance section of the report.
- Want the site in Norwegian? Add "Write all text in Norwegian (bokmål)" to the prompt.

---

## 2. Higgsfield – kangaroo photos

Make **2 photos per kangaroo**, in **portrait 3:4** (or 9:16). Keep the same style for all of them so the app looks consistent.

**Template** (replace the parts in `[brackets]` using each kangaroo's bio):

```
Photorealistic dating-app profile photo of a [colour, e.g. red / grey] kangaroo named [Name],
[personality detail, e.g. "wearing tiny boxing gloves", "holding a flower", "reading a book of poems"],
in the Australian outback at golden hour, warm sunlight, shallow depth of field,
smartphone selfie style, centered composition, vertical 3:4 portrait, high detail, natural fur texture
```

Second photo, a different scene of the same character:

```
Same kangaroo [Name], candid full-body photo [doing a hobby from their interests],
outback landscape background, natural light, vertical 3:4, photorealistic
```

**Saving the images**
- Save them as `public/images/kangaroos/<id>-1.jpg` and `<id>-2.jpg` (for example `skippy-1.jpg`).
- Keep them under about 300 KB each (Squoosh.app works well) so the site loads fast.
- Any photo that's missing automatically shows the "Photo coming soon" placeholder.
- Set `"aiImage": true` on the profile once its photos are AI-generated, and the card will show an "AI image" label.
