import { CardsShelf, Hero } from "@/components";

export default async function Page() {
  return (
    <main className="flex flex-col items-center gap-4">
      <Hero />
      <CardsShelf />
    </main>
  );
}
