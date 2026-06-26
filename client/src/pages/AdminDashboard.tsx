import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Package, TrendingUp, AlertCircle, LogOut, Plus, List, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const shipmentCountQuery = trpc.shipments.count.useQuery();
  const shipmentCountByStatusQuery = trpc.shipments.countByStatus.useQuery();

  const stats = [
    {
      title: "Total Shipments",
      value: shipmentCountQuery.data || 0,
      icon: <Package className="w-8 h-8 text-[#FF8C00]" />,
      color: "border-[#FF8C00]/30",
    },
    {
      title: "In Transit",
      value: shipmentCountByStatusQuery.data?.in_transit || 0,
      icon: <Truck className="w-8 h-8 text-cyan-400" />,
      color: "border-cyan-500/30",
    },
    {
      title: "Out for Delivery",
      value: shipmentCountByStatusQuery.data?.out_for_delivery || 0,
      icon: <MapPin className="w-8 h-8 text-blue-400" />,
      color: "border-blue-500/30",
    },
    {
      title: "Pending",
      value: shipmentCountByStatusQuery.data?.pending || 0,
      icon: <Clock className="w-8 h-8 text-yellow-400" />,
      color: "border-yellow-500/30",
    },
    {
      title: "Delivered",
      value: shipmentCountByStatusQuery.data?.delivered || 0,
      icon: <CheckCircle2 className="w-8 h-8 text-green-400" />,
      color: "border-green-500/30",
    },
    {
      title: "On Hold",
      value: shipmentCountByStatusQuery.data?.on_hold || 0,
      icon: <AlertCircle className="w-8 h-8 text-orange-400" />,
      color: "border-orange-500/30",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
      {/* Header */}
      <div className="border-b border-[#FF8C00]/20 bg-[#0f1419]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <Button
            onClick={() => setLocation("/admin/login")}
            variant="outline"
            className="border-[#FF8C00]/30 text-[#FF8C00] hover:bg-[#FF8C00]/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back, Admin</h2>
          <p className="text-gray-400">Here's what's happening with Midwest Logistics today.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className={`bg-[#1a1f2e] border ${stat.color} p-6 hover:shadow-lg hover:shadow-[#FF8C00]/5 transition-all`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
                  <p className="text-4xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="bg-[#0f1419] p-4 rounded-xl">
                  {stat.icon}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-8 flex flex-col items-center text-center">
            <div className="bg-[#FF8C00]/10 p-4 rounded-full mb-6">
              <Plus className="w-10 h-10 text-[#FF8C00]" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Create Shipment</h3>
            <p className="text-gray-400 mb-8 max-w-sm">Add a new package to the tracking system with full logistics details and custom MWL code.</p>
            <Button
              onClick={() => setLocation("/admin/shipments/create")}
              className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50 w-full"
            >
              New Shipment
            </Button>
          </Card>

          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-8 flex flex-col items-center text-center">
            <div className="bg-cyan-500/10 p-4 rounded-full mb-6">
              <List className="w-10 h-10 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Manage Shipments</h3>
            <p className="text-gray-400 mb-8 max-w-sm">View, filter, and search through all active and archived shipments in the system.</p>
            <Button
              onClick={() => setLocation("/admin/shipments")}
              variant="outline"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 w-full"
            >
              View All Shipments
            </Button>
          </Card>
        </div>

        {/* Recent Activity Placeholder */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF8C00]" />
              System Status
            </h2>
            <span className="flex items-center gap-2 text-green-400 text-sm font-medium">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
          <div className="text-center py-12 bg-[#0f1419] rounded-xl border border-[#FF8C00]/10">
            <p className="text-gray-500">Logistics operations are running smoothly. No alerts at this time.</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
