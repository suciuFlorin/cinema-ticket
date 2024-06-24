import { getServerAuthSession } from "@base/server/auth";
import Link from "next/link";
import { Paths } from "../../../constants/Paths";

const AdminButton = async () => {
  const session = await getServerAuthSession();
  const isAdmin = session?.user?.role === "ADMIN";

  return isAdmin ? (
    <Link href={Paths.ADMIN}>
      <button className="rounded-full bg-yellow-300 px-10 py-2 font-semibold no-underline transition hover:bg-yellow-100">
        Admin
      </button>
    </Link>
  ) : null;
};

export default AdminButton;
