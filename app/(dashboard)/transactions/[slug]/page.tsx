import { Choicebox, Table, Tabs } from "@/components";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const tabs = [
    { name: "All", url: "/transactions/all", quantity: 2 },
    { name: "Income", url: "/transactions/income", quantity: 1 },
    { name: "Outcome", url: "/transactions/outcome", quantity: 1 },
  ];

  const head = ["Amount", "Payment method", "Description", "Category", "Date"];

  const transactions = [
    {
      date: new Date("2024-02-5"),
      description: "Export of services",
      category: "Work",
      payment: "transfer",
      amount: 100,
    },
    {
      date: new Date("2024-05-12"),
      category: "Home",
      description: "Alquiler",
      payment: "credit_card",
      amount: 40,
    },
    {
      date: new Date("2024-08-29"),
      category: "Transport",
      description: "Seguro",
      payment: "debit_card",
      amount: 20,
    },
  ];

  return (
    <main className="flex flex-col gap-4 flex-1 pt-4 pl-10">
      <h1 className="text-[28px] font-bold">Transactions</h1>

      <Choicebox tabs={tabs} slug={params.slug} />

      <Table head={head} body={transactions} />
    </main>
  );
}
