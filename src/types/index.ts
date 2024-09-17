import type { CollectionEntry } from "astro:content";
import type { LANGUAGES } from "../i18n.ts";

export type Post = CollectionEntry<"posts">;

export interface Config {
	title: string;
	author: string;
	desc: string;
	website: string;
	locale: keyof typeof LANGUAGES;
	themeStyle: "light" | "auto" | "dark";
	socials: Array<{
		name: string;
		href: string;
	}>;
	header: {
		twitter: string;
	};
	navs: Array<{
		name: string;
		href: string;
	}>;
	category_map: Array<{
		name: string;
		path: string;
	}>;
}
