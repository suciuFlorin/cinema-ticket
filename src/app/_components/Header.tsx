import { COMPANY_LOGO, COMPANY_NAME } from "../../../constants/Company";

import { Paths } from "../../../constants/Paths";
import ChangeLocation from "@base/app/_components/ChangeLocation";
import Link from "next/link";
import AdminButton from "@base/app/_components/AdminButton";

const Header = () => {
  return (
    <div className="fixed flex w-full justify-between bg-gray-900 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link href={Paths.MAIN}>
            <img
              src={COMPANY_LOGO}
              alt={COMPANY_NAME}
              style={{ height: "50px", width: "100px", objectFit: "contain" }}
            />
          </Link>
          <ChangeLocation />
        </div>
        <div className="flex space-x-4">
          <AdminButton />
          <Link
            href={"/api/auth/signin"}
            className="rounded-full bg-white/80 px-10 py-2 font-semibold no-underline transition hover:bg-white/100"
          >
            Sign in &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
