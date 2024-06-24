import Link from "next/link";

import { getServerAuthSession } from "@base/server/auth";

export default async function ProfilePage() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <header className="bg-blue-600 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 00-.894.553l-5 9A1 1 0 005 14h10a1 1 0 00.894-1.447l-5-9A1 1 0 0010 3zm0 2.618L13.132 11H6.868L10 5.618z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="ml-2 font-semibold text-white">
              On brand background
            </span>
            <button className="ml-4 rounded-md bg-white px-3 py-1 text-blue-600 shadow">
              Preview
            </button>
          </div>
          <nav className="flex space-x-4">
            <a href="#" className="text-white hover:underline">
              Product
            </a>
            <a href="#" className="text-white hover:underline">
              Features
            </a>
            <a href="#" className="text-white hover:underline">
              Marketplace
            </a>
            <a href="#" className="text-white hover:underline">
              Company
            </a>
          </nav>
          <a href="#" className="text-blue-300 hover:underline">
            Get the code &rarr;
          </a>
          <a
            href="#"
            className="ml-4 rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            Log in &rarr;
          </a>
        </div>
      </header>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
