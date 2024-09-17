import type { Config } from "~/types";

export const configDefault: Config = {
	title: "Weekly Reflections",
	author: "",
	desc: "My weekly reflections on life, the universe, and everything.",
	website: "https://astro-theme-typography.vercel.app/",
	locale: "en-us",
	themeStyle: "light",
	socials: [
		{
			name: "github",
			href: "https://github.com/cantpr09ram",
		},
		{
			name: "rss",
			href: "/atom.xml",
		},
		{
			name: "twitter",
			href: "https://x.com/cantpr09ram",
		},
	],
	header: {
		twitter: "@cantpr09ram",
	},
	navs: [
	],
	category_map: [],
};
