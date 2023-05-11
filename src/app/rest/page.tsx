// @ts-nocheck
import { fetchPeople } from "@/lib/api";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const firstParam = searchParams["first"];
  // default to 5 when there is no first param
  const first = typeof firstParam === "string" ? parseInt(firstParam) : 5;
  const people = (await fetchPeople(first)).results;
  console.log({
    message: "rendering people",
    time: new Date().toString(),
  });
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl">{new Date().toTimeString()}</h1>
      <h1 className="text-2xl">People</h1>
      <ul className="mt-4">
        {people.map((p: any) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </main>
  );
}
