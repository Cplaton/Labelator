import { Beer } from './beer';


export const BEERS: Beer[] = [
	{
		id: 1,
		name: "Sorachi Sensei",
		ibu: 35,
		ebc: 5,
		alcool: 6,
		picture: "app/labels/assets/glyphicons/png/glyphicons-1-glass.png",
		text: "Ingrédients : ...",
		types: ["IPA", "Blanche"],
		created: new Date(),
		seed: Math.floor(Math.random() * 65536)
	},
	{
		id: 2,
		name: "Succelos",
		ibu: 10,
		ebc: 15,
		alcool: 6.5,
		picture: "app/labels/assets/glyphicons/png/glyphicons-2-leaf.png",
		text: "Ingrédients : ...",
		types: ["Blonde", "Cervoise"],
		created: new Date(),
		seed: Math.floor(Math.random() * 65536)
	},
	{
		id: 3,
		name: "Super SMASH",
		ibu: 20,
		ebc: 12,
		alcool: 4.5,
		picture: "app/labels/assets/glyphicons/png/glyphicons-1-glass.png",
		text: "Ingrédients : ...",
		types: ["Blonde"],
		created: new Date(),
		seed: Math.floor(Math.random() * 65536)
	},
	{
		id: 4,
		name: "Speciale",
		ibu: 25,
		ebc: 75,
		alcool: 6,
		picture: "app/labels/assets/glyphicons/png/glyphicons-1-glass.png",
		text: "Ingrédients : ...",
		types: ["Porter", "Speciale","Ale"],
		created: new Date(),
		seed: Math.floor(Math.random() * 65536)
	}
];
