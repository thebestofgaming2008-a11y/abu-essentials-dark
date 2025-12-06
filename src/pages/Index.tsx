import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ArrowRight, 
  BookOpen,
  ScrollText,
  Building2,
  Scale,
  Moon,
  Users,
  Baby,
  Languages,
  Library,
  Sparkles,
  Shirt,
  Gift
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImage from "@/components/ui/product-image";

const Index = () => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Categories for the carousel (books + other products)
  const categories = [
    { name: "Tafsir", icon: BookOpen },
    { name: "Hadith", icon: ScrollText },
    { name: "Aqeedah", icon: Building2 },
    { name: "Fiqh", icon: Scale },
    { name: "Seerah", icon: Moon },
    { name: "Women", icon: Users },
    { name: "Children", icon: Baby },
    { name: "Arabic", icon: Languages },
    { name: "Urdu", icon: Library },
    { name: "Spirituality", icon: Sparkles },
    { name: "Clothing", icon: Shirt },
    { name: "Gifts", icon: Gift },
  ];

  // Bundle deals
  const bundleDeals = [
    {
      id: "bundle-1",
      name: "Beginner's Essential Collection",
      description: "Perfect for new Muslims or those beginning their Islamic studies journey.",
      originalPrice: 89.99,
      salePrice: 69.99,
      items: ["Kitab at-Tawhid", "Riyad as-Saliheen", "Fortress of the Muslim"],
      image: "/images/books/kitab at-tawheed/photo_22_2025-11-30_15-31-15.jpg"
    },
    {
      id: "bundle-2",
      name: "Scholar's Tafsir Bundle",
      description: "Comprehensive Quran commentary collection featuring the most respected scholars.",
      originalPrice: 329.99,
      salePrice: 279.99,
      items: ["Tafsir As-Sa'di (10 Vol)", "Tafsir Ibn Kathir (10 Vol)"],
      image: "/images/books/tafsir Sa'di/tafsirSadi.jpg"
    },
    {
      id: "bundle-3",
      name: "Hadith Master Collection",
      description: "The two most authentic hadith collections. Essential for every Muslim household.",
      originalPrice: 369.99,
      salePrice: 299.99,
      items: ["Sahih al-Bukhari (9 Vol)", "Sahih Muslim (7 Vol)"],
      image: "/images/books/Sahih Bukhari english/photo_41_2025-11-30_15-31-15.jpg"
    },
    {
      id: "bundle-4",
      name: "Women's Knowledge Pack",
      description: "Curated collection addressing topics relevant to Muslim women.",
      originalPrice: 99.99,
      salePrice: 74.99,
      items: ["Great Women of Islam", "Important Lessons for Muslim Women", "My Advice to the Women"],
      image: "/images/books/Great women of al Islam.jpg"
    },
  ];

  // Featured products
  const featuredProducts = products
    .filter(p => p.badge === "Bestseller" || p.badge === "Popular" || p.rating >= 4.9)
    .slice(0, 4);

  // Random products for "More to Explore"
  const moreProducts = products
    .filter(p => !featuredProducts.includes(p))
    .sort(() => Math.random() - 0.5)
    .slice(0, 8);

  const handleAddToCart = (product: typeof products[0]) => {
    if (!product.inStock) return;
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section with Animated Background */}
      <section className="relative py-16 md:py-24 px-4 overflow-hidden hero-pattern">
        {/* Animated geometric elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating geometric patterns */}
          <div className="absolute top-10 left-[10%] w-32 h-32 border border-primary/20 rotate-45 animate-float opacity-30" />
          <div className="absolute top-20 right-[15%] w-24 h-24 border border-primary/15 rotate-12 animate-float-delayed opacity-20" />
          <div className="absolute bottom-10 left-[20%] w-20 h-20 border border-primary/10 -rotate-12 animate-float opacity-25" />
          <div className="absolute bottom-20 right-[25%] w-16 h-16 bg-primary/5 rotate-45 animate-float-delayed" />
          
          {/* Glowing orbs */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
          
          {/* Shimmer line */}
          <div className="absolute top-1/2 left-0 right-0 h-px animate-shimmer" />
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30 text-xs">
              Authentic Islamic Resources
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Illuminate Your Path
              <span className="block text-primary mt-2">With Sacred Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Premium Islamic books, elegant clothing & meaningful gifts — curated from trusted sources for the discerning Muslim
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 shadow-lg shadow-primary/20">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/shop?category=books">
                <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 px-8">
                  Browse Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Collection</h2>
            <p className="text-muted-foreground">Handpicked bestsellers loved by our community</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 bg-card shadow-sm">
                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-secondary/50">
                    <ProductImage 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-primary mb-1 capitalize">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {product.salePrice ? (
                      <>
                        <p className="text-lg font-bold text-primary">${product.salePrice}</p>
                        <p className="text-sm text-muted-foreground line-through">${product.price}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold">${product.price}</p>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Carousel - Infinite Scroll */}
      <section className="py-12 px-4 overflow-hidden bg-secondary/30">
        <div className="container mx-auto mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">Browse by Category</h2>
          <p className="text-muted-foreground text-center text-sm">Find exactly what you're looking for</p>
        </div>
        <div className="relative max-w-6xl mx-auto overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          {/* Infinite scrolling container */}
          <div className="flex animate-infinite-scroll w-max">
            {[...categories, ...categories, ...categories, ...categories].map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Link 
                  key={index} 
                  to={`/shop?search=${category.name.toLowerCase()}`}
                  className="flex-shrink-0 mx-2"
                >
                  <Card className="w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center gap-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group bg-card shadow-sm">
                    <IconComponent className="h-8 w-8 md:h-10 md:w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="font-medium text-xs md:text-sm text-foreground">{category.name}</span>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bundle Deals */}
      <section className="py-16 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Save More</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Bundle Deals</h2>
            <p className="text-muted-foreground">Curated collections at special prices</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {bundleDeals.map((bundle) => (
              <Card key={bundle.id} className="overflow-hidden border-border hover:border-primary/50 transition-all duration-300 bg-card shadow-sm">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-2/5 aspect-square md:aspect-auto bg-secondary/50 relative overflow-hidden">
                    <ProductImage 
                      src={bundle.image} 
                      alt={bundle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 md:w-3/5 flex flex-col justify-between">
                    <div>
                      <Badge className="mb-2 bg-destructive/90 text-destructive-foreground text-xs">
                        Save ${(bundle.originalPrice - bundle.salePrice).toFixed(2)}
                      </Badge>
                      <h3 className="text-lg font-bold mb-2">{bundle.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{bundle.description}</p>
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Includes:</p>
                        <ul className="text-xs text-muted-foreground space-y-0.5">
                          {bundle.items.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-primary">${bundle.salePrice}</span>
                        <span className="text-sm text-muted-foreground line-through">${bundle.originalPrice}</span>
                      </div>
                      <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                        View Bundle
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* More to Explore */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">More to Explore</h2>
            <p className="text-muted-foreground">Discover more from our collection</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moreProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden border-border hover:border-primary/50 transition-all duration-300 bg-card shadow-sm">
                {product.badge && (
                  <Badge className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                )}
                {!product.inStock && (
                  <Badge className="absolute top-4 right-4 z-10" variant="destructive">
                    Out of Stock
                  </Badge>
                )}
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-square overflow-hidden bg-secondary/50">
                    <ProductImage 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-primary mb-1 capitalize">{product.category}</p>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {product.salePrice ? (
                      <>
                        <p className="text-lg font-bold text-primary">${product.salePrice}</p>
                        <p className="text-sm text-muted-foreground line-through">${product.price}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold">${product.price}</p>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90" 
                    disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                  >
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground px-8">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
