import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img 
              src={logo} 
              alt="Maktabah Abu Hurayrah" 
              className="h-16 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Premium Islamic books and authentic knowledge for the Muslim Ummah
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-primary">Shop</h5>
            <div className="space-y-2 text-sm">
              <Link to="/shop" className="block text-muted-foreground hover:text-primary transition">
                All Products
              </Link>
              <Link to="/shop?category=books" className="block text-muted-foreground hover:text-primary transition">
                Books
              </Link>
              <Link to="/shop?category=clothing" className="block text-muted-foreground hover:text-primary transition">
                Clothing
              </Link>
              <Link to="/shop?category=luxury" className="block text-muted-foreground hover:text-primary transition">
                Luxury Items
              </Link>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-primary">Support</h5>
            <div className="space-y-2 text-sm">
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition">
                Contact Us
              </Link>
              <Link to="/shipping-policy" className="block text-muted-foreground hover:text-primary transition">
                Shipping Policy
              </Link>
              <Link to="/cancellations-refunds" className="block text-muted-foreground hover:text-primary transition">
                Cancellations & Refunds
              </Link>
              <Link to="/privacy-policy" className="block text-muted-foreground hover:text-primary transition">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-primary transition">
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-primary">Account</h5>
            <div className="space-y-2 text-sm">
              <Link to="/auth" className="block text-muted-foreground hover:text-primary transition">
                Sign In
              </Link>
              <Link to="/cart" className="block text-muted-foreground hover:text-primary transition">
                View Cart
              </Link>
              <Link to="/checkout" className="block text-muted-foreground hover:text-primary transition">
                Checkout
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Maktabah Abu Hurayrah. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="/shipping-policy" className="hover:text-primary transition">Shipping Policy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;