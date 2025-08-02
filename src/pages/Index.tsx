import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { MainPage } from "@/components/MainPage";
import { TeamManagement } from "@/components/TeamManagement";
import { DashboardCustomization } from "@/components/DashboardCustomization";
import PricingPage from "@/components/PricingPage";

const Index = () => {
  const [activeTab, setActiveTab] = useState("create");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "create":
        return <MainPage />;
      case "schedule":
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Schedule view coming soon...</p>
          </div>
        );
      case "analytics":
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Advanced analytics coming soon...</p>
          </div>
        );
      case "team":
        return <TeamManagement />;
      case "settings":
        return <DashboardCustomization />;
      case "pricing":
        return <PricingPage />;
      default:
        return <MainPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="lg:ml-64 transition-all duration-300">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
