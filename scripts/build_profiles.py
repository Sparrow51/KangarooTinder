"""Build src/data/kangaroos.json + optimised JPGs from COMPS/.

Usage: python -I scripts/build_profiles.py . COMPS/bios.txt
Pictures are paired with bios in order (picture sorted by Higgsfield timestamp = bio line order).
"""
import json
import os
import random
import sys

from PIL import Image

root, bios_path = sys.argv[1], sys.argv[2]
src_dir = os.path.join(root, 'COMPS', 'Higgsfield Pictures')
img_dir = os.path.join(root, 'public', 'images', 'kangaroos')
data_path = os.path.join(root, 'src', 'data', 'kangaroos.json')

bios = [l.strip() for l in open(bios_path, encoding='utf8').read().splitlines()[1:] if l.strip()]
files = sorted(f for f in os.listdir(src_dir) if f.lower().endswith('.png'))
assert len(bios) == 44 and len(files) == 44, (len(bios), len(files))

# Picture groups (by Higgsfield batch / visual style), used for interests and chat replies
GROUPS = {
    'street': range(1, 17),
    'bush': range(17, 21),
    'selfie': range(21, 26),
    'beach': range(26, 33),
    'studio': range(33, 37),
    'park': range(37, 45),
}

# name, tagline (the "job line" under the name), opening line – one per picture, in order
PEOPLE = [
    ('Skippy', '🏙️ Street photographer (mostly selfies)', "G'day! Did it hurt when you hopped down from heaven?"),
    ('Mango', '🍊 Vintage tee collector', 'Orange you glad we matched? 🍊'),
    ('Pearl', '📱 Influencer in training', 'Okay be honest, is this my good side?'),
    ('Bruce', '🚦 Professional footpath stander', 'Hey. I stood on that corner all day hoping someone like you would walk by.'),
    ('Bazza', '💪 Leg day, every day', "Hey! Quick question: do you even hop, bro?"),
    ('Dazza', '🎨 Graffiti artist & denim enthusiast', 'Nice profile. I would spray-paint your name on a wall (legally).'),
    ('Neville', '👃 Nose-first explorer', '*sniff sniff* You smell like a great match.'),
    ('Dusty', '🏜️ Backyard landscaper', 'Hey you! Fancy rolling around in some dirt together?'),
    ('Kylie', '💃 Dancer, can’t stop moving', "Finally, a match with taste! Wanna dance?"),
    ('Jacko', '😛 Class clown since joeyhood', 'Bleh! 😛 That’s my flirting face.'),
    ('Tilly', '🌸 Polite, sweet & a good listener', 'Hi there! I hope your day is going hop-tastic. 🌸'),
    ('Ruby', '🌙 Night owl, city roo', "Hey stranger. Are you a night hopper too?"),
    ('Rocco', '🕶️ Skater, sunglasses on head always', 'Yo. I’d take my sunnies off for you. Maybe.'),
    ('Shazza', '🌴 Retro fashion queen', "Cool ears, strong legs, zero drama. That’s me. And you?"),
    ('Gazza', '🧥 Puffer vest connoisseur', 'Hey! I wore my best vest for this match.'),
    ('Hopscotch', '⚽ Sunday league striker', 'You’ve been chosen as my teammate. No take-backs!'),
    ('Clancy', '🌲 Farmhand, fence leaner', "G'day mate. Lovely evening for a lean on the fence, isn’t it?"),
    ('Banjo', '🎒 Bushwalker & campfire storyteller', 'Hey! Got room in your backpack for one more roo?'),
    ('Wally', '🌅 Sunset chaser', 'Hey you. The sunset’s nice, but have you seen your profile?'),
    ('Duncan', '✨ Fairy-light romantic', 'I put the fairy lights up for you. Too much?'),
    ('Macca', '🧢 Bedroom DJ & bling lover', 'Yo! This match is louder than my speakers. 🔊'),
    ('Tash', '🪩 Party roo, mirror selfie pro', "Heyyy! Flash on, feelings on. 📸"),
    ('Brooke', '🩳 Vintage shorts collector', 'Hi! I promise my mirror selfies are better in person.'),
    ('Jazz', '🎧 Night-out photographer', 'Hey! Excuse the flash, I was blinded by your profile.'),
    ('Nigel', '🤓 Nerd with excellent glasses', 'Hi! Fun fact: a kangaroo can’t hop backwards. So, forward with us?'),
    ('Sandy', '🐚 Beach bum & shirt borrower', 'Hey! Do you also love love? Because I have a lot of it to pouch.'),
    ('Coral', '👜 Beach-bag packer', 'Hi! I packed snacks for two. Just saying.'),
    ('Reef', '🌊 Wave watcher', 'Hey! Wanna catch some waves? I’ll do the hopping.'),
    ('Shelly', '🦀 Rock-pool explorer', 'Hi! I found you in the rock pools of Kangaroo Tinder.'),
    ('Kai', '☀️ Sunrise surfer', 'G’day! You’ve got me glowing brighter than the sunrise.'),
    ('Sunny', '🏖️ Lifeguard (self-appointed)', 'Hey! Need someone to keep an eye on you at the beach?'),
    ('Shadow', '🌇 Mysterious silhouette', '...hey. 🌇'),
    ('Matilda', '📸 Model, studio regular', 'Hey you! Fancy a waltz?'),
    ('Boomer', '🏋️ Big red, gentle giant', 'Sup. Strong legs, soft heart. Mostly soft heart.'),
    ('Margot', '🖤 Fashion week roo', 'Darling! You have impeccable taste in kangaroos.'),
    ('Zara', '🪩 Chrome shoes, no regrets', 'Hi! Swipe right was the right call. Obviously.'),
    ('Ash', '🪨 Outback geologist', 'Hey. Every jump today was worth it, because it led to you.'),
    ('Sheila', '🏡 Homebody, fence-line patroller', 'Hi! My joey says you look trustworthy.'),
    ('Gus', '🌳 Park ranger (unofficial)', 'G’day! Picnic under my favourite gum tree?'),
    ('Daisy', '😊 Smiles at everyone', 'Hi hi hi! I’m smiling so much right now. 😊'),
    ('Willow', '🌾 Early-morning grazer', 'Good morning! Or evening. Either way, hi!'),
    ('Bertie', '🍀 Clover connoisseur', 'Hey! Do you like clover? Asking for my heart.'),
    ('Snowy', '❄️ Pale roo, warm heart', 'Hey! Don’t let the pale fur fool you, I’m very warm-hearted.'),
    ('Kip', '😴 Napper by day, cuddler by night', 'Hi! Just woke up from a nap. Best wake-up call ever.'),
]
assert len(PEOPLE) == 44

INTERESTS = {
    'street': ['Skateboarding', 'Streetwear', 'Graffiti', 'Hip-hop', 'Sneakers', 'City walks', 'Thrifting', 'Street food'],
    'bush': ['Bushwalking', 'Campfires', 'Country music', 'Sunsets', 'Fence repair', 'Stargazing'],
    'selfie': ['Mirror selfies', 'Parties', 'Karaoke', 'Fashion', 'Dancing', 'TikTok'],
    'beach': ['Swimming', 'Surfing', 'Sunbathing', 'Rock pools', 'Beach volleyball', 'Seashells'],
    'studio': ['Modelling', 'Fashion', 'Photography', 'Art galleries', 'Pilates', 'Coffee'],
    'park': ['Grazing', 'Picnics', 'Napping', 'Gardening', 'Birdwatching', 'Long hops'],
}

REPLIES = {
    'street': ['Haha, you’re funny for a non-marsupial.', 'So what’s your go-to snack? Mine’s fresh grass from the skate park.', 'Gotta hop, the crew is waiting. Catch you later! 🛹'],
    'bush': ['Ha! You’d fit right in out here in the bush.', 'Ever slept under the stars? Nothing beats it.', 'Sun’s going down, time to hop home. Talk tomorrow? 🌅'],
    'selfie': ['Omg stop, you’re making me blush 🙈', 'Wait, send me your best selfie. I’ll rate it.', 'Gotta go, my battery is at 1%! Text me 💕'],
    'beach': ['Haha love that. You seem like a beach person.', 'Sunrise swim this weekend? I’ll save you a spot on the sand.', 'Tide’s coming in, I need to hop! 🌊'],
    'studio': ['Cute. Very cute.', 'Tell me your best quality. Mine is my cheekbones.', 'Sorry darling, photoshoot in five. Ciao! 🖤'],
    'park': ['Aww, you’re lovely. 🥰', 'What’s your idea of a perfect day? Mine is grazing and napping.', 'Time for my afternoon nap. Talk soon? 😴'],
}

POUCH = ['Empty, room for two', 'Full of snacks', 'Organised', 'Lost my keys in it', 'Holding my phone',
         'Not applicable', 'Occupied by a joey', 'Full of love letters', 'Sand. Lots of sand', 'Mysterious']
SNACKS = ['Kangaroo grass', 'Fresh clover', 'Wildflowers', 'Saltbush', 'Eucalyptus shoots', 'Native grasses',
          'Fresh shoots', 'Bottlebrush blossoms', 'Dandelions', 'Lucerne']


def slug(name):
    return ''.join(c for c in name.lower() if c.isalnum() or c == '-')


def group_of(n):
    return next(g for g, r in GROUPS.items() if n in r)


def save_image(path_in, path_out, crop_top=0):
    im = Image.open(path_in).convert('RGB')
    if crop_top:
        im = im.crop((0, crop_top, im.width, im.height))
    # centre-crop to 3:4, then resize
    target = 3 / 4
    if im.width / im.height > target:
        w = round(im.height * target)
        x = (im.width - w) // 2
        im = im.crop((x, 0, x + w, im.height))
    else:
        h = round(im.width / target)
        y = (im.height - h) // 2
        im = im.crop((0, y, im.width, y + h))
    im = im.resize((900, 1200), Image.LANCZOS)
    im.save(path_out, 'JPEG', quality=80, optimize=True, progressive=True)


rng = random.Random(2026)
os.makedirs(img_dir, exist_ok=True)
profiles = []
for i, (fname, bio, (name, tagline, opener)) in enumerate(zip(files, bios, PEOPLE), start=1):
    pid = slug(name)
    g = group_of(i)
    out_name = f'{pid}-1.jpg'
    # picture 3 has a fake social-media header (with a human avatar) baked into the top ~10%
    save_image(os.path.join(src_dir, fname), os.path.join(img_dir, out_name), crop_top=215 if i == 3 else 0)
    profiles.append({
        'id': pid,
        'name': name,
        'age': rng.randint(3, 12),
        'distanceKm': rng.randint(1, 35),
        'tagline': tagline,
        'bio': bio,
        'interests': rng.sample(INTERESTS[g], 3),
        'stats': {
            'hopDistance': f'{rng.randint(5, 10)} m',
            'pouch': rng.choice(POUCH),
            'favouriteSnack': rng.choice(SNACKS),
        },
        'photos': [f'images/kangaroos/{out_name}'],
        'likesYou': rng.random() < 0.65,
        'aiText': True,
        'aiImage': True,
        'openingLine': opener,
        'replies': REPLIES[g],
        'source': {'image': fname, 'bioLine': i},
    })

# shuffle the deck so the styles are mixed instead of grouped
rng.shuffle(profiles)
with open(data_path, 'w', encoding='utf8') as f:
    json.dump(profiles, f, ensure_ascii=False, indent=2)
    f.write('\n')

total = sum(os.path.getsize(os.path.join(img_dir, f)) for f in os.listdir(img_dir) if f.endswith('.jpg'))
print(f'{len(profiles)} profiles, {sum(p["likesYou"] for p in profiles)} like you back, images {total / 1e6:.1f} MB total')
