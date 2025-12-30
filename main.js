    <script>
        // ===== ADVANCED PARALLAX =====
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.scrollY;
                    const parallaxSpeed1 = scrolled * 0.5;
                    const parallaxSpeed2 = scrolled * 0.3;
                    const parallaxSpeed3 = scrolled * 0.7;

                    document.getElementById('heroBg1').style.transform = `translateY(${parallaxSpeed1}px) scale(1.1)`;
                    document.getElementById('heroBg2').style.transform = `translateY(${parallaxSpeed2}px)`;
                    document.getElementById('heroBg3').style.transform = `translateY(${parallaxSpeed3}px)`;

                    ticking = false;
                });
                ticking = true;
            }
        });

        // Hero stats animation
        function animateHeroStats() {
            animateCounter('heroStat1', 50000, 1500);
            animateCounter('heroStat2', 100000, 1500);
        }

        // Typewriter effect for title
        function typeWriter(element, text, speed = 10) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize hero
        document.addEventListener('DOMContentLoaded', () => {
            typeWriter(document.querySelector('.hero-subtitle'), 'Premium Shopping Experience', 80);
            setTimeout(animateHeroStats, 1000);
        });


        // ===== SCROLL ANIMATION =====
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-animate, .scroll-left, .scroll-right, .scale-animate').forEach(el => {
            observer.observe(el);
        });

        // ===== ANIMATED COUNTER =====
        function animateCounter(elementId, target, duration = 2000) {
            const element = document.getElementById(elementId);
            if (!element) return;

            const start = 0;
            const startTime = Date.now();

            function update() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(start + (target - start) * progress);
                element.textContent = value.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }

            update();
        }

        // Trigger counters when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter('stat1', 50000);
                    animateCounter('stat2', 100000);
                    animateCounter('stat3', 10000);
                    animateCounter('stat4', 5);
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // ===== FEATURED CAROUSEL =====
        const carouselItems = [
            {
                id: 1,
                name: 'Premium Wireless Headphones',
                price: '₹4,999',
                desc: 'High-quality sound with noise cancellation',
                image: 'assets/img/1mainheadset.jpg'
            },
            {
                id: 4,
                name: 'Trendy T-Shirt Collection',
                price: '₹799',
                desc: 'Comfortable cotton blend for everyday wear',
                image: 'assets/img/4t.jpg'
            },
            {
                id: 2,
                name: "Smart Watch Pro",
                price: '₹9,999',
                image: "assets/img/2mainwatch.jpg",
                description: "Advanced smartwatch with fitness tracking",
            }
        ];

        let currentCarouselIndex = 0;
        let carouselTimer = null;
        const CAROUSEL_INTERVAL = 4000;

        function updateCarousel() {
            const item = carouselItems[currentCarouselIndex];

            document.getElementById('carouselImage').src = item.image;
            document.getElementById('carouselName').textContent = item.name;
            document.getElementById('carouselDesc').textContent = item.desc;
            document.getElementById('carouselPrice').textContent = item.price;
            document.getElementById('carouselIndex').textContent = currentCarouselIndex + 1;
            document.getElementById('carouselTotal').textContent = carouselItems.length;

            const display = document.getElementById('carouselDisplay');
            display.style.animation = 'none';
            void display.offsetWidth;
            display.style.animation = 'fadeIn 0.5s ease';
        }

        function carouselNext() {
            currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
            updateCarousel();
            resetCarouselTimer();
        }

        function carouselPrev() {
            currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
            updateCarousel();
            resetCarouselTimer();
        }

        function startCarouselAutoSlide() {
            if (carouselTimer) clearInterval(carouselTimer);
            carouselTimer = setInterval(carouselNext, CAROUSEL_INTERVAL);
        }

        function resetCarouselTimer() {
            startCarouselAutoSlide();
        }

        function addCarouselToCart() {
            const item = carouselItems[currentCarouselIndex];
            const product = products.find(p => p.id === item.id);
            if (product) {
                addToCart(product.id);
            } else {
                alert(`Added "${item.name}" to cart!`);
            }
        }

        // hook into existing DOMContentLoaded
        document.addEventListener('DOMContentLoaded', () => {
            updateCarousel();
            startCarouselAutoSlide();
        }, { once: true });



        // ===== PRODUCT DATABASE WITH SIZES & REVIEWS =====
        const products = [
            {
                id: 1,
                name: "Premium Wireless Headphones",
                price: 4999,
                originalPrice: 7999,
                category: "electronics",
                image: "assets/img/1mainheadset.jpg",
                description: "High-quality wireless headphones with noise cancellation",
                longDescription: "Experience premium sound with our wireless headphones. Features active noise cancellation, 30-hour battery life, and premium comfort design. Perfect for music lovers and professionals.",
                rating: 4.5,
                reviews: 234,
                sizes: ["One Size"],
                colors: ["Black", "Silver", "Blue"],
                specs: {
                    "Driver Size": "40mm",
                    "Frequency": "20Hz - 20kHz",
                    "Battery": "30 Hours",
                    "Weight": "250g"
                },
                customerReviews: [
                    { author: "Raj Kumar", rating: 5, text: "Excellent sound quality and very comfortable!" },
                    { author: "Priya Singh", rating: 4, text: "Great product, battery lasts long" },
                    { author: "Amit Patel", rating: 5, text: "Best headphones I've bought!" }
                ],
                gallery: [
                    "assets/img/1blackhs.jpg",
                    "assets/img/1silverhs.jpg",
                    "assets/img/1bluehs.jpg",
                ]
            },
            {
                id: 2,
                name: "Smart Watch Pro",
                price: 9999,
                originalPrice: 14999,
                category: "electronics",
                image: "assets/img/2mainwatch.jpg",
                description: "Advanced smartwatch with fitness tracking",
                longDescription: "Monitor your health with our Smart Watch Pro. Track heart rate, sleep, steps, and calories. Water-resistant design with vibrant AMOLED display.",
                rating: 4.7,
                reviews: 456,
                sizes: ["Small", "Medium", "Large"],
                colors: ["Blue", "Silver", "Rose Gold"],
                specs: {
                    "Display": "1.4 inch AMOLED",
                    "Battery": "14 Days",
                    "Water Resistance": "5ATM",
                    "Weight": "42g"
                },
                customerReviews: [
                    { author: "Amit Patel", rating: 5, text: "Perfect smartwatch! Battery life is amazing." },
                    { author: "Neha Sharma", rating: 5, text: "Love the display and features." }
                ],
                gallery: [
                    "assets/img/2bluewatch.jpg",
                    "assets/img/2silverwatch.jpg",
                    "assets/img/2rosegoldwatch.jpg",
                ]
            },
            {
                id: 3,
                name: "4K Webcam",
                price: 5499,
                originalPrice: 8499,
                category: "electronics",
                image: "assets/img/3webcams.jpg",
                description: "Professional 4K webcam for streaming and calls",
                longDescription: "Crystal clear 4K video quality for professional streaming. Auto-focus technology and built-in noise-cancelling microphone.",
                rating: 4.4,
                reviews: 189,
                sizes: ["One Size"],
                colors: ["Black"],
                specs: {
                    "Resolution": "4K @ 30fps",
                    "Lens": "90° Wide",
                    "Microphone": "Built-in Stereo",
                    "Connection": "USB 3.0"
                },
                customerReviews: [
                    { author: "Developer Mike", rating: 5, text: "Perfect for video calls and streaming!" }
                ],
                gallery: [
                    "assets/img/3webcam1.jpg",
                    "assets/img/3webcam2.jpg"
                ]
            },
            {
                id: 4,
                name: "Stylish Casuals",
                price: 799,
                originalPrice: 1299,
                category: "fashion",
                image: "assets/img/4t.jpg",
                description: "Comfortable casual t-shirt for everyday wear",
                longDescription: "Made from 100% organic cotton, this t-shirt is perfect for any casual occasion. Available in multiple colors and sizes.",
                rating: 4.3,
                reviews: 567,
                sizes: ["XS", "S", "M", "L", "XL", "XXL"],
                colors: ["Black", "White", "Blue", "Red"],
                specs: {
                    "Material": "100% Organic Cotton",
                    "Fit": "Regular",
                    "Care": "Machine Wash",
                    "Available Sizes": "XS - XXL"
                },
                customerReviews: [
                    { author: "Ananya Gupta", rating: 5, text: "Very comfortable and good quality!" },
                    { author: "Rohan Singh", rating: 4, text: "Great fit and color." }
                ],
                gallery: [
                    "assets/img/4t1.jpg",
                    "assets/img/4t2.jpg",
                    "assets/img/4t3.jpg",
                ]
            },
            {
                id: 5,
                name: "Premium Sunglasses",
                price: 1599,
                originalPrice: 2999,
                category: "fashion",
                image: "assets/img/5s.jpg",
                description: "UV protection sunglasses with polarized lenses",
                longDescription: "Stylish sunglasses with 100% UV protection and polarized lenses. Reduces glare and protects your eyes from harmful rays.",
                rating: 4.1,
                reviews: 234,
                sizes: ["One Size"],
                colors: ["Black", "Brown", "Gray", "Blue Tint"],
                specs: {
                    "UV Protection": "100% UVA/UVB",
                    "Lens Type": "Polarized",
                    "Material": "Metal Frame",
                    "Style": "Wayfarer"
                },
                customerReviews: [
                    { author: "Rohan", rating: 5, text: "Perfect for sunny days!" },
                    { author: "Priya", rating: 4, text: "Good quality and stylish" }
                ]
            },
            {
                id: 6,
                name: "Running Shoes",
                price: 2499,
                originalPrice: 4999,
                category: "fashion",
                image: "assets/img/6nikes.jpg",
                description: "Professional running shoes with cushioning",
                longDescription: "Engineered for performance with advanced cushioning technology. Perfect for running, jogging, or casual wear.",
                rating: 4.8,
                reviews: 678,
                sizes: ["5", "6", "7", "8", "9", "10", "11", "12", "13"],
                colors: ["Black", "White", "Blue"],
                specs: {
                    "Material": "Mesh + Synthetic",
                    "Cushioning": "Memory Foam",
                    "Weight": "280g per shoe",
                    "Available Sizes": "5 - 13"
                },
                customerReviews: [
                    { author: "Fitness Guru", rating: 5, text: "Best running shoes ever!" },
                    { author: "Athletic Pro", rating: 5, text: "Extremely comfortable for long runs." }
                ],
                gallery: [
                    "assets/img/6whitenike.jpg",
                    "assets/img/6bluenike.jpg",
                    "assets/img/6blacknike.jpg"

                ]
            },
            {
                id: 7,
                name: "Coffee Maker",
                price: 3499,
                originalPrice: 5999,
                category: "home",
                image: "assets/img/7c.jpg",
                description: "Automatic coffee maker for perfect brew",
                longDescription: "Brew perfect coffee every time with our automatic coffee maker. Programmable timer and keep-warm function.",
                rating: 4.6,
                reviews: 456,
                sizes: ["One Size"],
                colors: ["Black", "Stainless Steel"],
                specs: {
                    "Capacity": "1.2L",
                    "Power": "1000W",
                    "Features": "Programmable, Auto Keep Warm",
                    "Material": "Glass + Stainless Steel"
                },
                customerReviews: [
                    { author: "Coffee Lover", rating: 5, text: "Makes the best coffee!" }
                ],
                gallery: [
                    "assets/img/7c1.jpg",
                    "assets/img/7c2.jpg"
                ]
            },
            {
                id: 8,
                name: "Plant Pot Set",
                price: 699,
                originalPrice: 1299,
                category: "home",
                image: "assets/img/8pp.jpg",
                description: "Decorative ceramic plant pot set",
                longDescription: "Beautiful ceramic plant pots in different sizes. Perfect for indoor plants and home decoration.",
                rating: 4.4,
                reviews: 189,
                sizes: ["One Size"],
                colors: ["White", "Terracotta", "Gray"],
                specs: {
                    "Material": "Ceramic",
                    "Included": "3 Pots",
                    "Drainage": "Bottom Hole",
                    "Style": "Modern Minimalist"
                },
                customerReviews: [
                    { author: "Plant Parent", rating: 5, text: "Beautiful pots for my plants!" }
                ],
                gallery: [
                    "assets/img/8pp1.jpg",
                    "assets/img/8pp2.jpg"
                ]
            }
        ];

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        let currentFilter = 'all';
        let currentSort = 'default';
        let appliedPromo = null;

        // ===== THEME TOGGLE =====
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            document.getElementById('themeToggle').innerHTML = newTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }

        // Load theme on page load
        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme') || 'light';
            document.documentElement.setAttribute('data-theme', savedTheme);
            if (savedTheme === 'dark') {
                document.getElementById('themeToggle').innerHTML = '<i class="fas fa-sun"></i>';
            }
            renderProducts();
            updateCarousel();
            updateCartUI();
            updateWishlistUI();
        });

        // ===== FILTER & SORT =====
        function filterByCategory(category) {
            currentFilter = category;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderProducts();
        }

        function sortProducts(type) {
            currentSort = type;
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            renderProducts();
        }

        // ===== RENDER PRODUCTS =====
        function renderProducts() {
            let filtered = currentFilter === 'all' ? [...products] : products.filter(p => p.category === currentFilter);

            if (currentSort === 'price-low') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (currentSort === 'price-high') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (currentSort === 'rating') {
                filtered.sort((a, b) => b.rating - a.rating);
            }

            const container = document.getElementById('products-grid');
            container.innerHTML = filtered.map(product => `
                <div class="product-card scroll-animate">
                    <div class="product-image-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-image">
                        <span class="product-badge">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>
                    </div>
                    <div class="product-body">
                        <h6 class="product-name" onclick="openProductModal(${product.id})">
                            ${product.name}
                        </h6>
                        <div class="product-rating">
                            <span>${'⭐'.repeat(Math.floor(product.rating))} ${product.rating}</span>
                            <span>(${product.reviews} reviews)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">₹${product.price}</span>
                            <span class="original-price">₹${product.originalPrice}</span>
                        </div>
                        <div class="product-actions">
                            <button class="btn-small btn-primary-small" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> Add
                            </button>
                            <button class="btn-small btn-secondary-small" onclick="toggleWishlistItem(${product.id})">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="btn-small btn-primary-small" onclick="openProductModal(${product.id})">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.scroll-animate').forEach(el => {
                observer.observe(el);
            });
        }
        // ===== CART FUNCTIONS =====
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1, selectedSize: product.sizes[0], selectedColor: product.colors[0] });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            showToast(`✓ Added ${product.name} to cart!`);
        }

        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }

        function updateQuantity(productId, change) {
            const item = cart.find(i => i.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) removeFromCart(productId);
                else localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
            }
        }

        function updateCartUI() {
            const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            document.getElementById('cartCount').textContent = cartCount;

            const cartList = document.getElementById('cartItemsList');
            if (cart.length === 0) {
                cartList.innerHTML = '<p style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">Your cart is empty</p>';
                updateCartSummary(); // also reset summary when empty
                return;
            }

            cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price}</div>
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
                </div>
            </div>
        </div>
    `).join('');

            updateCartSummary();
        }

        function updateCartSummary() {
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const regularDiscount = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);

            // Support both percentage and fixed promos
            let promoDiscount = 0;
            if (appliedPromo) {
                if (appliedPromo.percentage) {
                    promoDiscount = subtotal * (appliedPromo.percentage / 100);
                } else if (appliedPromo.fixed) {
                    promoDiscount = appliedPromo.fixed;
                }
            }

            const total = Math.max(0, subtotal - regularDiscount - promoDiscount);

            document.getElementById('subtotal').textContent = `₹${subtotal}`;
            document.getElementById('discount').textContent = `-₹${regularDiscount}`;
            document.getElementById('promoDiscount').textContent = `-₹${Math.round(promoDiscount)}`;
            document.getElementById('cartTotal').textContent = `₹${Math.round(total)}`;
        }

        function clearCart() {
            if (confirm('Clear entire cart?')) {
                cart = [];
                appliedPromo = null;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                showToast('Cart cleared!');
            }
        }

        function checkout() {
            if (cart.length === 0) {
                showToast('Add items to cart first!');
                return;
            }
            const orderId = 'ORD-' + Date.now();
            showToast(`✓ Order placed! Order ID: ${orderId}`);
            setTimeout(() => {
                cart = [];
                appliedPromo = null;
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartUI();
                toggleCart();
            }, 1500);
        }


        // ===== WISHLIST FUNCTIONS =====
        function toggleWishlistItem(productId) {
            const product = products.find(p => p.id === productId);
            const index = wishlist.findIndex(item => item.id === productId);

            if (index > -1) {
                wishlist.splice(index, 1);
                showToast(`Removed from wishlist!`);
            } else {
                wishlist.push(product);
                showToast(`✓ Added to wishlist!`);
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            updateWishlistUI();
        }

        function updateWishlistUI() {
            const wishlistCount = wishlist.length;
            document.getElementById('wishlistCount').textContent = wishlistCount;

            const wishlistList = document.getElementById('wishlistItems');
            if (wishlist.length === 0) {
                wishlistList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 20px;">Your wishlist is empty</p>';
                return;
            }

            wishlistList.innerHTML = wishlist.map(item => `
                <div class="wishlist-item">
                    <img src="${item.image}" alt="${item.name}" class="wishlist-item-image">
                    <div class="wishlist-item-info">
                        <div class="wishlist-item-name">${item.name}</div>
                        <div class="wishlist-item-price">₹${item.price}</div>
                        <button class="btn btn-sm btn-primary" onclick="addToCart(${item.id})" style="width: 100%; margin-top: 8px;">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // ===== MODAL FUNCTIONS =====
        function openProductModal(productId) {
            const product = products.find(p => p.id === productId);
            if (!product) return;

            document.getElementById('detailName').textContent = product.name;
            document.getElementById('detailRating').innerHTML = '⭐'.repeat(Math.floor(product.rating));
            document.getElementById('detailReviews').textContent = `${product.reviews} reviews`;
            document.getElementById('detailCurrentPrice').textContent = `₹${product.price}`;
            document.getElementById('detailOriginalPrice').textContent = `₹${product.originalPrice}`;
            document.getElementById('detailDiscount').textContent = `${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF`;
            document.getElementById('mainImage').src = product.image;
            document.getElementById('descriptionText').textContent = product.longDescription;

            // Sizes
            document.getElementById('sizeOptions').innerHTML = product.sizes.map(size => `
                <button class="size-btn active" onclick="this.parentElement.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active')); this.classList.add('active');">
                    ${size}
                </button>
            `).join('');

            // Colors
            const colorMap = { 'Black': '#000', 'Silver': '#c0c0c0', 'Blue': '#0000ff', 'Red': '#ff0000', 'Green': '#008000', 'Gold': '#ffd700', 'White': '#fff', 'Gray': '#808080', 'Brown': '#a52a2a', 'Blue Tint': '#1e90ff', 'Copper': '#b87333', 'Rose Gold': '#f64a8a', 'Gray': '#808080' };
            document.getElementById('colorOptions').innerHTML = product.colors.map(color => `
                <button class="color-circle active" style="background: ${colorMap[color] || '#ccc'}; border-color: ${colorMap[color] || '#ccc'};" title="${color}" onclick="this.parentElement.querySelectorAll('.color-circle').forEach(c => c.classList.remove('active')); this.classList.add('active');"></button>
            `).join('');

            // Specs
            document.getElementById('specsGrid').innerHTML = Object.entries(product.specs).map(([key, value]) => `
                <div class="spec-item">
                    <div class="spec-label">${key}</div>
                    <div class="spec-value">${value}</div>
                </div>
            `).join('');

            // Reviews
            document.getElementById('reviewsList').innerHTML = product.customerReviews.map(review => `
                <div class="review-item">
                    <div class="review-header">
                        <span class="review-author">${review.author}</span>
                        <span class="review-rating">${'⭐'.repeat(review.rating)}</span>
                    </div>
                    <div class="review-text">${review.text}</div>
                </div>
            `).join('');

            document.getElementById('productDetailModal').classList.add('active');
            document.getElementById('overlay').classList.add('active');
        }

        function closeProductModal() {
            document.getElementById('productDetailModal').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        }

        function addToCartFromModal() {
            const productName = document.getElementById('detailName').textContent;
            const product = products.find(p => p.name === productName);
            if (product) {
                addToCart(product.id);
            }
        }

        function addToWishlistFromModal() {
            const productName = document.getElementById('detailName').textContent;
            const product = products.find(p => p.name === productName);
            if (product) {
                const alreadyInWishlist = wishlist.some(item => item.id === product.id);
                if (!alreadyInWishlist) {
                    toggleWishlistItem(product.id);
                }
            }
        }

        // ===== MODAL TOGGLE =====
        function toggleCart() {
            document.getElementById('cartModal').classList.toggle('active');
            document.getElementById('overlay').classList.toggle('active');
        }

        function toggleWishlist() {
            document.getElementById('wishlistModal').classList.toggle('active');
            document.getElementById('overlay').classList.toggle('active');
        }

        function toggleAccount() {
            showToast('Login feature coming soon!');
        }

        function closeAllModals() {
            document.getElementById('cartModal').classList.remove('active');
            document.getElementById('wishlistModal').classList.remove('active');
            document.getElementById('productDetailModal').classList.remove('active');
            document.getElementById('overlay').classList.remove('active');
        }

        // ===== TOAST NOTIFICATION =====
        function showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3000);
        }

        // ===== PROMO CODE =====
        window.applyPromo = function () {
            const code = document.getElementById('promoCode').value.toUpperCase();
            const promoCodes = {
                'SAVE10': { percentage: 10 },
                'SAVE500': { fixed: 500 },
                'SUMMER20': { percentage: 20 },
                'WELCOME': { fixed: 1000 }
            };

            if (promoCodes[code]) {
                appliedPromo = promoCodes[code];
                document.getElementById('promoMessage').textContent = '✓ Promo code applied successfully!';
                document.getElementById('promoMessage').style.color = 'var(--secondary-color)';
                updateCartSummary();
                showToast(`✓ Promo "${code}" applied!`);
            } else {
                document.getElementById('promoMessage').textContent = '✗ Invalid promo code';
                document.getElementById('promoMessage').style.color = 'var(--danger-color)';
                showToast('Invalid promo code!');
            }
        }

        function copyPromoCode() {
            const code = 'WELCOME';
            navigator.clipboard.writeText(code).then(() => {
                showToast('✓ Promo code copied: ' + code);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast('✓ Promo code copied: ' + code);
            });
        }
        function scrollToSection(sectionId) {
            const el = document.getElementById(sectionId);
            if (!el) return;

            const navbar = document.querySelector('.navbar');
            const offset = navbar ? navbar.offsetHeight : 0;

            const top = el.getBoundingClientRect().top + window.scrollY - offset - 10;

            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }

    </script>