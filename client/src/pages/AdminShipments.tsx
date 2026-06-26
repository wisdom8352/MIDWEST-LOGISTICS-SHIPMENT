import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Plus, LogOut, Search, Filter, LayoutDashboard } from "lucide-react";

export default function AdminShipments() {
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);

  const shipmentsQuery = trpc.shipments.list.useQuery({
    limit: 20,
    offset: page * 20,
    searchTerm: searchTerm || undefined,
    status: statusFilter || undefined,
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "out_for_delivery":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "in_transit":
        return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "on_hold":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
      {/* Header */}
      <div className="border-b border-[#FF8C00]/20 bg-[#0f1419]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Shipments Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => setLocation("/admin/dashboard")}
              variant="ghost"
              className="text-gray-400 hover:text-white"
            >
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Controls */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                placeholder="Search by tracking code (e.g. MWL-)..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500 pl-10"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10" />
                <Select value={statusFilter} onValueChange={(value) => {
                  setStatusFilter(value);
                  setPage(0);
                }}>
                  <SelectTrigger className="bg-[#0f1419] border-[#FF8C00]/20 text-white pl-10">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f2e] border-[#FF8C00]/30">
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="pending">⏳ Pending</SelectItem>
                    <SelectItem value="in_transit">🚚 In Transit</SelectItem>
                    <SelectItem value="out_for_delivery">📍 Out for Delivery</SelectItem>
                    <SelectItem value="on_hold">⏸️ On Hold</SelectItem>
                    <SelectItem value="delivered">✅ Delivered</SelectItem>
                    <SelectItem value="cancelled">❌ Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={() => setLocation("/admin/shipments/create")}
                className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Shipment
              </Button>
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 overflow-hidden">
          {shipmentsQuery.isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="w-12 h-12 animate-spin text-[#FF8C00]" />
            </div>
          ) : shipmentsQuery.data && shipmentsQuery.data.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-[#0f1419]">
                  <TableRow className="border-[#FF8C00]/20 hover:bg-transparent">
                    <TableHead className="text-gray-400 font-bold uppercase text-xs tracking-wider">Tracking Code</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase text-xs tracking-wider">Sender</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase text-xs tracking-wider">Receiver</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase text-xs tracking-wider">Status</TableHead>
                    <TableHead className="text-gray-400 font-bold uppercase text-xs tracking-wider">Created At</TableHead>
                    <TableHead className="text-right text-gray-400 font-bold uppercase text-xs tracking-wider">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shipmentsQuery.data.map((shipment: any) => (
                    <TableRow key={shipment.id} className="border-[#FF8C00]/10 hover:bg-[#0f1419]/50 transition-colors">
                      <TableCell className="text-[#FF8C00] font-mono font-bold">{shipment.trackingCode}</TableCell>
                      <TableCell className="text-white">
                        <div className="font-medium">{shipment.senderDetails.name}</div>
                        <div className="text-xs text-gray-500">{shipment.senderDetails.city}</div>
                      </TableCell>
                      <TableCell className="text-white">
                        <div className="font-medium">{shipment.receiverDetails.name}</div>
                        <div className="text-xs text-gray-500">{shipment.receiverDetails.city}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(shipment.status)}`}>
                          {shipment.status.replace("_", " ")}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-400 text-sm">
                        {new Date(shipment.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setLocation(`/admin/shipments/${shipment.id}`)}
                            variant="ghost"
                            size="sm"
                            className="text-[#FF8C00] hover:bg-[#FF8C00]/10"
                          >
                            Manage
                          </Button>
                          <Button
                            onClick={() => setLocation(`/track/${shipment.trackingCode}`)}
                            variant="ghost"
                            size="sm"
                            className="text-cyan-400 hover:bg-cyan-500/10"
                          >
                            View Live
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-24">
              <div className="bg-[#0f1419] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-white font-bold text-lg">No shipments found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("");
                }}
                variant="link"
                className="text-[#FF8C00] mt-4"
              >
                Clear all filters
              </Button>
            </div>
          )}
        </Card>

        {/* Pagination */}
        {shipmentsQuery.data && shipmentsQuery.data.length > 0 && (
          <div className="flex justify-center items-center gap-6 mt-8">
            <Button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              variant="outline"
              className="border-[#FF8C00]/30 text-[#FF8C00] hover:bg-[#FF8C00]/10 disabled:opacity-30"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm uppercase font-bold tracking-widest">Page</span>
              <span className="bg-[#FF8C00] text-navy-900 w-8 h-8 rounded flex items-center justify-center font-bold">{page + 1}</span>
            </div>
            <Button
              onClick={() => setPage(page + 1)}
              disabled={shipmentsQuery.data.length < 20}
              variant="outline"
              className="border-[#FF8C00]/30 text-[#FF8C00] hover:bg-[#FF8C00]/10 disabled:opacity-30"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
