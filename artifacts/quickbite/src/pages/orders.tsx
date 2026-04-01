import React from "react";
import { useGetOrders, useGetOrderSummary, getGetOrdersQueryKey, getGetOrderSummaryQueryKey } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ReceiptText, TrendingUp, ShoppingBag, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function Orders() {
  const { data: orders, isLoading: ordersLoading } = useGetOrders({ query: { queryKey: getGetOrdersQueryKey() } });
  const { data: summary, isLoading: summaryLoading } = useGetOrderSummary({ query: { queryKey: getGetOrderSummaryQueryKey() } });

  const isLoading = ordersLoading || summaryLoading;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Order History</h1>
          <p className="text-slate-500 text-lg">Keep track of your delicious journeys.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Cards */}
            {summary && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-md bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-2xl text-white">
                      <ShoppingBag className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Total Orders</p>
                      <h3 className="text-3xl font-extrabold">{summary.totalOrders}</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-gradient-to-br from-green-500/10 to-green-500/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-green-500 p-3 rounded-2xl text-white">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Total Spent</p>
                      <h3 className="text-3xl font-extrabold">${summary.totalSpent.toFixed(2)}</h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-md bg-gradient-to-br from-orange-500/10 to-orange-500/5">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="bg-orange-500 p-3 rounded-2xl text-white">
                      <ReceiptText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500">Most Ordered</p>
                      <h3 className="text-xl font-extrabold truncate max-w-[150px]">{summary.mostOrderedFood || "N/A"}</h3>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Orders List */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" /> Past Orders
              </h2>
              
              {!orders || orders.length === 0 ? (
                <Card className="border-dashed bg-slate-50 dark:bg-slate-900/50">
                  <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                    <ShoppingBag className="h-16 w-16 text-slate-300 mb-4" />
                    <h3 className="text-xl font-bold text-slate-700">No orders yet</h3>
                    <p className="text-slate-500 mt-2">Looks like you haven't ordered anything. Time to grab a bite!</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row items-center sm:items-stretch">
                          <div className="p-6 bg-slate-50 dark:bg-slate-900 w-full sm:w-auto flex flex-col justify-center border-b sm:border-b-0 sm:border-r min-w-[200px]">
                            <div className="text-sm text-slate-500 font-medium mb-1">Order #{order.id.toString().padStart(4, '0')}</div>
                            <div className="font-semibold">{format(new Date(order.createdAt), "MMM d, yyyy")}</div>
                            <div className="text-xs text-slate-400 mt-1">{format(new Date(order.createdAt), "h:mm a")}</div>
                          </div>
                          
                          <div className="p-6 flex-1 flex flex-col sm:flex-row justify-between w-full gap-4">
                            <div className="flex flex-col justify-between">
                              <h3 className="text-xl font-bold">{order.foodName}</h3>
                              <div className="flex items-center text-sm text-slate-500 mt-2 bg-slate-100 dark:bg-slate-800 w-max px-2.5 py-1 rounded-md">
                                <MapPin className="h-3.5 w-3.5 mr-1" />
                                {order.location}
                              </div>
                            </div>
                            
                            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-4 border-t sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                              <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                                ${order.price.toFixed(2)}
                              </div>
                              <Badge variant="outline" className={`border-0 font-medium py-1 px-3 ${
                                order.status === 'completed' || order.status === 'delivered' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-primary/10 text-primary'
                              }`}>
                                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
