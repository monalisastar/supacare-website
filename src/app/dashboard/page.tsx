"use client";

import DashboardLayout from "./DashboardLayout";
import ConsultancyCard from "./components/ConsultancyCard";
import CompostingCard from "./components/CompostingCard";
import WasteManagementCard from "./components/WasteManagementCard";
import SmartWasteCard from "./components/SmartWasteCard";
import PaymentsCard from "./components/PaymentsCard";
import ChatCard from "./components/ChatCard";
import StatsGrid from "./components/StatsGrid";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Payments - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <PaymentsCard />
      </div>

      {/* Waste Management - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <WasteManagementCard />
      </div>

      {/* Smart Waste - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <SmartWasteCard />
      </div>

      {/* Consultancy - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <ConsultancyCard />
      </div>

      {/* Composting - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <CompostingCard />
      </div>

      {/* Chat - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <ChatCard />
      </div>

      {/* Stats - Full Row */}
      <div className="col-span-1 md:col-span-2 lg:col-span-3 2xl:col-span-4">
        <StatsGrid />
      </div>
    </DashboardLayout>
  );
}
