import { useRecipes } from "../hooks/useRecipes";

export default function HomePage() {
  const { data, isLoading, error } = useRecipes();

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong.</p>;

  return (
    <>
      {data?.map((recipe) => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </>
  );
}
