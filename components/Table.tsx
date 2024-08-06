import { Transaction } from "@/types";
import {
  formatCategory,
  formatCurrency,
  formatDate,
  formatPayment,
} from "@/lib/utils";

type Props = {
  body: Transaction[];
};

export default function Table({ body }: Props) {
  const head = ["Amount", "Payment method", "Description", "Category", "Date"];

  return (
    <table className="w-full text-sm border-y border-[gray]">
      <thead>
        <tr className="border-y border-[--border-1]">
          {head.map((item, index) => (
            <th
              key={index}
              className={`p-2 text-xs text-left font-bold shadow-[inset_0_1px_0_0_#ebeef1] ${
                index === 0 && "text-right"
              }`}
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((item, index) => (
          <tr
            key={index}
            className="border-y border-[--border-1] hover:bg-[--hover-2] hover:cursor-pointer"
          >
            <td
              className={`p-2 font-semibold text-right ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {formatCurrency(item.amount)}
            </td>
            <td
              className={`p-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {formatPayment(item.payment)}
            </td>
            <td
              className={`p-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {item.description}
            </td>
            <td
              className={`p-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {formatCategory(item.category)}
            </td>
            <td
              className={`p-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {formatDate(item.date)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
