export default {
	name: "recipe",
	title: "Ricetta",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "author",
			title: "Author",
			type: "reference",
			to: { type: "author" },
		},
		{
			name: "people",
			title: "Persone",
			description: "per quante persone è la ricetta?",
			type: "number",
		},
		{
			name: "mainImage",
			title: "Main image",
			type: "image",
			options: {
				hotspot: true,
			},
		},
		{
			name: "categories",
			title: "Categories",
			type: "array",
			of: [{ type: "reference", to: { type: "category" } }],
		},
		{
			name: "ingredients",
			title: "Ingredienti",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "quantity",
							title: "Quantità",
							type: "string",
						},
						{
							name: "ingredient",
							title: "Ingrediente",
							type: "reference",
							to: { type: "ingredient" },
						},
						{
							name: "notes",
							title: "Note",
							type: "string",
						},
					],
					preview: {
						select: {
							title: "quantity",
							subtitle: "ingredient.name",
						},
					},
				},
			],
		},
		{
			name: "timing",
			title: "Preparazione",
			description: "Minuti",
			type: "number",
		},
		{
			name: "difficulty",
			title: "Difficoltà",
			type: "string",
			layout: "radio",
			list: [
				{
					value: 1,
					title: "Facile",
				},
				{
					value: 2,
					title: "Medio",
				},
				{
					value: 3,
					title: "Difficle",
				},
				{
					value: 4,
					title: "Cheff 6*",
				},
				{
					value: 5,
					title: "Mamma",
				},
			],
		},
		{
			name: "body",
			title: "Body",
			type: "blockContent",
		},
		{
			name: "public",
			title: "Pubblicato",
			type: "boolean",
		},
	],

	preview: {
		select: {
			title: "title",
			author: "author.name",
			ingredients: "ingredients",
			media: "mainImage",
		},
		prepare(selection) {
			const { author, ingredients } = selection;
			return Object.assign({}, selection, {
				subtitle:
					author &&
					`by ${author} - ${ingredients.length} ${
						ingredients.length > 1 ? "Ingredienti" : "Ingrediente"
					}`,
			});
		},
	},
};
