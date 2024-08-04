"use client";

import React, { useEffect, useState } from "react";

import { Transaction } from "@/types";
import { DragAndDrop, Table } from "@/components";
import { formatCurrency, formatRate } from "@/lib/utils/formatter";
import { FaCloudArrowUp } from "react-icons/fa6";

export default function FileUpload() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expense, setExpense] = useState(0);
  const [expenseRate, setExpenseRate] = useState(0);
  const [largestTransaction, setLargestTransaction] = useState(0);

  useEffect(() => {
    // Calculate total expense
    const total = transactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );
    setExpense(total);

    // Calculate percentage in relation to 1000
    const percentageValue = (total / 2210000) * 100;
    setExpenseRate(percentageValue);

    // Calculate largest transaction amount
    const largest = transactions.reduce(
      (max, transaction) => Math.max(max, transaction.amount),
      0
    );
    setLargestTransaction(largest);
  }, [transactions]);

  const metrics = [
    {
      title: "Expense",
      value: formatCurrency(expense),
    },
    {
      title: "Expense Rate",
      value: formatRate(expenseRate),
    },
    {
      title: "Largest Transaction",
      value: `${formatCurrency(largestTransaction)}`,
    },
    {
      title: "Transactions",
      value: transactions.length,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <DragAndDrop setTransactions={setTransactions} />

      <div className="flex p-3">
        {metrics.map((metric) => (
          <div className="flex flex-col gap-3 flex-1">
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
