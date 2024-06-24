import {
  COMPANY_LOCATIONS,
  COMPANY_LOGO,
  COMPANY_NAME,
} from "constants/Company";
import Image from "next/image";

const ChangeLocationPage = () => {
  return (
    <main className="flex min-h-screen min-w-full bg-[url('/bg/image.jpg')] bg-cover">
      <div className="flex min-h-screen min-w-full items-center justify-center space-x-6  bg-cover text-white backdrop-blur-md">
        <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2">
          {COMPANY_LOCATIONS.map((location) => (
            <div
              key={location.id}
              className="grid justify-evenly rounded-lg bg-gray-900 p-10 drop-shadow-2xl transition hover:-translate-y-1 hover:bg-gray-800"
            >
              <a href={`${location.pathName}`}>
                <div className="flex items-center justify-center">
                  <Image
                    src={COMPANY_LOGO}
                    alt={COMPANY_NAME}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="flex h-40 items-center justify-center">
                  <img src={location.logo} alt={location.name} width={240} />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ChangeLocationPage;
