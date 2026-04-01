import React from "react";
import { useGetFoods, useCreateOrder, getGetFoodsQueryKey, getGetOrdersQueryKey, getGetOrderSummaryQueryKey, type ErrorType } from "@workspace/api-client-react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Star, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const { data: foods, isLoading, error } = useGetFoods({ query: { queryKey: getGetFoodsQueryKey() } });
  const createOrder = useCreateOrder();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleOrder = (foodId: number, foodName: string, price: number) => {
    createOrder.mutate({
      data: { foodId, foodName, price }
    }, {
      onSuccess: () => {
        toast({
          title: "Order placed!",
          description: `Your ${foodName} is on the way.`,
        });
        queryClient.invalidateQueries({ queryKey: getGetOrdersQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetOrderSummaryQueryKey() });
      },
      onError: (err: ErrorType) => {
        const errData = err.data as Record<string, string> | null;
        toast({
          title: "Failed to place order",
          description: errData?.error || "Something went wrong.",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">What are you craving?</h1>
          <p className="text-slate-500 text-lg">Order your favorite meals from top-rated restaurants around you.</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-slate-500 font-medium">Finding delicious food...</p>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="max-w-xl mx-auto mt-10">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load food items. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foods?.map((food) => (
              <Card key={food.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full bg-white dark:bg-slate-900">
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {/* Real-world app would have actual images, we'll use a placeholder colored div if image fails, but assume it works */}
                  <img 
                    src={food.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60"} 
                    alt={food.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-slate-900 hover:bg-white border-0 shadow-sm backdrop-blur-sm font-semibold">
                      {food.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2 flex-grow-0 pt-5">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-xl leading-tight line-clamp-1">{food.name}</h3>
                    <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-sm font-bold shrink-0">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{food.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm line-clamp-2 mt-2">{food.description}</p>
                </CardHeader>
                <CardContent className="pb-4 mt-auto">
                  <div className="flex items-center text-sm text-slate-500 font-medium bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg inline-flex">
                    <Clock className="h-4 w-4 mr-1.5 text-primary" />
                    {food.deliveryTime} mins
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t mt-4 pb-4 px-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                    ${food.price.toFixed(2)}
                  </div>
                  <Button 
                    className="rounded-full font-semibold shadow-sm hover:shadow-md transition-shadow px-6"
                    onClick={() => handleOrder(food.id, food.name, food.price)}
                    disabled={createOrder.isPending}
                  >
                    {createOrder.isPending && createOrder.variables?.data.foodId === food.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Order Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
