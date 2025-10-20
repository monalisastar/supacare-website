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
    <>
      {/* Payments */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <PaymentsCard />
      </div>

      {/* Waste Management */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <WasteManagementCard />
      </div>

      {/* Smart Waste */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <SmartWasteCard />
      </div>

      {/* Consultancy */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <ConsultancyCard />
      </div>

      {/* Composting */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <CompostingCard />
      </div>

      {/* Chat */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <ChatCard />
      </div>

      {/* Stats */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <StatsGrid />
      </div>
    </>
  );
}
