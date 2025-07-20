"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  const user = session.user;

  return (
    <div className="max-w-3xl mx-auto mt-16 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username || user.email}!</h1>
      <p className="text-gray-600 mb-6">Role: <span className="font-medium">{user.role}</span></p>

      {/* Role-based action */}
      {user.role === "creator" ? (
        <a
          href="/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Start a Campaign
        </a>
      ) : (
        <a
          href="/projects-list"
          className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Explore Campaigns
        </a>
      )}

      <hr className="my-6" />

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-sm text-red-600 hover:underline"
      >
        Sign Out
      </button>
    </div>
  );
}
