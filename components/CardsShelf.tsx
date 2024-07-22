import { FaChartLine, FaFilter, FaGoogle, FaUpload } from "react-icons/fa";

const howItWorks = [
  {
    icon: <FaGoogle size={20} color="var(--accent-1)" />,
    title: "Sign in with Google",
    description:
      "Quickly and securely connect your Google account to access and manage your finances.",
  },
  {
    icon: <FaUpload size={20} color="var(--accent-1)" />,
    title: "Upload your receipts",
    description:
      "Easily capture, store, and organize your purchase receipts for efficient expense tracking.",
  },
  {
    icon: <FaFilter size={20} color="var(--accent-1)" />,
    title: "Select your expenses",
    description:
      "Categorize your spending to understand your financial habits and create budgets.",
  },
  {
    icon: <FaChartLine size={20} color="var(--accent-1)" />,
    title: "View your financial transactions",
    description:
      "Analyze your spending patterns, identify savings opportunities, and make informed financial decisions.",
  },
];

export default function CardsShelf() {
  return (
    <section className="flex justify-center w-full">
      <div className="flex flex-col gap-6 p-4 w-full max-w-screen-lg">
        <h2 className="text-[18px] text-[--accent-1] font-semibold">
          How it works
        </h2>
        <h1 className="text-[38px] text-[--foreground-2] font-semibold">
          Get started to take control of your money
        </h1>
        <div className="grid grid-cols-4">
          {howItWorks.map((step) => (
            <div key={step.title} className="flex flex-col gap-4">
              <div className="flex justify-center items-center size-10 rounded-full bg-[--accent-2]">
                {step.icon}
              </div>
              <h3 className="text-sm text-[--foreground-2] font-semibold">
                {step.title}
              </h3>
              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
