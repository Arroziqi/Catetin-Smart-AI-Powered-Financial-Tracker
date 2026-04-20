import { Outlet, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { Wallet, LayoutDashboard, Scan, Plus, Lightbulb, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";
import { TransactionModal } from "./TransactionModal";

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showTransactionModal, setShowTransactionModal] = useState(false);

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/scan", label: "Scan", icon: Scan },
    { path: "/insights", label: "Insights", icon: Lightbulb },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Desktop Header */}
      <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-semibold text-xl">Catetin</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? "default" : "ghost"}
                onClick={() => navigate(item.path)}
                className="gap-2"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => setShowTransactionModal(true)}
              className="hidden md:flex gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
            >
              <Plus className="w-4 h-4" />
              Add Transaction
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/login")}
              className="rounded-full"
            >
              <LogOut className="w-4 h-4" />
            </Button>
            <Avatar className="w-9 h-9 border-2 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t bg-white/95 backdrop-blur-lg">
        <div className="grid grid-cols-4 h-16">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors",
                isActive(item.path) ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => {
              setShowTransactionModal(true);
            }}
            className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center -mt-6 shadow-lg">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-medium">Add</span>
          </button>
        </div>
      </nav>

      {/* Transaction Modal */}
      <TransactionModal 
        open={showTransactionModal} 
        onOpenChange={setShowTransactionModal}
      />
    </div>
  );
}