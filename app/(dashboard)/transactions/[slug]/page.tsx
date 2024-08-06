import { Choicebox, Table } from "@/components";
import { getTransactions } from "@/lib/actions/transaction.actions";
import { Transaction } from "@/types";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const transactions: Transaction[] = (await getTransactions()) || [];

  const slug = params.slug;

  // Filter transactions based on the slug
  const filteredTransactions =
    slug === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === slug);

  const tabs = [
    { name: "All", url: "/transactions/all", quantity: transactions.length },
    {
      name: "Revenue",
      url: "/transactions/revenue",
      quantity: transactions.filter((tx) => tx.type === "revenue").length,
    },
    {
      name: "Expense",
      url: "/transactions/expense",
      quantity: transactions.filter((tx) => tx.type === "expense").length,
    },
  ];

  return (
    <main className="flex flex-col gap-4 flex-1 pt-4 pl-10">
      <h1 className="text-[28px] font-bold">Transactions</h1>

      <Choicebox tabs={tabs} slug={params.slug} />

      <Table body={filteredTransactions} />
    </main>
  );
}
