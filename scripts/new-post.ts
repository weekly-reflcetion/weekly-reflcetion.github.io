import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import consola from "consola";

/**
 * Get the current date in the format "YYYY-MM-DD".
 * @returns The current date as a string.
 */
function getDate(): string {
	const today: Date = new Date();
	const year: number = today.getFullYear();
	const month: string = String(today.getMonth() + 1).padStart(2, "0");
	const day: string = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}
/**
 * Get the current week number.
 * @param date The date to get the week number for.
 *  @returns The current week number.
 */
function getWeekNumber(date: Date): number {
	const startOfYear = new Date(date.getFullYear(), 0, 1);
	const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000; // Number of milliseconds per day
	return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
}

interface WeekRange {
	start: Date;
	end: Date;
}
/**
 * Get the start and end dates of the current week.
 * @param date 
 * @returns The start and end dates of the current week.
 */
function getStartAndEndOfWeek(date: Date): WeekRange {
	const dayOfWeek = date.getDay() || 7; // Treat Sunday as the 7th day
	const startDate = new Date(date);
	const endDate = new Date(date);
  
	startDate.setDate(date.getDate() - dayOfWeek + 1); // Set to Monday
	endDate.setDate(date.getDate() - dayOfWeek + 7);   // Set to Sunday
  
	return {
	  start: startDate,
	  end: endDate,
	};
}

/**
 * Create a new post.
 * Prompts the user for a file name and extension, and creates a new post file with frontmatter.
 * If successful, opens the new post file in the default editor.
 */
async function createPost(): Promise<void> {
	consola.start("Ready to create a new post!");
	const today: Date = new Date();
	const weekDates = getStartAndEndOfWeek(today);
	const dayOfWeek: string = getWeekNumber(today).toString();
	const filename: string = `${today.toISOString().slice(0, 10)}`
	const ext: string = await consola.prompt("Select file extension: ", {
		type: "select",
		options: [".md", ".mdx"],
	});

	const targetDir = "./src/content/posts/";
	const fullPath: string = path.join(targetDir, `${filename}${ext}`);

	const frontmatter = `---
title: '${dayOfWeek}'
pubDate: ${getDate()}
categories: []
description: '${weekDates.start.toISOString().slice(0, 10)} to ${weekDates.end.toISOString().slice(0, 10)}'
---
# Week ${dayOfWeek}
  `;

	try {
		fs.writeFileSync(fullPath, frontmatter);
		consola.success("New post created successfully!");

		const open: boolean = await consola.prompt("Open the new post?", {
			type: "confirm",
			initial: true,
		});
		if (open) {
			consola.info(`Opening ${fullPath}...`);
			execSync(`code ${fullPath}`);
		}
	} catch (error) {
		consola.error((error as Error).message || "Failed to create new post!");
	}
}

createPost();
