// @ts-nocheck
import { fetchGraphql, fetchPeople } from "@/lib/api";
import Films from "./films";
import People from "./people";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const firstParam = searchParams["first"];
  // default to 5 when there is no first param
  const first = typeof firstParam === "string" ? parseInt(firstParam) : 5;
  return (
    <main className="container mx-auto p-4">
      <People first={first} />
    </main>
  );
}
