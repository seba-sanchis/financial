import { FileUpload } from "@/components";

export default async function Page() {
  return (
    <main className="flex flex-col gap-4 flex-1 pt-4 pl-10">
      <h1 className="text-[28px] font-bold">Payments</h1>

      <FileUpload />
    </main>
  );
}
