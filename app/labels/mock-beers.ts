import { Beer } from './beer';


export const BEERS: Beer[] = [
	{
		id: 1,
		name: "Sorachi Sensei",
		ibu: 35,
		ebc: 5,
		alcool: 6,
		picture: "app/labels/assets/icons/sorachi.png",
		text: "Ingrédients : Eau, Malt d'orge, Malt de blé,\nFroment, Houblon Sorachi Ace,\nSucre, Levure  ",
		types: ["IPA", "Blanche"],
		created: new Date(),
		seed: ""
	},
	{
		id: 2,
		name: "Succelos",
		ibu: 10,
		ebc: 15,
		alcool: 6.5,
		picture: "app/labels/assets/glyphicons/png/glyphicons-2-leaf.png",
		text: "Ingredients : ...",
		types: ["Blonde", "Cervoise"],
		created: new Date(),
		seed: ""
	},
	{
		id: 3,
		name: "Super SMASH",
		ibu: 20,
		ebc: 12,
		alcool: 4.5,
		picture: "app/labels/assets/glyphicons/png/glyphicons-1-glass.png",
		text: "Ingredients : ...",
		types: ["Blonde"],
		created: new Date(),
		seed: ""
	},
	{
		id: 4,
		name: "Speciale",
		ibu: 25,
		ebc: 75,
		alcool: 6,
		picture: "app/labels/assets/glyphicons/png/glyphicons-1-glass.png",
		text: "Ingredients : ...",
		types: ["Porter", "Speciale","Ale"],
		created: new Date(),
		seed: ""
	}
];
