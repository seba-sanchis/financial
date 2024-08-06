"use client";

import { FaCloudArrowUp } from "react-icons/fa6";
import React, { useEffect, useState, useTransition } from "react";

import { Transaction, Type } from "@/types";
import { DragAndDrop, Table } from "@/components";
import { formatCurrency, formatRate, formatType } from "@/lib/utils";
import { newTransactions } from "@/lib/actions/transaction.actions";
import Loading from "@/app/loading";
import { revenue } from "@/constants";

type Props = {
  type: Type;
};

export default function FileUpload({ type }: Props) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [profit, setProfit] = useState(0);
  const [isPending, startTransition] = useTransition();

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

  function handleClick() {
    startTransition(async () => {
      if (transactions) await newTransactions(transactions);
      setTransactions([]);
    });
  }

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
        <button
          onClick={handleClick}
          className={`flex items-center justify-center self-end gap-1.5 px-2 py-1 ${type === "revenue" ? "w-[114px]" : "w-[139px]"} h-[30px] border border-[--border-1] hover:border-[--border-2] active:bg-[--hover-2] rounded-md`}
        >
          {isPending ? (
            <Loading size={12} />
          ) : (
            <>
              <FaCloudArrowUp size={12} />
              <span className="text-sm font-semibold">{`Save ${
                type === "revenue" ? "Billing" : "Payments"
              }`}</span>
            </>
          )}
        </button>
        <Table body={transactions} />
      </div>
    </div>
  );
}
