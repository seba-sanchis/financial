import { getSession } from "@/lib/auth";
import { FileUpload } from "@/components";

export default async function Home() {
  const session = await getSession();

  console.log("session ->", session);
  return (
    <main>
      <FileUpload />
    </main>
  );
}
