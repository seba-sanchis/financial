import { FileUpload } from "@/components";

export default async function Page() {
  return (
    <main className="flex flex-col gap-4 flex-1 pt-4 pl-10">
      <h1 className="text-[28px] font-bold">Billing</h1>

      <FileUpload type="revenue" />
    </main>
  );
}
