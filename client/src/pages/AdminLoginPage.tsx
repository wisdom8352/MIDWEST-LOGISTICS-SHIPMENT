import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { AlertCircle, Loader2, Eye, EyeOff, Lock, Mail, ShieldCheck } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const adminLoginMutation = trpc.auth.adminLogin.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await adminLoginMutation.mutateAsync({
        email,
        password,
      });

      if (result.success) {
        setLocation("/admin/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#FF8C00]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-cyan-500/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Title */}
        <div className="text-center mb-10">
          <div className="bg-gradient-to-r from-[#FF8C00] to-[#FFB347] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#FF8C00]/20 rotate-3">
            <ShieldCheck className="w-10 h-10 text-navy-900" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Midwest Logistics
          </h1>
          <p className="text-gray-400 font-medium">Administrator Access Portal</p>
        </div>

        <Card className="bg-[#1a1f2e] border-[#FF8C00]/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-bold uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type="email"
                    placeholder="admin@midwestlogistics.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="bg-[#0f1419] border-[#FF8C00]/10 text-white placeholder-gray-600 h-14 pl-12 focus:border-[#FF8C00]/50 focus:ring-0 transition-all rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="bg-[#0f1419] border-[#FF8C00]/10 text-white placeholder-gray-600 h-14 pl-12 pr-12 focus:border-[#FF8C00]/50 focus:ring-0 transition-all rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#FF8C00] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full bg-gradient-to-r from-[#FF8C00] to-[#FFB347] text-navy-900 font-bold hover:shadow-xl hover:shadow-[#FF8C00]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all h-14 rounded-xl text-lg mt-4"
              >
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  "Secure Sign In"
                )}
              </Button>
            </form>

            {/* Demo Credentials Info */}
            <div className="mt-8 pt-8 border-t border-[#FF8C00]/10">
              <div className="bg-[#0f1419] p-4 rounded-xl border border-[#FF8C00]/5">
                <p className="text-[#FF8C00] text-[10px] font-bold uppercase tracking-widest mb-3 text-center">
                  Testing Credentials
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Email</span>
                    <span className="text-gray-300 font-mono">admin@midwestlogistics.com</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Pass</span>
                    <span className="text-gray-300 font-mono">AdminLogistics2026!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <p className="text-center text-gray-600 text-xs mt-8 font-medium">
          Protected by Enterprise-Grade Security
        </p>
      </div>
    </div>
  );
}
