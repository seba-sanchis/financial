import Link from "next/link";

type Props = {
  tabs: {
    name: string;
    url: string;
    quantity: number;
  }[];
  slug: string;
};

export default function Choicebox({ tabs, slug }: Props) {
  return (
    <div className="flex gap-2">
      {tabs.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          className={`flex flex-col gap-1 flex-1 rounded-lg ${
            slug === item.name.toLocaleLowerCase()
              ? "p-[11px] border-2 border-[--accent-1] text-[--accent-1]"
              : "p-3 border border-[--border] hover:border-[--accent-1]"
          }`}
        >
          <span
            className={`text-sm ${
              slug === item.name.toLocaleLowerCase() && "font-semibold"
            }`}
          >
            {item.name}
          </span>
          <span className="font-bold">{item.quantity}</span>
        </Link>
      ))}
    </div>
  );
}
