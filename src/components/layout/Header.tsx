import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Search, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { getItemCount } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customsNoticeOpen, setCustomsNoticeOpen] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const itemCount = getItemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm">
      {/* Customs Notice Bar */}
      {customsNoticeOpen && (
        <div className="bg-primary/10 border-b border-primary/20 py-1.5 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <p className="text-xs md:text-sm text-center flex-1">
              <span className="text-primary font-semibold">Important:</span>{" "}
              International orders may be subject to customs duties
            </p>
            <button 
              onClick={() => setCustomsNoticeOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors ml-2"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <div className="border-b border-border">
        <div className="container flex items-center justify-between px-4 py-2 h-14">
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Left - Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5 flex-1">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Shop All
            </Link>
            <Link to="/shop?category=books" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Books
            </Link>
            <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            {isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Admin
              </Link>
            )}
          </nav>

          {/* Center - Logo */}
          <Link to="/" className="flex items-center justify-center">
            <img 
              src={logo} 
              alt="Abu Hurayrah" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Right - Icons */}
          <div className="flex items-center gap-1 flex-1 justify-end">
            {/* Search */}
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-32 md:w-48 h-8 px-3 text-sm border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            
            {user ? (
              <Button variant="ghost" size="icon" onClick={() => signOut()} title="Sign Out" className="h-8 w-8">
                <User className="h-4 w-4 text-primary" />
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}
            
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ShoppingBag className="h-4 w-4" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-sm">
          <nav className="container px-4 py-3 flex flex-col gap-2">
            <Link 
              to="/" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/shop" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop All
            </Link>
            <Link 
              to="/shop?category=books" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Books
            </Link>
            <Link 
              to="/contact" 
              className="text-sm font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className="text-sm font-medium text-primary py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            {!user && (
              <Link 
                to="/auth" 
                className="text-sm font-medium py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In / Register
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
