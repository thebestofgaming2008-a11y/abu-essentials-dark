<?php
/**
 * Template Name: Custom Product Page
 * Description: Beautiful custom single product page
 */

get_header(); ?>

<style>
.product-detail-container {
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
}

.product-detail-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 60px;
}

.product-images {
    position: sticky;
    top: 20px;
    height: fit-content;
}

.main-image {
    width: 100%;
    border-radius: 15px;
    margin-bottom: 20px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.thumbnail-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

.thumbnail {
    width: 100%;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s ease;
}

.thumbnail:hover,
.thumbnail.active {
    border-color: #667eea;
}

.product-info h1 {
    font-size: 2.5rem;
    color: #2d3748;
    margin-bottom: 20px;
}

.product-price-large {
    font-size: 2rem;
    color: #667eea;
    font-weight: 700;
    margin-bottom: 20px;
}

.product-description {
    color: #4a5568;
    line-height: 1.8;
    margin-bottom: 30px;
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.quantity-selector button {
    width: 40px;
    height: 40px;
    border: 2px solid #e2e8f0;
    background: white;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
}

.quantity-selector input {
    width: 60px;
    height: 40px;
    text-align: center;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
}

.add-to-cart-large {
    width: 100%;
    padding: 18px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: 15px;
}

.add-to-cart-large:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
    .product-detail-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }
}
</style>

<?php
if (have_posts()) :
    while (have_posts()) : the_post();
        global $product;
        ?>
        
        <div class="product-detail-container">
            <div class="product-detail-grid">
                <!-- Product Images -->
                <div class="product-images">
                    <?php
                    $image_id = $product->get_image_id();
                    $gallery_ids = $product->get_gallery_image_ids();
                    ?>
                    
                    <img id="mainImage" 
                         src="<?php echo esc_url(wp_get_attachment_image_url($image_id, 'large')); ?>" 
                         alt="<?php echo esc_attr(get_the_title()); ?>" 
                         class="main-image">
                    
                    <?php if ($gallery_ids) : ?>
                        <div class="thumbnail-grid">
                            <img src="<?php echo esc_url(wp_get_attachment_image_url($image_id, 'thumbnail')); ?>" 
                                 alt="<?php echo esc_attr(get_the_title()); ?>" 
                                 class="thumbnail active"
                                 onclick="changeMainImage(this.src.replace('-150x150', '-1024x1024'))">
                            
                            <?php foreach ($gallery_ids as $gallery_id) : ?>
                                <img src="<?php echo esc_url(wp_get_attachment_image_url($gallery_id, 'thumbnail')); ?>" 
                                     alt="<?php echo esc_attr(get_the_title()); ?>" 
                                     class="thumbnail"
                                     onclick="changeMainImage(this.src.replace('-150x150', '-1024x1024'))">
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>
                
                <!-- Product Info -->
                <div class="product-info">
                    <h1><?php echo esc_html(get_the_title()); ?></h1>
                    
                    <?php if ($product->get_rating_count() > 0) : ?>
                        <div class="rating" style="margin-bottom: 20px;">
                            <?php
                            $rating = $product->get_average_rating();
                            for ($i = 1; $i <= 5; $i++) {
                                if ($i <= $rating) {
                                    echo '<span style="color: #fbbf24; font-size: 1.2rem;">★</span>';
                                } else {
                                    echo '<span style="color: #e2e8f0; font-size: 1.2rem;">★</span>';
                                }
                            }
                            ?>
                            <span style="margin-left: 8px; color: #718096;">
                                (<?php echo esc_html($product->get_rating_count()); ?> reviews)
                            </span>
                        </div>
                    <?php endif; ?>
                    
                    <div class="product-price-large">
                        <?php echo $product->get_price_html(); ?>
                    </div>
                    
                    <div class="product-description">
                        <?php echo wp_kses_post($product->get_description()); ?>
                    </div>
                    
                    <?php if ($product->is_in_stock()) : ?>
                        <form action="<?php echo esc_url(wc_get_cart_url()); ?>" method="post" enctype="multipart/form-data">
                            <div class="quantity-selector">
                                <label for="quantity" style="font-weight: 600; color: #2d3748;">Quantity:</label>
                                <button type="button" onclick="decreaseQuantity()">-</button>
                                <input type="number" 
                                       id="quantity" 
                                       name="quantity" 
                                       value="1" 
                                       min="1" 
                                       max="<?php echo esc_attr($product->get_stock_quantity() ?: 999); ?>">
                                <button type="button" onclick="increaseQuantity()">+</button>
                            </div>
                            
                            <input type="hidden" name="add-to-cart" value="<?php echo esc_attr($product->get_id()); ?>">
                            
                            <button type="submit" class="add-to-cart-large">
                                Add to Cart
                            </button>
                        </form>
                        
                        <p style="color: #48bb78; font-weight: 600; margin-bottom: 20px;">
                            ✓ In Stock - Ready to Ship
                        </p>
                    <?php else : ?>
                        <button class="add-to-cart-large" disabled style="opacity: 0.6; cursor: not-allowed;">
                            Out of Stock
                        </button>
                    <?php endif; ?>
                    
                    <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 20px;">
                        <p style="color: #718096; margin-bottom: 10px;">
                            <strong>Category:</strong> 
                            <?php echo wc_get_product_category_list($product->get_id()); ?>
                        </p>
                        <?php if ($product->get_sku()) : ?>
                            <p style="color: #718096;">
                                <strong>SKU:</strong> <?php echo esc_html($product->get_sku()); ?>
                            </p>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </div>
        
    <?php endwhile;
endif; ?>

<script>
function changeMainImage(src) {
    document.getElementById('mainImage').src = src;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.target.classList.add('active');
}

function increaseQuantity() {
    const input = document.getElementById('quantity');
    const max = parseInt(input.getAttribute('max'));
    const current = parseInt(input.value);
    if (current < max) {
        input.value = current + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    const min = parseInt(input.getAttribute('min'));
    const current = parseInt(input.value);
    if (current > min) {
        input.value = current - 1;
    }
}
</script>

<?php get_footer(); ?>
