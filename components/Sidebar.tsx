import { Session } from "@/types";
import OAuth from "./OAuth";

type Props = {
  session: Session;
};

export default function Sidebar({ session }: Props) {
  return (
    <div>
      <OAuth session={session} />
    </div>
  );
}
