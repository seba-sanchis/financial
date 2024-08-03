import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex justify-center w-full bg-[--background-2]">
      <div className="grid grid-cols-2 px-4 py-10 w-full max-w-screen-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-[56px] font-semibold text-[--foreground-2] leading-[64px]">
            Simplify your financial life.
          </h1>
          <p className="text-[18px] text-[--foreground-2]">
            Mint helps you see your entire financial picture in one place.
            Securely connect your accounts and track your spending to make
            smarter money decisions.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/assets/piggy-hero.svg"
            alt="piggy"
            width={512}
            height={512}
          />
        </div>
      </div>
    </section>
  );
}
