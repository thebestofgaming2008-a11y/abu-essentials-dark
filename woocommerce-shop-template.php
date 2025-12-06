<?php
/**
 * Template Name: Custom Shop Page
 * Description: Beautiful custom shop page integrated with WooCommerce
 */

get_header(); ?>

<style>
/* Copy all the inline styles from your HTML here or add to your theme's style.css */
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    margin: 0;
    padding: 0;
    background: #f8f9fa;
}

.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 80px 20px;
    text-align: center;
}

.hero-section h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    font-weight: 700;
}

.hero-section p {
    font-size: 1.25rem;
    margin-bottom: 30px;
    opacity: 0.95;
}

.cta-button {
    display: inline-block;
    padding: 15px 40px;
    background: white;
    color: #667eea;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.products-section {
    max-width: 1200px;
    margin: 60px auto;
    padding: 0 20px;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 50px;
    color: #2d3748;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}

.product-card {
    background: white;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
    position: relative;
}

.product-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
}

.product-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.product-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #f56565;
    color: white;
    padding: 5px 15px;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 600;
}

.product-content {
    padding: 20px;
}

.product-title {
    font-size: 1.25rem;
    margin-bottom: 10px;
    color: #2d3748;
}

.product-description {
    color: #718096;
    margin-bottom: 15px;
    font-size: 0.95rem;
}

.product-price {
    font-size: 1.5rem;
    color: #667eea;
    font-weight: 700;
    margin-bottom: 15px;
}

.product-price del {
    color: #a0aec0;
    font-size: 1.1rem;
    margin-left: 10px;
}

.add-to-cart-btn {
    width: 100%;
    padding: 12px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
    transform: scale(1.02);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.rating {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.star {
    color: #fbbf24;
    margin-right: 2px;
}
</style>

<!-- Hero Section -->
<section class="hero-section">
    <h1>Abu Hurayrah Essentials</h1>
    <p>Discover Premium Islamic Products for Your Spiritual Journey</p>
    <a href="#products" class="cta-button">Shop Now</a>
</section>

<!-- Products Section -->
<section class="products-section" id="products">
    <h2 class="section-title">Featured Products</h2>
    
    <div class="products-grid">
        <?php
        // WooCommerce product query
        $args = array(
            'post_type' => 'product',
            'posts_per_page' => 12,
            'orderby' => 'date',
            'order' => 'DESC'
        );
        
        $products = new WP_Query($args);
        
        if ($products->have_posts()) :
            while ($products->have_posts()) : $products->the_post();
                global $product;
                ?>
                
                <div class="product-card">
                    <a href="<?php echo esc_url(get_permalink()); ?>">
                        <?php if (has_post_thumbnail()) : ?>
                            <img src="<?php echo esc_url(get_the_post_thumbnail_url(get_the_ID(), 'medium')); ?>" 
                                 alt="<?php echo esc_attr(get_the_title()); ?>" 
                                 class="product-image">
                        <?php else : ?>
                            <img src="<?php echo esc_url(wc_placeholder_img_src()); ?>" 
                                 alt="<?php echo esc_attr(get_the_title()); ?>" 
                                 class="product-image">
                        <?php endif; ?>
                        
                        <?php if ($product->is_on_sale()) : ?>
                            <span class="product-badge">Sale</span>
                        <?php endif; ?>
                    </a>
                    
                    <div class="product-content">
                        <h3 class="product-title">
                            <a href="<?php echo esc_url(get_permalink()); ?>">
                                <?php echo esc_html(get_the_title()); ?>
                            </a>
                        </h3>
                        
                        <?php if ($product->get_rating_count() > 0) : ?>
                            <div class="rating">
                                <?php
                                $rating = $product->get_average_rating();
                                for ($i = 1; $i <= 5; $i++) {
                                    if ($i <= $rating) {
                                        echo '<span class="star">★</span>';
                                    } else {
                                        echo '<span class="star" style="color: #e2e8f0;">★</span>';
                                    }
                                }
                                ?>
                                <span style="margin-left: 8px; color: #718096; font-size: 0.875rem;">
                                    (<?php echo esc_html($product->get_rating_count()); ?>)
                                </span>
                            </div>
                        <?php endif; ?>
                        
                        <div class="product-description">
                            <?php echo wp_trim_words(get_the_excerpt(), 15); ?>
                        </div>
                        
                        <div class="product-price">
                            <?php echo $product->get_price_html(); ?>
                        </div>
                        
                        <?php if ($product->is_in_stock()) : ?>
                            <a href="<?php echo esc_url($product->add_to_cart_url()); ?>" 
                               class="add-to-cart-btn ajax_add_to_cart add_to_cart_button" 
                               data-product_id="<?php echo esc_attr($product->get_id()); ?>"
                               data-product_sku="<?php echo esc_attr($product->get_sku()); ?>"
                               data-quantity="1">
                                Add to Cart
                            </a>
                        <?php else : ?>
                            <button class="add-to-cart-btn" disabled style="opacity: 0.6; cursor: not-allowed;">
                                Out of Stock
                            </button>
                        <?php endif; ?>
                    </div>
                </div>
                
            <?php endwhile;
            wp_reset_postdata();
        else : ?>
            <p>No products found.</p>
        <?php endif; ?>
    </div>
</section>

<script>
// AJAX Add to Cart functionality
jQuery(document).ready(function($) {
    $('.ajax_add_to_cart').on('click', function(e) {
        e.preventDefault();
        
        var $button = $(this);
        var product_id = $button.data('product_id');
        
        $button.text('Adding...').prop('disabled', true);
        
        $.ajax({
            type: 'POST',
            url: wc_add_to_cart_params.ajax_url,
            data: {
                action: 'woocommerce_ajax_add_to_cart',
                product_id: product_id,
                quantity: 1
            },
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                    $button.text('Add to Cart').prop('disabled', false);
                } else {
                    $button.text('Added!');
                    // Update cart widget
                    $(document.body).trigger('wc_fragment_refresh');
                    setTimeout(function() {
                        $button.text('Add to Cart').prop('disabled', false);
                    }, 2000);
                }
            }
        });
    });
});
</script>

<?php get_footer(); ?>
