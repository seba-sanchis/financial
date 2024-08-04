import Link from "next/link";

type Props = {
  tabs: {
    name: string;
    url: string;
  }[];
  slug: string;
};

export default function Tabs({ tabs, slug }: Props) {
  return (
    <div className="flex gap-2 pb-1 border-b border-[oklch(89.78%_0.010_247.94deg)]">
      {tabs.map((item) => (
        <Link
          key={item.name}
          href={item.url}
          className={`px-2 py-0.5 rounded-md ${
            slug === item.name.toLocaleLowerCase()
              ? "text-[--accent-1] hover:bg-[--accent-2]"
              : "hover:text-[--foreground-3] hover:bg-[--hover-2]"
          }`}
        >
          {item.name}
          <div
            className={`relative top-[7px] ${
              slug === item.name.toLocaleLowerCase() &&
              "border-b-2 border-[--accent-1]"
            }`}
          />
        </Link>
      ))}
    </div>
  );
}
