import { fetchGraphql } from "@/lib/api";

export default async function Films() {
  const planets = (
    await fetchGraphql(
      `
    {
     allPlanets(first: 5) {
       planets {
         id
         name
       }
     }
    }
   `,
      {}
    )
  ).data.allPlanets.planets;

  console.log({
    message: "rendering planets",
    time: new Date().toString(),
  });
  return (
    <>
      <h1 className="text-4xl">{new Date().toTimeString()}</h1>
      <h1 className="text-2xl">Planet</h1>
      <ul className="mt-4">
        {planets.map((p: any) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
}
