import { fetchGraphql } from "@/lib/api";

export default async function People(props: { first: number }) {
  const people = (
    await fetchGraphql(
      `
      query PeopleQuery ($first: Int!) {
       allPeople(first: $first) {
          people {
            id
            name
          }
        }
    }
   `,
      { first: props.first }
    )
  ).data.allPeople.people;

  return (
    <>
      <h1 className="text-4xl">{new Date().toTimeString()}</h1>
      <h1 className="text-2xl">People</h1>
      <ul className="mt-4">
        {people.map((p: any) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}
