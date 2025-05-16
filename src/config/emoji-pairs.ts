import { EmojiPair, NamedLevelList } from "features/game/slice";

const sort = (s: EmojiPair[]) => s.sort((a, b) => a.difficulty - b.difficulty);

export const LEVELS: NamedLevelList = [
    {
        name: "Classic",
        levels: [
            {
                id: 1,
                needle: "/emoji/emoji_u1f340.svg",
                hay: "/emoji/emoji_u2618.svg",
                name: "clover and shamrock",
                difficulty: 0.8
            }
        ]
    },
    {
        name: "Easy",
        levels: sort([
            {
                "id": 28911,
                "needle": "/emoji/emoji_u1f407.svg",
                "hay": "/emoji/emoji_u1fabf.svg",
                "name": "2891",
                "difficulty": 0.6
            },
            {
                "id": 24370,
                "needle": "/emoji/emoji_u2692.svg",
                "hay": "/emoji/emoji_u26cf.svg",
                "name": "2437",
                "difficulty": 0.61
            },
            {
                "id": 24371,
                "needle": "/emoji/emoji_u1f332.svg",
                "hay": "/emoji/emoji_u1f4b2.svg",
                "name": "2437",
                "difficulty": 0.61
            },
            {
                "id": 149150,
                "needle": "/emoji/emoji_u1f409.svg",
                "hay": "/emoji/emoji_u1f995.svg",
                "name": "14915",
                "difficulty": 0.53
            },
            {
                "id": 39511,
                "needle": "/emoji/emoji_u1f437.svg",
                "hay": "/emoji/emoji_u1f416.svg",
                "name": "3951",
                "difficulty": 0.58
            },
            {
                "id": 69930,
                "needle": "/emoji/emoji_u1f430.svg",
                "hay": "/emoji/emoji_u1f407.svg",
                "name": "6993",
                "difficulty": 0.56
            },
            {
                "id": 23920,
                "needle": "/emoji/emoji_u1f94c.svg",
                "hay": "/emoji/emoji_u1f345.svg",
                "name": "2392",
                "difficulty": 0.62
            },
            {
                "id": 23780,
                "needle": "/emoji/emoji_u1f99d.svg",
                "hay": "/emoji/emoji_u1f43a.svg",
                "name": "2378",
                "difficulty": 0.62
            },
            {
                "id": 182242,
                "needle": "/emoji/emoji_u1f479.svg",
                "hay": "/emoji/emoji_u1f47a.svg",
                "name": "18224",
                "difficulty": 0.52
            },
            {
                "id": 25232,
                "needle": "/emoji/emoji_u1f91c.svg",
                "hay": "/emoji/emoji_u1f932.svg",
                "name": "2523",
                "difficulty": 0.61
            },
            {
                "id": 25172,
                "needle": "/emoji/emoji_u1f42d.svg",
                "hay": "/emoji/emoji_u1f988.svg",
                "name": "2517",
                "difficulty": 0.61
            },
            {
                "id": 47152,
                "needle": "/emoji/emoji_u1f33f.svg",
                "hay": "/emoji/emoji_u1f333.svg",
                "name": "4715",
                "difficulty": 0.57
            },
            {
                "id": 29952,
                "needle": "/emoji/emoji_u1f1e6.svg",
                "hay": "/emoji/emoji_u1f1f1.svg",
                "name": "2995",
                "difficulty": 0.6
            },
            {
                "id": 28210,
                "needle": "/emoji/emoji_u1f624.svg",
                "hay": "/emoji/emoji_u1f644.svg",
                "name": "2821",
                "difficulty": 0.6
            },
            {
                id: 8,
                hay: "/emoji/emoji_u1fa99.svg",
                needle: "/emoji/emoji_u1f34b.svg",
                name: "when life gives you lemons",
                difficulty: 0.48
            },
            {
                id: 11,
                needle: "/emoji/emoji_u1f689.svg",
                hay: "/emoji/emoji_u1f68a.svg",
                name: "the arrival of a train",
                difficulty: 0.61
            },
            {
                id: 14,
                needle: "/emoji/emoji_u1f6eb.svg",
                hay: "/emoji/emoji_u1f6ec.svg",
                name: "takeoff and landing",
                difficulty: 0.66
            },
        ])
    },
    {
        name: "Medium",
        levels: sort([
            {
                id: 9,
                needle: "/emoji/emoji_u1f60e.svg",
                hay: "/emoji/emoji_u1f642.svg",
                name: "the cool kid",
                difficulty: 0.76
            },
            {
                id: 15,
                needle: "/emoji/emoji_u1f1ee.svg",
                hay: "/emoji/emoji_u1f1f9.svg",
                name: "the IT department",
                difficulty: 0.81
            },
            {
                "id": 4112,
                "needle": "/emoji/emoji_u1f42a.svg",
                "hay": "/emoji/emoji_u1f42b.svg",
                "name": "411",
                "difficulty": 0.77
            },
            {
                "id": 4132,
                "needle": "/emoji/emoji_u1f64a.svg",
                "hay": "/emoji/emoji_u1f648.svg",
                "name": "413",
                "difficulty": 0.77
            },
            {
                "id": 2460,
                "needle": "/emoji/emoji_u1f649.svg",
                "hay": "/emoji/emoji_u1f648.svg",
                "name": "246",
                "difficulty": 0.8
            },
            {
                "id": 3582,
                "needle": "/emoji/emoji_u1f63e.svg",
                "hay": "/emoji/emoji_u1f431.svg",
                "name": "358",
                "difficulty": 0.78
            },
            {
                "id": 5900,
                "needle": "/emoji/emoji_u23ec.svg",
                "hay": "/emoji/emoji_u23eb.svg",
                "name": "590",
                "difficulty": 0.74
            },
            {
                "id": 1661,
                "needle": "/emoji/emoji_u1f6c1.svg",
                "hay": "/emoji/emoji_u1f6c0.svg",
                "name": "166",
                "difficulty": 0.83
            },
            {
                "id": 2710,
                "needle": "/emoji/emoji_u1f476.svg",
                "hay": "/emoji/emoji_u1f474.svg",
                "name": "271",
                "difficulty": 0.8
            },
            {
                "id": 3630,
                "needle": "/emoji/emoji_u1fae2.svg",
                "hay": "/emoji/emoji_u1f92d.svg",
                "name": "363",
                "difficulty": 0.78
            },
            {
                "id": 3631,
                "needle": "/emoji/emoji_u1f642.svg",
                "hay": "/emoji/emoji_u1f644.svg",
                "name": "363",
                "difficulty": 0.78
            },
            {
                "id": 3632,
                "needle": "/emoji/emoji_u1f60f.svg",
                "hay": "/emoji/emoji_u1f609.svg",
                "name": "363",
                "difficulty": 0.78
            },
            {
                "id": 3640,
                "needle": "/emoji/emoji_u1f604.svg",
                "hay": "/emoji/emoji_u1f927.svg",
                "name": "364",
                "difficulty": 0.78
            },
            {
                "id": 3701,
                "needle": "/emoji/emoji_u1f467.svg",
                "hay": "/emoji/emoji_u1f9d1.svg",
                "name": "370",
                "difficulty": 0.77
            },
            {
                "id": 3761,
                "needle": "/emoji/emoji_u1f9d1.svg",
                "hay": "/emoji/emoji_u1f9d4.svg",
                "name": "376",
                "difficulty": 0.77
            },
            {
                "id": 9502,
                "needle": "/emoji/emoji_u1f30d.svg",
                "hay": "/emoji/emoji_u1f30e.svg",
                "name": "950",
                "difficulty": 0.71
            },
            {
                "id": 4111,
                "needle": "/emoji/emoji_u1f603.svg",
                "hay": "/emoji/emoji_u1f627.svg",
                "name": "411",
                "difficulty": 0.77
            },
            {
                "id": 15240,
                "needle": "/emoji/emoji_u26f9.svg",
                "hay": "/emoji/emoji_u1f3c3.svg",
                "name": "1524",
                "difficulty": 0.66
            },
            {
                "id": 15241,
                "needle": "/emoji/emoji_u1f425.svg",
                "hay": "/emoji/emoji_u1f423.svg",
                "name": "1524",
                "difficulty": 0.66
            },
            {
                "id": 15280,
                "needle": "/emoji/emoji_u26f4.svg",
                "hay": "/emoji/emoji_u1f6f3.svg",
                "name": "1528",
                "difficulty": 0.66
            },
            {
                "id": 22452,
                "needle": "/emoji/emoji_u1f5e1.svg",
                "hay": "/emoji/emoji_u1fa7c.svg",
                "name": "2245",
                "difficulty": 0.62
            },
            {
                "id": 22430,
                "needle": "/emoji/emoji_u1f357.svg",
                "hay": "/emoji/emoji_u1f998.svg",
                "name": "2243",
                "difficulty": 0.62
            },
            {
                "id": 22431,
                "needle": "/emoji/emoji_u1f620.svg",
                "hay": "/emoji/emoji_u1fae8.svg",
                "name": "2243",
                "difficulty": 0.62
            },
            {
                "id": 18261,
                "needle": "/emoji/emoji_u1f428.svg",
                "hay": "/emoji/emoji_u1f42d.svg",
                "name": "1826",
                "difficulty": 0.64
            },
            {
                "id": 20262,
                "needle": "/emoji/emoji_u1fa9b.svg",
                "hay": "/emoji/emoji_u1fa93.svg",
                "name": "2026",
                "difficulty": 0.63
            },
            {
                "id": 18542,
                "needle": "/emoji/emoji_u1f407.svg",
                "hay": "/emoji/emoji_u26c4.svg",
                "name": "1854",
                "difficulty": 0.64
            }
        ])
    },
    {
        name: "Hard",
        levels: sort([
            {
                "id": 170,
                "needle": "/emoji/emoji_u1f513.svg",
                "hay": "/emoji/emoji_u1f512.svg",
                "name": "17",
                "difficulty": 0.94
            },
            {
                "id": 192,
                "needle": "/emoji/emoji_u1f4e5.svg",
                "hay": "/emoji/emoji_u1f4e4.svg",
                "name": "19",
                "difficulty": 0.93
            },
            {
                "id": 592,
                "needle": "/emoji/emoji_u1f4ea.svg",
                "hay": "/emoji/emoji_u1f4eb.svg",
                "name": "59",
                "difficulty": 0.91
            },
            {
                "id": 1452,
                "needle": "/emoji/emoji_u2603.svg",
                "hay": "/emoji/emoji_u26c4.svg",
                "name": "145",
                "difficulty": 0.85
            },
            {
                "id": 492,
                "needle": "/emoji/emoji_u1f642.svg",
                "hay": "/emoji/emoji_u1f641.svg",
                "name": "49",
                "difficulty": 0.92
            },
            {
                "id": 6081,
                "needle": "/emoji/emoji_u1f4eb.svg",
                "hay": "/emoji/emoji_u1f4ec.svg",
                "name": "608",
                "difficulty": 0.74
            },
            {
                "id": 250,
                "needle": "/emoji/emoji_u1f626.svg",
                "hay": "/emoji/emoji_u1f627.svg",
                "name": "25",
                "difficulty": 0.93
            },
            {
                "id": 162,
                "needle": "/emoji/emoji_u1f604.svg",
                "hay": "/emoji/emoji_u1f600.svg",
                "name": "16",
                "difficulty": 0.94
            },
            {
                "id": 72,
                "needle": "/emoji/emoji_u0033.svg",
                "hay": "/emoji/emoji_u0038.svg",
                "name": "7",
                "difficulty": 0.94
            },
            {
                "id": 791,
                "needle": "/emoji/emoji_u0030.svg",
                "hay": "/emoji/emoji_u0039.svg",
                "name": "79",
                "difficulty": 0.89
            },
            {
                "id": 22,
                "needle": "/emoji/emoji_u1f603.svg",
                "hay": "/emoji/emoji_u1f600.svg",
                "name": "2",
                "difficulty": 0.95
            },
            {
                id: 13,
                needle: "/emoji/emoji_u1f6cf.svg",
                hay: "/emoji/emoji_u1f6cc.svg",
                name: "good night's sleep",
                difficulty: 0.86
            },
            {
                id: 10,
                needle: "/emoji/emoji_u1f596.svg",
                hay: "/emoji/emoji_u1f590.svg",
                name: "live long and prosper",
                difficulty: 0.86
            },
            {
                id: 12,
                needle: "/emoji/emoji_u1f91e.svg",
                hay: "/emoji/emoji_u261d.svg",
                name: "fingers crossed",
                difficulty: 0.87
            },
            {
                id: 7,
                needle: "/emoji/emoji_u2764.svg",
                hay: "/emoji/emoji_u1f494.svg",
                name: "heartbreak",
                difficulty: 0.87
            },
            /*{
                id: 6,
                needle: "/emoji/emoji_u1f51a.svg",
                hay: "/emoji/emoji_u1f519.svg",
                name: "backend developers",
                difficulty: 0.88
            },*/
            {
                id: 5,
                needle: "/emoji/emoji_u1f55b.svg",
                hay: "/emoji/emoji_u1f55a.svg",
                name: "clock",
                difficulty: 0.97
            },
            {
                id: 4,
                needle: "/emoji/emoji_u1f6b9.svg",
                hay: "/emoji/emoji_u1f6ba.svg",
                name: "wc",
                difficulty: 0.97
            },
            {
                id: 3,
                needle: "/emoji/emoji_u1f47f.svg",
                hay: "/emoji/emoji_u1f608.svg",
                name: "devil in the details",
                difficulty: 0.98
            },
        ])
    },

    {
        name: "Meme",
        levels: [
            {
                id: 2,
                needle: "/emoji/emoji_u1f47a.svg",
                hay: "/emoji/emoji_u2618.svg",
                name: "goblin and shamrock",
                difficulty: 0.1
            },
        ]
    }
]


export const EMOJI_PAIRS: EmojiPair[] = [
    ...LEVELS.flatMap(l => l.levels)
];

console.log("Levels: ", EMOJI_PAIRS.length);
