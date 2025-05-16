import { EmojiPair, NamedLevelList } from "features/game/slice";

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
        name: "Hard",
        levels: [
            {
                id: 3,
                needle: "/emoji/emoji_u1f47f.svg",
                hay: "/emoji/emoji_u1f608.svg",
                name: "devil in the details",
                difficulty: 0.98
            },
            {
                id: 4,
                needle: "/emoji/emoji_u1f6b9.svg",
                hay: "/emoji/emoji_u1f6ba.svg",
                name: "wc",
                difficulty: 0.97
            },
            {
                id: 5,
                needle: "/emoji/emoji_u1f55b.svg",
                hay: "/emoji/emoji_u1f55a.svg",
                name: "clock",
                difficulty: 0.97
            }
        ]
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

];
