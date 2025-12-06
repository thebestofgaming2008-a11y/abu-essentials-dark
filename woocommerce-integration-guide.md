# WooCommerce Integration Guide
## Converting Your Beautiful HTML Design to a Fully Functional WordPress Store

This guide will walk you through integrating your custom HTML design with WooCommerce to create a fully functional, beautiful e-commerce store.

---

## Prerequisites

### Required Plugins
1. **WooCommerce** (free) - The core e-commerce plugin
2. **Code Snippets** (free) - For adding custom functions safely
3. **Advanced Custom Fields** (optional) - For additional product fields

### Recommended Theme Setup
- Use a lightweight theme like **Astra**, **GeneratePress**, or **Kadence**
- Or create a child theme of your current theme

---

## Step 1: Install WooCommerce

1. Go to **WordPress Dashboard → Plugins → Add New**
2. Search for "WooCommerce"
3. Click **Install Now**, then **Activate**
4. Follow the WooCommerce setup wizard:
   - Set your store location
   - Select your currency
   - Configure payment methods (PayPal, Stripe, etc.)
   - Set up shipping options
   - Skip optional features for now

---

## Step 2: Create a Child Theme (Recommended)

### Why Use a Child Theme?
- Prevents your customizations from being overwritten during theme updates
- Safe way to modify templates
- Keep your custom code organized and separate

---

### ✅ OPTION A: Using Astra Child Theme Generator (EASIEST - RECOMMENDED)

If you're using Astra theme, this is the simplest method:

1. **Visit the Generator Website**
   - Go to: https://wpastra.com/child-theme-generator/
   
2. **Fill in the Form**
   - Theme Name: `Astra Child` (or any name you want)
   - Theme Author: Your name
   - Click **"Generate Child Theme"**
   
3. **Download the ZIP file**
   - A file like `astra-child.zip` will download
   
4. **Install in WordPress**
   - Go to **WordPress Dashboard → Appearance → Themes**
   - Click **"Add New"** → **"Upload Theme"**
   - Choose the downloaded ZIP file
   - Click **"Install Now"**
   - Click **"Activate"**

✅ **Done!** Your child theme is ready.

---

### OPTION B: Using a Plugin (EASY)

1. **Install Child Theme Configurator Plugin**
   - Go to **WordPress Dashboard → Plugins → Add New**
   - Search for "Child Theme Configurator"
   - Install and activate
   
2. **Create the Child Theme**
   - Go to **Tools → Child Themes**
   - Select your parent theme (e.g., Astra, GeneratePress)
   - Click **"Analyze"** then **"Create New Child Theme"**
   - Click **"Configure Child Theme"**

✅ **Done!** The plugin creates and activates your child theme.

---

### OPTION C: Manual Creation (For Advanced Users)

**Step 1: Access Your Server**
- Use FTP (FileZilla) or your hosting File Manager (cPanel)
- Navigate to `/wp-content/themes/`

**Step 2: Create Child Theme Folder**
- Create a new folder named `astra-child` (or `your-theme-child`)

**Step 3: Create style.css File**
- Inside your child theme folder, create a file called `style.css`
- Add this code (replace `astra` with your parent theme name):
```css
/*
Theme Name: Astra Child
Description: Child theme for Astra
Template: astra
Version: 1.0.0
*/
```

**Step 4: Create functions.php File**
- In the same folder, create `functions.php`
- Add this code:
```php
<?php
// Enqueue parent and child theme styles
function astra_child_enqueue_styles() {
    // Load parent theme stylesheet
    wp_enqueue_style('astra-parent-style', get_template_directory_uri() . '/style.css');
    
    // Load child theme stylesheet
    wp_enqueue_style('astra-child-style', get_stylesheet_uri(), array('astra-parent-style'));
}
add_action('wp_enqueue_scripts', 'astra_child_enqueue_styles');
?>
```

**Step 5: Activate**
- Go to **WordPress Dashboard → Appearance → Themes**
- You should see your child theme listed
- Click **"Activate"**

✅ **Done!** Your child theme is active.

---

### ⚠️ Important Notes
- Always use a child theme when customizing a theme
- Your child theme will inherit all features from the parent theme
- Place all custom template files (like our WooCommerce templates) in the child theme folder

---

## Step 3: Add Custom Page Templates

### What Are Custom Template Files?
The two PHP files I created for you (`woocommerce-shop-template.php` and `woocommerce-single-product-template.php`) contain your beautiful HTML design converted to work with WooCommerce. 

**These files are currently in your Lovable project** - you need to:
1. **Download them from Lovable to your computer**
2. **Upload them to your WordPress child theme folder**

---

### FIRST: Download the Template Files from Lovable

Before you can use these templates in WordPress, you need to download them:

1. **Look at the left side of this Lovable interface**
   - You'll see a file tree/list of files
   
2. **Find these two files:**
   - `woocommerce-shop-template.php`
   - `woocommerce-single-product-template.php`
   
3. **Download each file:**
   - Click on the file name to open it
   - Look for a download button or option (usually three dots menu → Download)
   - Save both files to a folder on your computer (like Downloads or Desktop)
   - Remember where you saved them!

✅ **Now you have the files on your computer and can upload them to WordPress**

---

### SECOND: Upload Template Files to Your WordPress Child Theme Folder

**What does "upload to child theme folder" mean?**
- Your WordPress site has a folder structure on the server
- The child theme you created (Astra Child) has its own folder at: `/wp-content/themes/astra-child/`
- You need to put the PHP files you downloaded into that folder
- Once there, WordPress will automatically recognize them as templates

**OPTION A: Using cPanel File Manager (Easiest)**

1. **Log into your hosting cPanel**
   - Usually at: `yourwebsite.com/cpanel`
   - Or through your hosting provider's dashboard

2. **Open File Manager**
   - Look for "File Manager" icon in cPanel
   - Click to open it

3. **Navigate to Your Child Theme Folder**
   - Go to: `public_html/wp-content/themes/`
   - Look for your child theme folder (e.g., `astra-child`)
   - Click to open it

4. **Upload the Template Files**
   - Click the **"Upload"** button at the top
   - Click **"Select File"** and choose `woocommerce-shop-template.php` from your computer
   - Wait for it to upload (you'll see a progress bar)
   - Repeat for `woocommerce-single-product-template.php`

5. **Verify Files Are There**
   - Go back to your child theme folder
   - You should see both PHP files listed

✅ **Done!** WordPress will now automatically detect these templates.

---

**OPTION B: Using FTP (FileZilla)**

1. **Download FileZilla**
   - Get it free from: https://filezilla-project.org/
   - Install it on your computer

2. **Connect to Your Server**
   - Open FileZilla
   - Get FTP credentials from your hosting provider (usually in cPanel or welcome email)
   - Enter:
     - Host: `ftp.yourwebsite.com` or your server IP
     - Username: Your FTP username
     - Password: Your FTP password
     - Port: `21` (or `22` for SFTP)
   - Click **"Quickconnect"**

3. **Navigate on Remote Side (Right Panel)**
   - Find: `/public_html/wp-content/themes/astra-child/`
   - (Or wherever your child theme folder is)

4. **Navigate on Local Side (Left Panel)**
   - Find where you downloaded the PHP files on your computer

5. **Drag and Drop**
   - Drag `woocommerce-shop-template.php` from left panel to right panel
   - Drag `woocommerce-single-product-template.php` from left panel to right panel

✅ **Done!** Files are now on your server.

---

**OPTION C: Using WordPress Theme File Editor (Quick but Less Safe)**

1. **Go to WordPress Dashboard → Appearance → Theme File Editor**
2. **Select your child theme** from the dropdown in the top right
3. **Click "Add New File"** (if available) or manually:
   - Click on `functions.php` to open the editor
   - Look for an option to add new files
4. **Create `woocommerce-shop-template.php`**
   - Copy the entire content from the file I created
   - Paste it into the editor
   - Save
5. **Repeat for `woocommerce-single-product-template.php`**

⚠️ **Warning:** This method is less safe - one typo can break your site. Use Options A or B if possible.

---

### Create Your Shop Page

Now that the templates are uploaded:

1. **Go to Pages → Add New**
2. **Title it "Shop"**
3. **In the right sidebar under "Page Attributes"**:
   - Look for **"Template"** dropdown
   - Select **"Custom Shop Page"** (this option appears because you uploaded the template file!)
4. **Click "Publish"**
5. **Set as WooCommerce Shop Page**:
   - Go to **WooCommerce → Settings → Products → Display**
   - Under "Shop Page", select the "Shop" page you just created
   - Click **"Save changes"**

✅ Your custom shop page is now live!

---

### Apply Template to Product Pages

The single product template works automatically once uploaded, but verify:

1. **Go to any product page on your site**
2. **Check if it uses your custom design**
3. **If not**:
   - Go to **Appearance → Theme File Editor**
   - Select your child theme
   - Look for `single-product.php` (or create it)
   - The template should load automatically

---

### 📝 Quick Summary
- **Custom template files** = The PHP files I created with your design
- **Child theme folder** = Where WordPress looks for your customizations
- **Location**: `/wp-content/themes/astra-child/` (or your child theme name)
- **Upload method**: Use cPanel File Manager (easiest) or FileZilla (FTP)

---

## Step 4: Add Custom CSS

### Option A: Theme Customizer (Easiest)
1. Go to **Appearance → Customize → Additional CSS**
2. Copy all the CSS from the `<style>` sections in the template files
3. Click **Publish**

### Option B: Child Theme Stylesheet
1. Open your child theme's `style.css`
2. Add all the custom CSS at the bottom
3. Save and upload via FTP or File Manager

---

## Step 5: Configure WooCommerce Settings

### General Settings
- **WooCommerce → Settings → General**
  - Set your store address
  - Set currency options
  - Enable/disable tax

### Products Settings
- **WooCommerce → Settings → Products**
  - **Shop Page**: Select your custom shop page
  - **Add to cart behavior**: Enable AJAX for better UX
  - **Product images**: Set dimensions (e.g., 600x600 for main, 300x300 for thumbnails)

### Shipping Settings
- **WooCommerce → Settings → Shipping**
  - Add shipping zones
  - Set shipping methods (flat rate, free shipping, etc.)

### Payment Settings
- **WooCommerce → Settings → Payments**
  - Enable payment methods (Stripe, PayPal, etc.)
  - Configure each payment gateway

---

## Step 6: Add Products

1. Go to **Products → Add New**
2. Add product details:
   - **Title**: Product name
   - **Description**: Full product description
   - **Short Description**: Brief summary
   - **Product Data**:
     - Regular price
     - Sale price (optional)
     - SKU
     - Stock status
   - **Categories**: Organize products
   - **Tags**: Add relevant tags
   - **Product Image**: Featured image (main)
   - **Product Gallery**: Additional images

3. Click **Publish**

---

## Step 7: Enable AJAX Add to Cart

Add this code to your theme's `functions.php`:

```php
// Enable AJAX Add to Cart
add_action('wp_enqueue_scripts', function() {
    if (is_shop() || is_product_category() || is_product()) {
        wp_enqueue_script('wc-add-to-cart');
    }
});

// AJAX Add to Cart Handler
add_action('wp_ajax_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');
add_action('wp_ajax_nopriv_woocommerce_ajax_add_to_cart', 'woocommerce_ajax_add_to_cart');

function woocommerce_ajax_add_to_cart() {
    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity = empty($_POST['quantity']) ? 1 : wc_stock_amount($_POST['quantity']);
    
    $passed_validation = apply_filters('woocommerce_add_to_cart_validation', true, $product_id, $quantity);
    
    if ($passed_validation && WC()->cart->add_to_cart($product_id, $quantity)) {
        do_action('woocommerce_ajax_added_to_cart', $product_id);
        
        WC_AJAX::get_refreshed_fragments();
    } else {
        $data = array(
            'error' => true,
            'product_url' => apply_filters('woocommerce_cart_redirect_after_error', get_permalink($product_id), $product_id)
        );
        echo wp_send_json($data);
    }
    
    wp_die();
}
```

---

## Step 8: Test Your Store

### Frontend Testing
1. Visit your shop page
2. Test the following:
   - ✅ Products display correctly
   - ✅ Add to cart buttons work
   - ✅ Cart updates properly
   - ✅ Product images load
   - ✅ Product details show correctly
   - ✅ Checkout process works
   - ✅ Mobile responsiveness

### Backend Testing
1. Place a test order
2. Check if order appears in **WooCommerce → Orders**
3. Verify email notifications work
4. Test payment gateway with test mode

---

## Step 9: Optimize for Performance

### Image Optimization
- Install **Smush** or **ShortPixel** plugin
- Compress product images
- Use lazy loading

### Caching
- Install **WP Rocket** or **W3 Total Cache**
- Enable page caching
- Enable object caching

### CDN (Optional)
- Use **Cloudflare** (free)
- Serves images and assets faster globally

---

## Step 10: Go Live

### Before Launch Checklist
- [ ] All products added with images
- [ ] Shipping methods configured
- [ ] Payment gateways tested
- [ ] Legal pages created (Privacy Policy, Terms & Conditions, Refund Policy)
- [ ] SSL certificate installed (HTTPS)
- [ ] Contact information updated
- [ ] Email notifications working
- [ ] Mobile version tested
- [ ] Checkout process tested
- [ ] Stock levels set

### Launch
1. Remove "Coming Soon" or maintenance mode
2. Test a real purchase (you can refund it)
3. Monitor for 24 hours
4. Promote your store!

---

## Troubleshooting

### Products Not Showing
- Check if products are published
- Check WooCommerce → Settings → Products → Display
- Clear cache

### Add to Cart Not Working
- Check if jQuery is loaded
- Check browser console for JavaScript errors
- Ensure WooCommerce scripts are enqueued

### Styling Issues
- Clear browser cache
- Check if CSS is properly loaded
- Use browser inspector to debug

### Payment Issues
- Verify payment gateway API keys
- Check SSL certificate
- Test in test/sandbox mode first

---

## Additional Customizations

### Custom Header with Cart Icon
Add to your `header.php` or use a hook:

```php
<a href="<?php echo esc_url(wc_get_cart_url()); ?>" class="cart-icon">
    <svg><!-- Cart SVG --></svg>
    <span class="cart-count"><?php echo WC()->cart->get_cart_contents_count(); ?></span>
</a>
```

### Custom Product Badges
```php
// Show "New" badge for products added in last 30 days
add_action('woocommerce_before_shop_loop_item_title', function() {
    global $product;
    $newness_days = 30;
    $created = strtotime($product->get_date_created());
    
    if ((time() - $created) < ($newness_days * DAY_IN_SECONDS)) {
        echo '<span class="product-badge">New</span>';
    }
}, 10);
```

---

## Support Resources

- **WooCommerce Documentation**: https://woocommerce.com/documentation/
- **WordPress Codex**: https://codex.wordpress.org/
- **WooCommerce Support Forum**: https://wordpress.org/support/plugin/woocommerce/

---

## Summary

You now have a fully functional, beautifully designed WooCommerce store! The template files maintain your custom HTML design while integrating seamlessly with WooCommerce's powerful e-commerce features.

**Key Files Created:**
1. `woocommerce-shop-template.php` - Custom shop page
2. `woocommerce-single-product-template.php` - Custom product pages
3. This guide for reference

**Next Steps:**
- Add more products
- Set up marketing (email, social media)
- Install analytics (Google Analytics)
- Add SEO optimization (Yoast SEO)
- Consider upsells and cross-sells
