import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCart, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products, categories } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductImage from "@/components/ui/product-image";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Sync URL params with state
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const searchParam = searchParams.get("search");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSearchQuery("");
    } else if (searchParam) {
      setSearchQuery(searchParam);
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    
    // Handle search with multiple terms (comma-separated)
    if (searchQuery) {
      const searchTerms = searchQuery.toLowerCase().split(',').map(t => t.trim());
      const productText = `${product.name} ${product.description} ${product.category}`.toLowerCase();
      const matchesSearch = searchTerms.some(term => productText.includes(term));
      return matchesSearch;
    }
    
    return matchesCategory;
  });

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    if (categoryId === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ search: value });
      setSelectedCategory("all");
    } else {
      setSearchParams({});
    }
  };

  const handleAddToCart = (product: typeof products[0]) => {
    if (!product.inStock) return;
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Our Collection</h1>
            <p className="text-lg text-muted-foreground">
              Discover our curated selection of premium Islamic products
            </p>
            
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search books, clothing, luxury items..."
                className="pl-10 h-12"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1 container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryChange(category.id)}
                    >
                      {category.name}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {category.id === "all" 
                          ? products.length 
                          : products.filter(p => p.category === category.id).length}
                      </span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
                {searchQuery && <span className="ml-1">for "{searchQuery}"</span>}
              </p>
              {(searchQuery || selectedCategory !== "all") && (
                <Button variant="link" onClick={clearFilters} className="text-primary">
                  Clear filters
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group overflow-hidden hover:shadow-lg transition-shadow border-border hover:border-primary/30">
                  <Link to={`/product/${product.id}`}>
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <ProductImage
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.badge && (
                        <Badge className="absolute top-3 right-3">
                          {product.badge}
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="absolute top-3 left-3" variant="destructive">
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </Link>
                  
                  <CardContent className="p-4 space-y-3">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-semibold hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "fill-primary text-primary"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-primary">
                              ${product.salePrice}
                            </span>
                            <span className="text-sm line-through text-muted-foreground">
                              ${product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">${product.price}</span>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found matching your search.</p>
                <Button 
                  variant="link" 
                  onClick={clearFilters}
                  className="text-primary"
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
