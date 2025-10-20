"use client";

import PaymentsCard from "../components/PaymentsCard";
import ConsultancyCard from "../components/ConsultancyCard";
import CompostingCard from "../components/CompostingCard";
import WasteManagementCard from "../components/WasteManagementCard";
import SmartWasteCard from "../components/SmartWasteCard";
import ChatCard from "../components/ChatCard";
import StatsGrid from "../components/StatsGrid";

export default function ClientDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
      <PaymentsCard />
      <WasteManagementCard />
      <SmartWasteCard />
      <ConsultancyCard />
      <CompostingCard />
      <ChatCard />
      <StatsGrid />
    </div>
  );
}
