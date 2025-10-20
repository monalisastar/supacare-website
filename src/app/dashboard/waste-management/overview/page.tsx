"use client";

import { useSession } from "next-auth/react";
import UpcomingCollectionsCard from "../components/UpcomingCollectionsCard";
import MyBinsCard from "../components/MyBinsCard";
import OrdersCard from "../components/OrdersCard";
import PaymentsCard from "../components/PaymentsCard";
import ImpactCard from "../components/ImpactCard";
import SmartWasteCard from "../components/SmartWasteCard";
import RoutesOverviewCard from "../components/RoutesOverviewCard";
import StatsCard from "../components/StatsCard";
import QuickActionsCard from "../components/QuickActionsCard";

export default function WasteManagementOverviewPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>; // or a spinner
  }

  const isAdmin = session.user.role === "ADMIN";
  const role: "client" | "admin" = isAdmin ? "admin" : "client";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Common cards for both roles */}
      <UpcomingCollectionsCard role={role} />
      <MyBinsCard role={role} />
      <OrdersCard role={role} />
      <PaymentsCard role={role} />

      {/* Client-specific cards */}
      {role === "client" && (
        <>
          <ImpactCard role={role} />
          <SmartWasteCard role={role} />
        </>
      )}

      {/* Admin-specific cards */}
      {role === "admin" && (
        <>
          <StatsCard role={role} />
          <RoutesOverviewCard role={role} />
          <QuickActionsCard role={role} />
        </>
      )}
    </div>
  );
}
