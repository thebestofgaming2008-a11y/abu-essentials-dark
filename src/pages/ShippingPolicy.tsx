import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Shipping Policy</h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Processing Time</h2>
              <p className="text-muted-foreground">
                All orders are processed within 1-3 business days. Orders placed on weekends or 
                holidays will be processed on the next business day. You will receive a confirmation 
                email once your order has been shipped.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Shipping Methods & Delivery Time</h2>
              <div className="bg-card border border-border rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Standard Shipping</span>
                  <span className="text-muted-foreground">5-7 business days</span>
                </div>
                <div className="flex justify-between items-center border-b border-border pb-2">
                  <span className="font-medium">Express Shipping</span>
                  <span className="text-muted-foreground">2-3 business days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Same Day (Local)</span>
                  <span className="text-muted-foreground">Within 24 hours</span>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Shipping Costs</h2>
              <p className="text-muted-foreground">
                Shipping costs are calculated at checkout based on your location and the weight of 
                your order. Free shipping is available on orders above ₹999.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Delivery Areas</h2>
              <p className="text-muted-foreground">
                We currently ship across India. Delivery times may vary based on your location. 
                Remote areas may require additional delivery time.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Order Tracking</h2>
              <p className="text-muted-foreground">
                Once your order is shipped, you will receive a tracking number via email. You can 
                use this number to track your package on the courier's website.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Damaged or Lost Packages</h2>
              <p className="text-muted-foreground">
                If your package arrives damaged or is lost during transit, please contact us 
                immediately at support@islamicbooks.com. We will work with the courier to resolve 
                the issue and ensure you receive your order.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
              <p className="text-muted-foreground">
                For any shipping-related queries, please reach out to us at support@islamicbooks.com 
                or call us at +91 XXXXX XXXXX.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
