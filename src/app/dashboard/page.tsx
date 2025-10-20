"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DashboardLayout from "./DashboardLayout";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import { useEffect, useState } from "react";

const ADMIN_EMAILS = ["njatabrian648@gmail.com"]; // whitelist admin emails

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loadingView, setLoadingView] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/auth/login");
      return;
    }

    const userEmail = session?.user?.email || "";
    if (ADMIN_EMAILS.includes(userEmail)) {
      setIsAdmin(true); // admin auto-redirect
    } else {
      setIsAdmin(false);
    }

    setLoadingView(false);
  }, [status, session, router]);

  if (status === "loading" || loadingView) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64 text-white text-lg">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {isAdmin ? <AdminDashboard /> : <ClientDashboard />}
    </DashboardLayout>
  );
}
