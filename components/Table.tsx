import { Transaction } from "@/types";

type Props = {
  head: string[];
  body: Transaction[];
};

export default function Table({ head, body }: Props) {
  return (
    <table className="w-full text-sm border-y border-[gray]">
      <thead>
        <tr className="border-y border-[--border]">
          {head.map((item, index) => (
            <th
              key={index}
              className="py-2 text-xs text-left font-bold shadow-[inset_0_1px_0_0_#ebeef1]"
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
            className="border-y border-[--border] hover:bg-[--hover-2] hover:cursor-pointer"
          >
            <td
              className={`"py-2 font-semibold ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >{`$${item.amount.toFixed(2)}`}</td>
            <td
              className={`py-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {item.payment}
            </td>
            <td
              className={`py-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {item.description}
            </td>
            <td
              className={`py-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {item.category}
            </td>
            <td
              className={`py-2 ${
                index === body.length - 1 && "shadow-[inset_0_-1px_0_0_#ebeef1]"
              }`}
            >
              {" "}
              {new Date(item.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
