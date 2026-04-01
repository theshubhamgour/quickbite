import React, { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useGetMe, useLogout, getGetMeQueryKey } from "@workspace/api-client-react";
import { UtensilsCrossed, LogOut, MapPin, Loader2, Home, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { data: user, isLoading } = useGetMe({ query: { queryKey: getGetMeQueryKey() } });
  const [location, setLocation] = useLocation();
  const logoutMutation = useLogout();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [isLoading, user, setLocation]);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        queryClient.clear();
        setLocation("/login");
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
            <div className="bg-primary p-2 rounded-xl text-white shadow-sm shadow-primary/30">
              <UtensilsCrossed className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">QuickBite</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className={`transition-colors hover:text-primary flex items-center gap-2 ${location === '/' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link href="/orders" className={`transition-colors hover:text-primary flex items-center gap-2 ${location === '/orders' ? 'text-primary' : 'text-slate-600 dark:text-slate-300'}`}>
              <Receipt className="h-4 w-4" /> Orders
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full dark:bg-slate-800">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate max-w-[120px]">{user.location}</span>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l">
              <div className="hidden sm:block text-right">
                <div className="text-sm font-semibold">{user.username}</div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="text-slate-500 hover:text-destructive hover:bg-destructive/10 rounded-full" disabled={logoutMutation.isPending}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Log out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white dark:bg-slate-900 px-6 py-3 flex justify-around pb-safe">
        <Link href="/" className={`flex flex-col items-center gap-1 ${location === '/' ? 'text-primary' : 'text-slate-500'}`}>
          <Home className="h-6 w-6" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>
        <Link href="/orders" className={`flex flex-col items-center gap-1 ${location === '/orders' ? 'text-primary' : 'text-slate-500'}`}>
          <Receipt className="h-6 w-6" />
          <span className="text-[10px] font-medium">Orders</span>
        </Link>
      </div>

      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
