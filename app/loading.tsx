import Image from "next/image";

type Props = {
  size: number;
}

export default function Loading({ size=50 }: Props) {
  return (
    <div className="flex justify-center items-center">
      <Image
        src="/assets/loader.svg"
        width={size}
        height={size}
        alt="loader"
        className="object-contain animate-spin"
      />
    </div>
  );
}
