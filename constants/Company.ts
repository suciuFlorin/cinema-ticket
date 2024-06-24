import { type Location } from "../types/Location";

export const COMPANY_NAME = "Cinema Palace";
export const COMPANY_LOGO =
  "https://www.cinemapalace.ro/library/style/images/logo.png";

export const COMPANY_LOCATIONS: Location[] = [
  createLocation(
    1,
    "Oradea Shopping City",
    "Strada Czárán Gyula 87, Oradea 410223",
    "/location-logos/osc.png",
  ),
  createLocation(
    2,
    "Lotus Center",
    "Str. Nufărului 30, Oradea 410583",
    "/location-logos/lotus.png",
  ),
];

function createLocation(
  id: number,
  name: string,
  address: string,
  logo: string,
): Location {
  return {
    id,
    name,
    address,
    logo,
    pathName: name.toLowerCase().replace(/ /g, "_"),
  };
}
