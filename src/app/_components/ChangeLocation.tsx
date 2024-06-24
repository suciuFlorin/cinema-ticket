"use client";
import { COMPANY_LOCATIONS } from "../../../constants/Company";
import { usePathname, useRouter } from "next/navigation";
import { type Location } from "../../../types/Location";

const ChangeLocation = () => {
  const router = useRouter();
  const pathname = usePathname();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const currentLocation: Location =
    COMPANY_LOCATIONS.find((location) =>
      pathname.includes(location.pathName),
    ) ?? COMPANY_LOCATIONS[0];

  const locationLogo = currentLocation.logo;
  const handleLocationChange = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <div className="flex min-w-40 items-center justify-center">
        <img
          src={locationLogo}
          alt={"location logo"}
          style={{ width: "auto", height: "50px" }}
        />
      </div>
      <select
        className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
        value={currentLocation.pathName}
        onChange={(e) => handleLocationChange(e.target.value)}
      >
        {COMPANY_LOCATIONS.map((location) => (
          <option key={location.name} value={location.pathName}>
            {location.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default ChangeLocation;
