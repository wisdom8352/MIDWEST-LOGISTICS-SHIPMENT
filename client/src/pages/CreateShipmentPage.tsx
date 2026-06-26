import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, LogOut, ArrowLeft, CheckCircle2, Plus, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function CreateShipmentPage() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [successCode, setSuccessCode] = useState<string | null>(null);
  const [milestones, setMilestones] = useState<Array<{ location: string; description: string }>>([]);
  const [newMilestone, setNewMilestone] = useState({ location: "", description: "" });

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    senderPhone: "",
    senderAddress: "",
    senderCity: "",
    senderCountry: "",
    receiverName: "",
    receiverEmail: "",
    receiverPhone: "",
    receiverAddress: "",
    receiverCity: "",
    receiverCountry: "",
    packageDescription: "",
    packageWeight: "",
    packageDimensions: "",
    packageValue: "",
    shippingMethod: "Air Freight",
    origin: "",
    destination: "",
    currentLocation: "",
    estimatedDeliveryDays: "5",
    status: "pending",
  });

  const createMutation = trpc.shipments.create.useMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddMilestone = () => {
    if (!newMilestone.location.trim() || !newMilestone.description.trim()) {
      toast.error("Please fill in both location and description");
      return;
    }
    setMilestones([...milestones, newMilestone]);
    setNewMilestone({ location: "", description: "" });
    toast.success("Milestone added");
  };

  const handleRemoveMilestone = (index: number) => {
    setMilestones(milestones.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      const requiredFields = [
        "senderName", "senderEmail", "senderPhone", "senderAddress", "senderCity", "senderCountry",
        "receiverName", "receiverEmail", "receiverPhone", "receiverAddress", "receiverCity", "receiverCountry",
        "packageDescription", "packageWeight", "packageDimensions", "packageValue",
        "origin", "destination", "currentLocation", "estimatedDeliveryDays"
      ];

      for (const field of requiredFields) {
        if (!formData[field as keyof typeof formData]) {
          toast.error(`Please fill in all required fields`);
          setIsLoading(false);
          return;
        }
      }

      const result = await createMutation.mutateAsync({
        senderName: formData.senderName,
        senderEmail: formData.senderEmail,
        senderPhone: formData.senderPhone,
        senderAddress: formData.senderAddress,
        senderCity: formData.senderCity,
        senderCountry: formData.senderCountry,
        receiverName: formData.receiverName,
        receiverEmail: formData.receiverEmail,
        receiverPhone: formData.receiverPhone,
        receiverAddress: formData.receiverAddress,
        receiverCity: formData.receiverCity,
        receiverCountry: formData.receiverCountry,
        packageDescription: formData.packageDescription,
        packageWeight: parseFloat(formData.packageWeight),
        packageDimensions: formData.packageDimensions,
        packageValue: parseFloat(formData.packageValue),
        shippingMethod: formData.shippingMethod as "Air Freight" | "Ocean Freight" | "Ground" | "Express",
        origin: formData.origin,
        destination: formData.destination,
        currentLocation: formData.currentLocation,
        estimatedDeliveryDays: parseInt(formData.estimatedDeliveryDays),
        status: formData.status as "pending" | "in_transit" | "out_for_delivery" | "on_hold" | "delivered" | "cancelled",
        milestones: milestones,
      });

      setSuccessCode(result.trackingCode);
      toast.success(`Shipment created successfully! Tracking code: ${result.trackingCode}`);
    } catch (error: any) {
      console.error("Error creating shipment:", error);
      toast.error(error.message || "Failed to create shipment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      senderName: "",
      senderEmail: "",
      senderPhone: "",
      senderAddress: "",
      senderCity: "",
      senderCountry: "",
      receiverName: "",
      receiverEmail: "",
      receiverPhone: "",
      receiverAddress: "",
      receiverCity: "",
      receiverCountry: "",
      packageDescription: "",
      packageWeight: "",
      packageDimensions: "",
      packageValue: "",
      shippingMethod: "Air Freight",
      origin: "",
      destination: "",
      currentLocation: "",
      estimatedDeliveryDays: "5",
      status: "pending",
    });
    setMilestones([]);
    setNewMilestone({ location: "", description: "" });
    setSuccessCode(null);
  };

  if (successCode) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419]">
        {/* Header */}
        <div className="border-b border-[#FF8C00]/20 bg-[#0f1419]/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Create Shipment</h1>
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

        <div className="max-w-2xl mx-auto px-4 md:px-8 py-12">
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-16 h-16 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Shipment Created Successfully!</h2>
              <p className="text-gray-400 mb-6">Your shipment has been added to the system and is ready for tracking.</p>
              
              <div className="bg-[#0f1419] border border-[#FF8C00]/30 rounded-lg p-6 mb-8">
                <p className="text-gray-400 text-sm mb-2">Tracking Code</p>
                <p className="text-[#FF8C00] font-mono text-3xl font-bold mb-4">{successCode}</p>
                <p className="text-gray-500 text-xs">Share this code with customers for tracking updates</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setLocation(`/admin/shipments`)}
                  className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50"
                >
                  View All Shipments
                </Button>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-[#FF8C00]/30 text-[#FF8C00] hover:bg-[#FF8C00]/10"
                >
                  Create Another
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-white">Create New Shipment</h1>
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

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Sender Information */}
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h2 className="text-xl font-bold text-white mb-6">📦 Sender Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <Input
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <Input
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                <Input
                  type="tel"
                  name="senderPhone"
                  value={formData.senderPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address *</label>
                <Input
                  type="text"
                  name="senderAddress"
                  value={formData.senderAddress}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                <Input
                  type="text"
                  name="senderCity"
                  value={formData.senderCity}
                  onChange={handleInputChange}
                  placeholder="Chicago"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Country *</label>
                <Input
                  type="text"
                  name="senderCountry"
                  value={formData.senderCountry}
                  onChange={handleInputChange}
                  placeholder="United States"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Receiver Information */}
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h2 className="text-xl font-bold text-white mb-6">🎯 Receiver Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                <Input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName}
                  onChange={handleInputChange}
                  placeholder="Jane Smith"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <Input
                  type="email"
                  name="receiverEmail"
                  value={formData.receiverEmail}
                  onChange={handleInputChange}
                  placeholder="jane@example.com"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone *</label>
                <Input
                  type="tel"
                  name="receiverPhone"
                  value={formData.receiverPhone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 987-6543"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Address *</label>
                <Input
                  type="text"
                  name="receiverAddress"
                  value={formData.receiverAddress}
                  onChange={handleInputChange}
                  placeholder="456 Oak Avenue"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                <Input
                  type="text"
                  name="receiverCity"
                  value={formData.receiverCity}
                  onChange={handleInputChange}
                  placeholder="New York"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Country *</label>
                <Input
                  type="text"
                  name="receiverCountry"
                  value={formData.receiverCountry}
                  onChange={handleInputChange}
                  placeholder="United States"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Package Information */}
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h2 className="text-xl font-bold text-white mb-6">📋 Package Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description *</label>
                <Textarea
                  name="packageDescription"
                  value={formData.packageDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the contents of the package..."
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500 min-h-24"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weight (kg) *</label>
                <Input
                  type="number"
                  name="packageWeight"
                  value={formData.packageWeight}
                  onChange={handleInputChange}
                  placeholder="5.5"
                  step="0.01"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Dimensions *</label>
                <Input
                  type="text"
                  name="packageDimensions"
                  value={formData.packageDimensions}
                  onChange={handleInputChange}
                  placeholder="30x20x15 cm"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Value (USD) *</label>
                <Input
                  type="number"
                  name="packageValue"
                  value={formData.packageValue}
                  onChange={handleInputChange}
                  placeholder="100.00"
                  step="0.01"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Shipping Method *</label>
                <Select value={formData.shippingMethod} onValueChange={(value) => handleSelectChange("shippingMethod", value)}>
                  <SelectTrigger className="bg-[#0f1419] border-[#FF8C00]/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1f2e] border-[#FF8C00]/30">
                    <SelectItem value="Air Freight">✈️ Air Freight</SelectItem>
                    <SelectItem value="Ocean Freight">🚢 Ocean Freight</SelectItem>
                    <SelectItem value="Ground">🚚 Ground</SelectItem>
                    <SelectItem value="Express">⚡ Express</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Shipment Route */}
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h2 className="text-xl font-bold text-white mb-6">🗺️ Shipment Route</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Origin (City/Country) *</label>
                <Input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="Chicago, USA"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Destination (City/Country) *</label>
                <Input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="New York, USA"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Location *</label>
                <Input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleInputChange}
                  placeholder="Chicago Distribution Center"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Delivery (Days) *</label>
                <Input
                  type="number"
                  name="estimatedDeliveryDays"
                  value={formData.estimatedDeliveryDays}
                  onChange={handleInputChange}
                  placeholder="5"
                  min="1"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                  required
                />
              </div>
            </div>
          </Card>

          {/* Status */}
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h2 className="text-xl font-bold text-white mb-6">📊 Current Status</h2>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
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

          {/* Tracking Milestones */}
          <Card className="bg-[#1a1f2e] border-[#FF8C00]/30 p-6">
            <h2 className="text-xl font-bold text-white mb-6">📍 Tracking Milestones (Optional)</h2>
            <p className="text-gray-400 text-sm mb-6">Add key milestones for the tracking timeline (e.g., 'Arrived at sorting facility', 'Cleared Customs')</p>
            
            {/* Add Milestone Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <Input
                  type="text"
                  value={newMilestone.location}
                  onChange={(e) => setNewMilestone({ ...newMilestone, location: e.target.value })}
                  placeholder="e.g., Chicago Distribution Center"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <Textarea
                  value={newMilestone.description}
                  onChange={(e) => setNewMilestone({ ...newMilestone, description: e.target.value })}
                  placeholder="e.g., Package arrived at sorting facility"
                  className="bg-[#0f1419] border-[#FF8C00]/20 text-white placeholder-gray-500 min-h-20"
                />
              </div>
              <Button
                type="button"
                onClick={handleAddMilestone}
                className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50 w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>
            </div>

            {/* Milestones List */}
            {milestones.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-300">Added Milestones:</p>
                {milestones.map((milestone, index) => (
                  <div key={index} className="bg-[#0f1419] border border-[#FF8C00]/20 rounded-lg p-4 flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-white font-semibold">{milestone.location}</p>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </div>
                    <Button
                      type="button"
                      onClick={() => handleRemoveMilestone(index)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              onClick={() => setLocation("/admin/shipments")}
              variant="outline"
              className="border-[#FF8C00]/30 text-[#FF8C00] hover:bg-[#FF8C00]/10"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-lg hover:shadow-[#FF8C00]/50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Shipment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
