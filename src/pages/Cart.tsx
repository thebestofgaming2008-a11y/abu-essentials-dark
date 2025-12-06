import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImage from "@/components/ui/product-image";
import { formatPrice } from "@/lib/currency";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getTotal } = useCart();
  const { toast } = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);

  const handleRemove = (productId: string, name: string) => {
    removeFromCart(productId);
    toast({
      title: "Item removed",
      description: `${name} has been removed from your cart.`,
    });
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setAppliedPromo(true);
      toast({
        title: "Promo code applied!",
        description: "You saved 10% on your order.",
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check your code and try again.",
        variant: "destructive",
      });
    }
  };

  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container px-4 py-8">
        <Link to="/shop">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to get started</p>
            <Link to="/shop">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={`${item.product.id}-${item.size}-${item.color}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <ProductImage 
                          src={item.product.images[0]} 
                          alt={item.product.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between">
                          <div>
                            <Link to={`/product/${item.product.id}`}>
                              <h3 className="font-semibold hover:text-primary transition-colors">
                                {item.product.name}
                              </h3>
                            </Link>
                            {item.size && (
                              <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                            )}
                            {item.color && (
                              <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemove(item.product.id, item.product.name)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <p className="text-lg font-bold">
                            {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "FREE" : formatPrice(shipping)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-500">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  {subtotal < 100 && subtotal > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add {formatPrice(100 - subtotal)} more for free shipping!
                    </p>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={appliedPromo}
                      />
                      <Button onClick={applyPromoCode} variant="secondary" disabled={appliedPromo}>
                        {appliedPromo ? "Applied" : "Apply"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/checkout" className="w-full">
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
