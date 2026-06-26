import { useState } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, Package, MapPin, CheckCircle2, AlertCircle, Clock, Truck, Globe, Weight, Maximize2, DollarSign, Plane } from "lucide-react";

export default function TrackingPage() {
  const params = useParams();
  const trackingCode = params.code || "";
  const [searchCode, setSearchCode] = useState(trackingCode);
  const [displayCode, setDisplayCode] = useState(trackingCode);

  const shipmentQuery = trpc.shipments.getByTrackingCode.useQuery(
    { trackingCode: displayCode },
    { enabled: !!displayCode }
  );

  const eventsQuery = trpc.trackingEvents.getByShipmentCode.useQuery(
    { trackingCode: displayCode },
    { enabled: !!displayCode }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDisplayCode(searchCode.toUpperCase());
  };

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle2 className="w-6 h-6" />;
      case "out_for_delivery":
        return <Truck className="w-6 h-6" />;
      case "in_transit":
        return <Package className="w-6 h-6" />;
      case "pending":
        return <Clock className="w-6 h-6" />;
      case "on_hold":
        return <AlertCircle className="w-6 h-6" />;
      case "cancelled":
        return <AlertCircle className="w-6 h-6" />;
      default:
        return <Package className="w-6 h-6" />;
    }
  };

  const getShippingMethodIcon = (method: string) => {
    switch (method) {
      case "Air Freight":
        return <Plane className="w-5 h-5" />;
      case "Ocean Freight":
        return <Globe className="w-5 h-5" />;
      case "Ground":
        return <Truck className="w-5 h-5" />;
      case "Express":
        return <Clock className="w-5 h-5" />;
      default:
        return <Package className="w-5 h-5" />;
    }
  };

  const calculateProgress = (status: string) => {
    const statusMap: Record<string, number> = {
      pending: 0,
      in_transit: 33,
      out_for_delivery: 66,
      delivered: 100,
      on_hold: 50,
      cancelled: 0,
    };
    return statusMap[status] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
      {/* Header */}
      <div className="border-b border-[#FF8C00]/20 bg-[#0f1419]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Track Your Shipment</h1>
          <p className="text-gray-400 text-sm mt-1">Enter your tracking code to view real-time updates and delivery status</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        {/* Search Form */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 mb-8">
          <div className="p-6">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <Input
                placeholder="Enter tracking code (e.g., MWL-ABC123XYZ)"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500 flex-1"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50"
              >
                Search
              </Button>
            </form>
          </div>
        </Card>

        {/* Loading State */}
        {(shipmentQuery.isLoading || eventsQuery.isLoading) && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[#FF8C00]" />
          </div>
        )}

        {/* Error State */}
        {shipmentQuery.isError || (shipmentQuery.data === null && displayCode) && (
          <Card className="bg-[#1a1f2e] border-red-500/30 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-white font-semibold">Shipment Not Found</h3>
                <p className="text-gray-400 text-sm">No shipment found with tracking code: <span className="font-mono text-[#FF8C00]">{displayCode}</span></p>
              </div>
            </div>
          </Card>
        )}

        {/* Shipment Details */}
        {shipmentQuery.data && (
          <>
            {/* Status Card */}
            <Card className="bg-gradient-to-r from-[#1a1f2e] to-[#2a2f3e] border-[#FF8C00]/30 mb-8 p-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Tracking Code</p>
                  <p className="text-[#FF8C00] font-mono text-2xl font-bold">{shipmentQuery.data.trackingCode}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(shipmentQuery.data.status)}`}>
                    {getStatusIcon(shipmentQuery.data.status)}
                    <span className="font-semibold capitalize">{shipmentQuery.data.status.replace("_", " ")}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Pending</span>
                  <span>In Transit</span>
                  <span>Out for Delivery</span>
                  <span>Delivered</span>
                </div>
                <div className="w-full bg-[#0f1419] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] h-full transition-all duration-500"
                    style={{ width: `${calculateProgress(shipmentQuery.data.status)}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            {/* Route Information */}
            <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 mb-8 p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#FF8C00]" />
                Shipment Route
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Origin</p>
                  <p className="text-white font-semibold">{shipmentQuery.data.origin}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Destination</p>
                  <p className="text-white font-semibold">{shipmentQuery.data.destination}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Current Location</p>
                  <p className="text-white font-semibold">{shipmentQuery.data.currentLocation}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2">Estimated Delivery</p>
                  <p className="text-white font-semibold">
                    {shipmentQuery.data.estimatedDeliveryDate
                      ? new Date(shipmentQuery.data.estimatedDeliveryDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </Card>

            {/* Sender & Receiver Info */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FF8C00]" />
                  From (Sender)
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p><span className="text-gray-400 block text-xs mb-1">Name:</span> {shipmentQuery.data.senderDetails.name}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">Email:</span> {shipmentQuery.data.senderDetails.email}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">Phone:</span> {shipmentQuery.data.senderDetails.phone}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">Address:</span> {shipmentQuery.data.senderDetails.address}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">City:</span> {shipmentQuery.data.senderDetails.city}, {shipmentQuery.data.senderDetails.country}</p>
                </div>
              </Card>

              <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FF8C00]" />
                  To (Receiver)
                </h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p><span className="text-gray-400 block text-xs mb-1">Name:</span> {shipmentQuery.data.receiverDetails.name}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">Email:</span> {shipmentQuery.data.receiverDetails.email}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">Phone:</span> {shipmentQuery.data.receiverDetails.phone}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">Address:</span> {shipmentQuery.data.receiverDetails.address}</p>
                  <p><span className="text-gray-400 block text-xs mb-1">City:</span> {shipmentQuery.data.receiverDetails.city}, {shipmentQuery.data.receiverDetails.country}</p>
                </div>
              </Card>
            </div>

            {/* Package Info */}
            <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 mb-8 p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Package className="w-5 h-5 text-[#FF8C00]" />
                Package Details
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Shipping Method
                  </p>
                  <p className="text-white font-semibold flex items-center gap-2">
                    {getShippingMethodIcon(shipmentQuery.data.packageInfo.shippingMethod)}
                    {shipmentQuery.data.packageInfo.shippingMethod}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    Weight
                  </p>
                  <p className="text-white font-semibold">{shipmentQuery.data.packageInfo.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <Maximize2 className="w-4 h-4" />
                    Dimensions
                  </p>
                  <p className="text-white font-semibold">{shipmentQuery.data.packageInfo.dimensions}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Value
                  </p>
                  <p className="text-white font-semibold">${shipmentQuery.data.packageInfo.value.toFixed(2)}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#FF8C00]/20">
                <p className="text-gray-400 text-sm mb-2">Description</p>
                <p className="text-gray-300">{shipmentQuery.data.packageInfo.description}</p>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF8C00]" />
                Tracking Timeline
              </h3>
              {eventsQuery.data && eventsQuery.data.length > 0 ? (
                <div className="space-y-6">
                  {eventsQuery.data.map((event, index) => (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-[#FF8C00] mt-1 flex-shrink-0"></div>
                        {index < eventsQuery.data.length - 1 && (
                          <div className="w-0.5 h-16 bg-[#FF8C00]/30 my-2"></div>
                        )}
                      </div>
                      <div className="pb-6 flex-1">
                        <div className="bg-[#0f1419] border border-[#FF8C00]/20 rounded-lg p-4">
                          <p className="text-white font-semibold">{event.location}</p>
                          <p className="text-gray-300 text-sm mt-2">{event.description}</p>
                          <p className="text-gray-500 text-xs mt-3 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(event.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No tracking updates yet. Your shipment will be updated soon.</p>
                </div>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
