import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, ArrowLeft, Download, Plus, MapPin, Package, Clock, CheckCircle2, AlertCircle, Save } from "lucide-react";
import { toast } from "sonner";

export default function ShipmentDetailPage() {
  const params = useParams();
  const shipmentId = parseInt(params.id as string);
  const [, setLocation] = useLocation();
  const [newEventLocation, setNewEventLocation] = useState("");
  const [newEventDescription, setNewEventDescription] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [updatingLocation, setUpdatingLocation] = useState("");

  const shipmentQuery = trpc.shipments.getById.useQuery({ id: shipmentId });
  const eventsQuery = trpc.trackingEvents.getByShipmentId.useQuery({ shipmentId });
  const updateMutation = trpc.shipments.update.useMutation();
  const createEventMutation = trpc.trackingEvents.create.useMutation();

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdatingStatus(true);
    try {
      await updateMutation.mutateAsync({
        id: shipmentId,
        status: newStatus as any,
      });
      toast.success("Shipment status updated");
      shipmentQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleLocationUpdate = async () => {
    if (!updatingLocation.trim()) {
      toast.error("Please enter a location");
      return;
    }
    setIsUpdatingStatus(true);
    try {
      await updateMutation.mutateAsync({
        id: shipmentId,
        currentLocation: updatingLocation,
      });
      toast.success("Location updated successfully");
      setUpdatingLocation("");
      shipmentQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update location");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventLocation.trim() || !newEventDescription.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAddingEvent(true);
    try {
      await createEventMutation.mutateAsync({
        shipmentId,
        location: newEventLocation,
        description: newEventDescription,
      });
      setNewEventLocation("");
      setNewEventDescription("");
      toast.success("Tracking milestone added");
      eventsQuery.refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to add tracking event");
    } finally {
      setIsAddingEvent(false);
    }
  };

  if (shipmentQuery.isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#FF8C00]" />
      </div>
    );
  }

  if (!shipmentQuery.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
        <div className="border-b border-[#FF8C00]/20 bg-[#0f1419]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Shipment Details</h1>
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
          <Card className="bg-[#1a1f2e] border-red-500/30 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-red-400" />
              <p className="text-red-400 font-semibold">Shipment not found</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const shipment = shipmentQuery.data;
  const events = eventsQuery.data || [];

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
      {/* Header */}
      <div className="border-b border-[#FF8C00]/20 bg-[#0f1419]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation("/admin/shipments")}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-white">Shipment Details</h1>
          </div>
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
        {/* Shipment Header */}
        <Card className="bg-gradient-to-r from-[#1a1f2e] to-[#2a2f3e] border-[#FF8C00]/30 mb-8 p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Tracking Code</p>
              <p className="text-[#FF8C00] font-mono text-3xl font-bold">{shipment.trackingCode}</p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${getStatusColor(shipment.status)}`}>
              <span className="font-semibold capitalize">{shipment.status.replace("_", " ")}</span>
            </div>
          </div>
        </Card>

        {/* Status & Location Update */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#FF8C00]" />
              Update Status
            </h3>
            <Select value={shipment.status} onValueChange={handleStatusChange} disabled={isUpdatingStatus}>
              <SelectTrigger className="bg-[#0f1419] border-[#FF8C00]/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f2e] border-[#FF8C00]/30">
                <SelectItem value="pending">⏳ Pending</SelectItem>
                <SelectItem value="in_transit">🚚 In Transit</SelectItem>
                <SelectItem value="out_for_delivery">📍 Out for Delivery</SelectItem>
                <SelectItem value="on_hold">⏸️ On Hold</SelectItem>
                <SelectItem value="delivered">✅ Delivered</SelectItem>
                <SelectItem value="cancelled">❌ Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF8C00]" />
              Update Location
            </h3>
            <div className="flex gap-2">
              <Input
                value={updatingLocation || shipment.currentLocation}
                onChange={(e) => setUpdatingLocation(e.target.value)}
                placeholder="Update current location..."
                className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
              />
              <Button
                onClick={handleLocationUpdate}
                disabled={isUpdatingStatus}
                className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold"
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF8C00]" />
              From (Sender)
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Name:</span> {shipment.senderDetails.name}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Email:</span> {shipment.senderDetails.email}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Phone:</span> {shipment.senderDetails.phone}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Address:</span> {shipment.senderDetails.address}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">City:</span> {shipment.senderDetails.city}, {shipment.senderDetails.country}</p>
            </div>
          </Card>

          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#FF8C00]" />
              To (Receiver)
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Name:</span> {shipment.receiverDetails.name}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Email:</span> {shipment.receiverDetails.email}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Phone:</span> {shipment.receiverDetails.phone}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">Address:</span> {shipment.receiverDetails.address}</p>
              <p><span className="text-gray-400 block text-xs mb-1 font-bold">City:</span> {shipment.receiverDetails.city}, {shipment.receiverDetails.country}</p>
            </div>
          </Card>
        </div>

        {/* Package Info */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 mb-8 p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#FF8C00]" />
            Package Details
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Description</p>
              <p className="text-white">{shipment.packageInfo.description}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Weight</p>
              <p className="text-white font-semibold">{shipment.packageInfo.weight} kg</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Dimensions</p>
              <p className="text-white font-semibold">{shipment.packageInfo.dimensions}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Value</p>
              <p className="text-white font-semibold">${shipment.packageInfo.value.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Shipping Method</p>
              <p className="text-white font-semibold">{shipment.packageInfo.shippingMethod}</p>
            </div>
          </div>
        </Card>

        {/* Route Information */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 mb-8 p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#FF8C00]" />
            Route Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm mb-2">Origin</p>
              <p className="text-white font-semibold">{shipment.origin}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Destination</p>
              <p className="text-white font-semibold">{shipment.destination}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Current Location</p>
              <p className="text-white font-semibold">{shipment.currentLocation}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Estimated Delivery</p>
              <p className="text-white font-semibold">
                {shipment.estimatedDeliveryDate
                  ? new Date(shipment.estimatedDeliveryDate).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </Card>

        {/* Add Tracking Event */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 mb-8 p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF8C00]" />
            Add Tracking Milestone
          </h3>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <Input
                type="text"
                placeholder="e.g., Chicago Distribution Center"
                value={newEventLocation}
                onChange={(e) => setNewEventLocation(e.target.value)}
                className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <Textarea
                placeholder="e.g., Package arrived at sorting facility"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500 min-h-20"
              />
            </div>
            <Button
              type="submit"
              disabled={isAddingEvent}
              className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50 w-full"
            >
              {isAddingEvent ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Milestone
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Tracking Timeline */}
        <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
          <h3 className="text-white font-bold mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#FF8C00]" />
            Tracking Timeline
          </h3>
          {events.length > 0 ? (
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full bg-[#FF8C00] mt-1 flex-shrink-0"></div>
                    {index < events.length - 1 && (
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
            <div className="text-center py-12">
              <p className="text-gray-400">No tracking milestones added yet.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
