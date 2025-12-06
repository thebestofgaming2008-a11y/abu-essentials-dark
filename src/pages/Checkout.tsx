import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2, CreditCard, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { z } from 'zod';
import { formatPrice } from '@/lib/currency';

const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Please enter a valid email'),
  phone: z.string().max(20, 'Phone must be less than 20 characters').optional().or(z.literal('')),
  address: z.string().min(1, 'Address is required').max(200, 'Address must be less than 200 characters'),
  city: z.string().min(1, 'City is required').max(100, 'City must be less than 100 characters'),
  country: z.string().min(1, 'Country is required').max(100, 'Country must be less than 100 characters')
});

type CheckoutErrors = Partial<Record<keyof z.infer<typeof checkoutSchema>, string>>;

const Checkout = () => {
  const { items, getTotal } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<CheckoutErrors>({});
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  const subtotal = getTotal();
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});
    
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    const result = checkoutSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: CheckoutErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof CheckoutErrors;
        fieldErrors[field] = err.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const cartItems = items.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.salePrice || item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] ? `${window.location.origin}${item.product.images[0]}` : undefined
      }));

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          items: cartItems,
          customerEmail: result.data.email,
          shippingInfo: result.data
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: unknown) {
      toast({
        title: "Checkout Failed",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center p-8">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some items to your cart to proceed with checkout.</p>
            <Button asChild>
              <Link to="/shop">Browse Products</Link>
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>

          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                    />
                    {formErrors.name && <p className="text-sm text-destructive">{formErrors.name}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && <p className="text-sm text-destructive">{formErrors.email}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 234 567 8900"
                      />
                      {formErrors.phone && <p className="text-sm text-destructive">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                    />
                    {formErrors.address && <p className="text-sm text-destructive">{formErrors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="New York"
                      />
                      {formErrors.city && <p className="text-sm text-destructive">{formErrors.city}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="United States"
                      />
                      {formErrors.country && <p className="text-sm text-destructive">{formErrors.country}</p>}
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2" />
                        Pay {formatPrice(total)}
                      </>
                    )}
                  </Button>
                  
                  <p className="text-sm text-muted-foreground text-center">
                    You will be redirected to Stripe for secure payment
                  </p>
                </form>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {formatPrice((item.product.salePrice || item.product.price) * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
