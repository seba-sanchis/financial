"use client";

import { FaCloudArrowUp } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import { Transaction, Type } from "@/types";
import { DragAndDrop, Table } from "@/components";
import { formatCurrency, formatRate, formatType } from "@/lib/utils/formatter";

type Props = {
  type: Type;
};

export default function FileUpload({ type }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [profit, setProfit] = useState(0);

  const lastRevenue = 2200000;
  const lastExpense = 500000;

  useEffect(() => {
    // Calculate amount
    const amountValue = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    setAmount(amountValue);

    // Calculate rate
    const rateValue = (amountValue / lastRevenue) * 100;
    setRate(rateValue);

    // Calculate profit
    const profitValue = amountValue - lastExpense;
    setProfit(profitValue);

    const lastValue = type === "revenue" ? lastRevenue : lastExpense;

    // Calculate growth
    const growthValue = ((amountValue - lastValue) / lastValue) * 100;
    setGrowth(growthValue);
  }, [transactions]);

  const metrics = [
    {
      title: formatType(type),
      value: formatCurrency(amount),
    },
    {
      title: type === "revenue" ? "Profit" : "Rate",
      value:
        type === "revenue"
          ? `${amount ? formatCurrency(profit) : formatCurrency(0)}`
          : formatRate(rate),
    },
    {
      title: "Growth",
      value: `${amount ? formatRate(growth) : formatRate(0)}`,
    },
    {
      title: "Transactions",
      value: transactions.length,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DragAndDrop type={type} setTransactions={setTransactions} />

      <div className="flex p-3">
        {metrics.map((metric) => (
          <div key={metric.title} className="flex flex-col gap-3 flex-1">
            <div className="text-sm font-medium">{metric.title}</div>
            <div className="text-2xl text-[--foreground-2] font-medium">
              {metric.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <button className="flex items-center self-end gap-1.5 px-2 py-1 border border-[--border-1] hover:border-[--border-2] active:bg-[--hover-2] rounded-md">
          <FaCloudArrowUp size={12} />
          <span className="text-sm font-semibold">Save Payments</span>
        </button>
        <Table body={transactions} />
      </div>
    </div>
  );
}
