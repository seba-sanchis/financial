import { Tabs } from "@/components";

type Props = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: Props) {
  const balances = [
    {
      month: "January",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "February",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "March",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "April",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "May",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "June",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "July",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "August",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "September",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "October",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "November",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
    {
      month: "December",
      transactions: [
        { description: "Item 1", amount: 0 },
        { description: "Item 2", amount: 0 },
        { description: "Item 3", amount: 0 },
      ],
      total: 0,
    },
  ];

  const tabs = [
    { name: "Overview", url: "/balances/overview" },
    { name: "2023", url: "/balances/2023" },
    { name: "2024", url: "/balances/2024" },
  ];

  return (
    <main className="flex flex-col gap-4 flex-1 pt-4 pl-10">
      <h1 className="text-[28px] font-bold">Balances</h1>

      <Tabs tabs={tabs} slug={params.slug} />

      <div className="flex flex-col gap-8 mb-4">
        {balances.map((balance) => (
          <div key={balance.month}>
            <h2 className="text-xl font-bold pb-3 shadow-[inset_0_-1px_rgb(235,238,241)]">
              {balance.month}
            </h2>
            <table className="w-full">
              <tbody className="text-sm">
                {balance.transactions.map((transaction, index) => {
                  const isLastTransaction =
                    index === balance.transactions.length - 1;

                  return (
                    <tr
                      key={index}
                      className={`flex justify-between py-2 ${
                        isLastTransaction &&
                        "shadow-[inset_0_-1px_rgb(235,238,241)]"
                      }`}
                    >
                      <td>
                        <span>{transaction.description}</span>
                      </td>
                      <td>
                        <span>{transaction.amount}</span>
                      </td>
                    </tr>
                  );
                })}
                <tr className="flex justify-between py-2 font-semibold">
                  <td>
                    <span>Total</span>
                  </td>
                  <td>
                    <span>{balance.total}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </main>
  );
}
