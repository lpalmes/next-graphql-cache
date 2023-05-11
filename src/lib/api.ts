import { Kind, parse } from "graphql";
import { unstable_cache } from "next/cache";
import crypto from "crypto";
import { cache } from "react";

function hash(input: string): string {
	return crypto.createHash("md5").update(input).digest("hex");
}

export async function fetchPeople(page: number) {
	const res = await fetch("https://swapi.dev/api/people?page=" + page, {
		next: {
			tags: ["rest"],
			revalidate: false,
		},
	});
	return await res.json();
}

export const fetchGraphql = async (query: string, variables: any) => {
	const resp = await fetch(
		"https://swapi-graphql.netlify.app/.netlify/functions/index",
		{
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query,
				variables,
			}),
		}
	);
	return await resp.json();
};

function getTagsFromQuery(query: string): Array<string> {
	const ast = parse(query);
	const tags = [];

	for (const item of ast.definitions) {
		if (item.kind === Kind.OPERATION_DEFINITION) {
			for (const field of item.selectionSet.selections) {
				if (field.kind === Kind.FIELD) {
					tags.push("root:" + field.name.value);
				}
			}
		}
	}

	return tags;
}
