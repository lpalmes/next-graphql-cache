import { fetchGraphql } from "@/lib/api";

export default async function Films() {
  const films = (
    await fetchGraphql(
      `
    {
      allFilms(first: 5) {
        films {
          id
          title
        }
      }
    }
   `,
      {}
    )
  ).data.allFilms.films;

  console.log({
    message: "rendering films",
    time: new Date().toString(),
  });
  return (
    <>
      <h1 className="text-4xl">{new Date().toTimeString()}</h1>
      <h1 className="text-2xl">Films</h1>
      <ul className="mt-4">
        {films.map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </>
  );
}
