import { EmojiPair, NamedLevelList } from "features/game/slice";

const sort = (s: EmojiPair[]) => s.sort((a, b) => a.difficulty - b.difficulty);

export const LEVELS: NamedLevelList = [
    {
        name: "Classic",
        levels: [
            {
                id: 1,
                needle: "emoji/emoji_u1f340.svg",
                hay: "emoji/emoji_u2618.svg",
                name: "the four-leaf clover",
                difficulty: 0.8,
                price: 0
            },
            {
                "id": 492,
                "needle": "emoji/emoji_u1f642.svg",
                "hay": "emoji/emoji_u1f641.svg",
                "name": "turn that frown upside down",
                "difficulty": 0.92,
                "price": 0
            },
        ]
    },
    {
        name: "Easy",
        levels: sort([
            {
                "id": 24370,
                "needle": "emoji/emoji_u2692.svg",
                "hay": "emoji/emoji_u26cf.svg",
                "name": "almost communism",
                "difficulty": 0.61,
                "price": 1000
            },
            {
                "id": 24371,
                "needle": "emoji/emoji_u1f332.svg",
                "hay": "emoji/emoji_u1f4b2.svg",
                "name": "the money tree",
                "difficulty": 0.61,
                "price": 2000
            },
            {
                "id": 149150,
                "needle": "emoji/emoji_u1f409.svg",
                "hay": "emoji/emoji_u1f995.svg",
                "name": "fictional and real dragons",
                "difficulty": 0.53,
                "price": 1000
            },
            {
                "id": 39511,
                "needle": "emoji/emoji_u1f437.svg",
                "hay": "emoji/emoji_u1f416.svg",
                "name": "oink",
                "difficulty": 0.58,
                "price": 1500
            },
            {
                "id": 69930,
                "needle": "emoji/emoji_u1f430.svg",
                "hay": "emoji/emoji_u1f407.svg",
                "name": "bunnies",
                "difficulty": 0.56,
                "price": 1000
            },
            {
                "id": 182242,
                "needle": "emoji/emoji_u1f479.svg",
                "hay": "emoji/emoji_u1f47a.svg",
                "name": "japanese masks",
                "difficulty": 0.52,
                "price": 1000
            },
            {
                "id": 25172,
                "needle": "emoji/emoji_u1f42d.svg",
                "hay": "emoji/emoji_u1f988.svg",
                "name": "mouse and sharks",
                "difficulty": 0.61,
                "price": 2000
            },
            {
                id: 8,
                hay: "emoji/emoji_u1fa99.svg",
                needle: "emoji/emoji_u1f34b.svg",
                name: "when life gives you lemons",
                difficulty: 0.32,
                price: 500
            },
            {
                id: 11,
                needle: "emoji/emoji_u1f689.svg",
                hay: "emoji/emoji_u1f68a.svg",
                name: "the arrival of a train",
                difficulty: 0.61,
                price: 1000
            },
            {
                id: 14,
                needle: "emoji/emoji_u1f6eb.svg",
                hay: "emoji/emoji_u1f6ec.svg",
                name: "takeoff and landing",
                difficulty: 0.66,
                price: 1000
            },
        ])
    },
    {
        name: "Medium",
        levels: sort([
            {
                id: 9,
                needle: "emoji/emoji_u1f60e.svg",
                hay: "emoji/emoji_u1f642.svg",
                name: "the cool kid",
                difficulty: 0.76,
                price: 2000
            },
            {
                id: 15,
                needle: "emoji/emoji_u1f1ee.svg",
                hay: "emoji/emoji_u1f1f9.svg",
                name: "the IT department",
                difficulty: 0.81,
                price: 3000
            },
            {
                "id": 4112,
                "needle": "emoji/emoji_u1f42a.svg",
                "hay": "emoji/emoji_u1f42b.svg",
                "name": "camels",
                "difficulty": 0.77,
                "price": 3000
            },
            {
                "id": 4132,
                "needle": "emoji/emoji_u1f64a.svg",
                "hay": "emoji/emoji_u1f648.svg",
                "name": "speak no evil, see no evil",
                "difficulty": 0.77,
                "price": 3000
            },
            {
                "id": 2460,
                "needle": "emoji/emoji_u1f649.svg",
                "hay": "emoji/emoji_u1f648.svg",
                "name": "hear no evil, see no evil",
                "difficulty": 0.8,
                "price": 3000
            },
            {
                "id": 3582,
                "needle": "emoji/emoji_u1f63e.svg",
                "hay": "emoji/emoji_u1f431.svg",
                "name": "grumpy kitty",
                "difficulty": 0.78,
                "price": 3000
            },
            {
                "id": 5900,
                "needle": "emoji/emoji_u23ec.svg",
                "hay": "emoji/emoji_u23eb.svg",
                "name": "up and down",
                "difficulty": 0.74,
                "price": 3000
            },
            {
                "id": 1661,
                "needle": "emoji/emoji_u1f6c1.svg",
                "hay": "emoji/emoji_u1f6c0.svg",
                "name": "take a bath",
                "difficulty": 0.83,
                "price": 3000
            },
            {
                "id": 2710,
                "needle": "emoji/emoji_u1f476.svg",
                "hay": "emoji/emoji_u1f474.svg",
                "name": "youth",
                "difficulty": 0.8,
                "price": 2000
            },
            {
                "id": 3630,
                "needle": "emoji/emoji_u1fae2.svg",
                "hay": "emoji/emoji_u1f92d.svg",
                "name": "blush",
                "difficulty": 0.78,
                "price": 2000
            },
            {
                "id": 3631,
                "needle": "emoji/emoji_u1f642.svg",
                "hay": "emoji/emoji_u1f644.svg",
                "name": "whatever",
                "difficulty": 0.78,
                "price": 2000
            },
            {
                "id": 3632,
                "needle": "emoji/emoji_u1f60f.svg",
                "hay": "emoji/emoji_u1f609.svg",
                "name": "ykwim",
                "difficulty": 0.78,
                "price": 2000
            },
            {
                "id": 3640,
                "needle": "emoji/emoji_u1f604.svg",
                "hay": "emoji/emoji_u1f927.svg",
                "name": "bless you",
                "difficulty": 0.78,
                "price": 2000
            },
            {
                "id": 3701,
                "needle": "emoji/emoji_u1f467.svg",
                "hay": "emoji/emoji_u1f9d1.svg",
                "name": "face type A and B",
                "difficulty": 0.77,
                "price": 2000
            },
            {
                "id": 3761,
                "needle": "emoji/emoji_u1f9d1.svg",
                "hay": "emoji/emoji_u1f9d4.svg",
                "name": "shaved",
                "difficulty": 0.77,
                "price": 2000
            },
            {
                "id": 4111,
                "needle": "emoji/emoji_u1f603.svg",
                "hay": "emoji/emoji_u1f627.svg",
                "name": "u ok buddy?",
                "difficulty": 0.77,
                "price": 2000
            },
            {
                "id": 15240,
                "needle": "emoji/emoji_u26f9.svg",
                "hay": "emoji/emoji_u1f3c3.svg",
                "name": "find the one with the ball",
                "difficulty": 0.66,
                "price": 2000
            },
            {
                "id": 15280,
                "needle": "emoji/emoji_u26f4.svg",
                "hay": "emoji/emoji_u1f6f3.svg",
                "name": "ship",
                "difficulty": 0.76,
                "price": 3000
            },
            {
                "id": 22431,
                "needle": "emoji/emoji_u1f620.svg",
                "hay": "emoji/emoji_u1fae8.svg",
                "name": "grumpy and dizzy",
                "difficulty": 0.62,
                "price": 3000
            },
            {
                "id": 18261,
                "needle": "emoji/emoji_u1f428.svg",
                "hay": "emoji/emoji_u1f42d.svg",
                "name": "koala and mouse",
                "difficulty": 0.64,
                "price": 5000
            },
            {
                "id": 6081,
                "needle": "emoji/emoji_u1f4eb.svg",
                "hay": "emoji/emoji_u1f4ec.svg",
                "name": "you've got mail",
                "difficulty": 0.74,
                "price": 3000
            },
            {
                "id": 18542,
                "needle": "emoji/emoji_u1f407.svg",
                "hay": "emoji/emoji_u26c4.svg",
                "name": "winter story",
                "difficulty": 0.64,
                "price": 3000
            },
            {
                "id": 791,
                "needle": "emoji/emoji_u0030_20e3.svg",
                "hay": "emoji/emoji_u0039_20e3.svg",
                "name": "pricing trick",
                "difficulty": 0.8,
                "price": 3999
            },
        ])
    },
    {
        name: "Hard",
        levels: sort([
            {
                "id": 170,
                "needle": "emoji/emoji_u1f513.svg",
                "hay": "emoji/emoji_u1f512.svg",
                "name": "lockpicking",
                "difficulty": 0.94,
                "price": 5000
            },
            {
                "id": 192,
                "needle": "emoji/emoji_u1f4e5.svg",
                "hay": "emoji/emoji_u1f4e4.svg",
                "name": "in and out",
                "difficulty": 0.93,
                "price": 5000
            },
            {
                "id": 592,
                "needle": "emoji/emoji_u1f4ea.svg",
                "hay": "emoji/emoji_u1f4eb.svg",
                "name": "the impossible mailbox",
                "difficulty": 0.91,
                "price": 5000
            },
            {
                "id": 1452,
                "needle": "emoji/emoji_u26c4.svg",
                "hay": "emoji/emoji_u2603.svg",
                "name": "let it snow",
                "difficulty": 0.85,
                "price": 5000
            },
            {
                "id": 250,
                "needle": "emoji/emoji_u1f626.svg",
                "hay": "emoji/emoji_u1f627.svg",
                "name": "lost eyebrows",
                "difficulty": 0.93,
                "price": 5000
            },
            {
                "id": 162,
                "needle": "emoji/emoji_u1f604.svg",
                "hay": "emoji/emoji_u1f600.svg",
                "name": "smiley faces",
                "difficulty": 0.94,
                "price": 5000
            },
            {
                id: 13,
                needle: "emoji/emoji_u1f6cf.svg",
                hay: "emoji/emoji_u1f6cc.svg",
                name: "good night's sleep",
                difficulty: 0.86,
                price: 5000
            },
            {
                id: 10,
                needle: "emoji/emoji_u1f596.svg",
                hay: "emoji/emoji_u1f590.svg",
                name: "live long and prosper",
                difficulty: 0.86,
                price: 5000
            },
            {
                id: 12,
                needle: "emoji/emoji_u1f91e.svg",
                hay: "emoji/emoji_u261d.svg",
                name: "fingers crossed",
                difficulty: 0.87,
                price: 5000
            },
            {
                id: 7,
                needle: "emoji/emoji_u2764.svg",
                hay: "emoji/emoji_u1f494.svg",
                name: "heartbreak",
                difficulty: 0.87,
                price: 5000
            },
            /*{
                id: 6,
                needle: "emoji/emoji_u1f51a.svg",
                hay: "emoji/emoji_u1f519.svg",
                name: "backend developers",
                difficulty: 0.88
            },*/
            {
                id: 5,
                needle: "emoji/emoji_u1f55b.svg",
                hay: "emoji/emoji_u1f55a.svg",
                name: "time for some real action",
                difficulty: 0.97,
                price: 5000
            },
            {
                id: 4,
                needle: "emoji/emoji_u1f6b9.svg",
                hay: "emoji/emoji_u1f6ba.svg",
                name: "wc",
                difficulty: 0.97,
                price: 5000
            },
            {
                id: 3,
                needle: "emoji/emoji_u1f47f.svg",
                hay: "emoji/emoji_u1f608.svg",
                name: "devil in the details",
                difficulty: 0.98,
                price: 5000
            },
            {
                "id": 22,
                "needle": "emoji/emoji_u1f603.svg",
                "hay": "emoji/emoji_u1f600.svg",
                "name": "the final boss",
                "difficulty": 1.,
                "price": 9001
            },
        ])
    },

    {
        name: "Meme",
        levels: [
            {
                "id": 47152,
                "needle": "emoji/emoji_u1f33f.svg",
                "hay": "emoji/emoji_u1f333.svg",
                "name": "tree leaf",
                "difficulty": 0.1,
                "price": 1000
            },
            {
                id: 2,
                needle: "emoji/emoji_u1f47a.svg",
                hay: "emoji/emoji_u2618.svg",
                name: "i used this for debugging",
                difficulty: 0.1,
                price: 1000
            },
            {
                "id": 22430,
                "needle": "emoji/emoji_u1f357.svg",
                "hay": "emoji/emoji_u1f998.svg",
                "name": "fried kangaroo",
                "difficulty": 0.1,
                "price": 1000
            },
            {
                "id": 9502,
                "needle": "emoji/emoji_u1f30d.svg",
                "hay": "emoji/emoji_u1f30e.svg",
                "name": "earth, surprisingly easy",
                "difficulty": 0.3,
                "price": 1000
            },
            {
                "id": 22452,
                "needle": "emoji/emoji_u1f5e1.svg",
                "hay": "emoji/emoji_u1fa7c.svg",
                "name": "he who takes the sword...",
                "difficulty": 0.2,
                "price": 1000
            },
            {
                id: 420,
                needle: "emoji/emoji_u1f340.svg",
                hay: "emoji/emoji_u1f340.svg",
                name: "pure luck",
                difficulty: 3.0,
                price: 777
            },
        ]
    }
]


export const EMOJI_PAIRS: EmojiPair[] = [
    ...LEVELS.flatMap(l => l.levels)
];

console.log("Levels: ", EMOJI_PAIRS.length);
