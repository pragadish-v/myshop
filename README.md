# 🛍️ MyShop - Premium E-Commerce Landing Page

A modern, fully responsive e-commerce landing page built with HTML5, CSS3, Bootstrap 5, and JavaScript. Features a sleek gradient design, interactive product showcase, and smooth user experience.

## 🌐 Live Demo

**[View Live Site](https://pragadish-v.github.io/myshop/)**

## ✨ Features

- **Modern UI/UX Design** - Eye-catching gradient backgrounds with smooth animations
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Interactive Product Cards** - Hover effects and quick view modals
- **Dark Mode Toggle** - User preference for light/dark themes
- **Shopping Cart System** - Add to cart and wishlist functionality
- **Product Search** - Real-time search with autocomplete
- **Smooth Animations** - CSS animations and transitions throughout
- **Bootstrap Framework** - Clean, mobile-first responsive design
- **Particle Effects** - Animated background particles for visual appeal

## 🛠️ Technologies Used

- **HTML5** - Semantic markup and structure
- **CSS3** - Custom styling, animations, and gradients
- **Bootstrap 5** - Responsive grid system and components
- **JavaScript (ES6)** - Interactive functionality and DOM manipulation
- **Font Awesome** - Icon library for UI elements

## 📂 Project Structure

```
myshop/
│
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── main.js             # JavaScript functionality
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of HTML, CSS, and JavaScript (optional for customization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pragadish-v/myshop.git
   ```

2. **Navigate to project directory**
   ```bash
   cd myshop
   ```

3. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local development server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (with http-server)
     npx http-server
     ```

4. **View the site**
   - Open your browser and go to `http://localhost:8000`

## 💡 Usage

### Customization

#### Changing Colors
Edit the CSS variables in `style.css`:
```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --text-color: #333;
}
```

#### Adding Products
Modify the product data in `main.js`:
```javascript
const products = [
  {
    id: 1,
    name: "Product Name",
    price: 99.99,
    image: "product-image.jpg",
    description: "Product description"
  }
];
```

## 📱 Screenshots

*Coming soon - Add screenshots of your website here*

## 🎯 Key Functionalities

1. **Product Browsing** - Browse through featured and trending products
2. **Add to Cart** - Add items to shopping cart with quantity selection
3. **Wishlist** - Save favorite items for later
4. **Dark Mode** - Toggle between light and dark themes
5. **Responsive Navigation** - Mobile-friendly hamburger menu
6. **Search** - Find products quickly with search functionality

## 🌟 Future Enhancements

- [ ] Backend integration with Node.js/Express
- [ ] Database connectivity (MongoDB/MySQL)
- [ ] User authentication and accounts
- [ ] Payment gateway integration
- [ ] Product filtering and sorting
- [ ] Customer reviews and ratings
- [ ] Order tracking system
- [ ] Admin dashboard

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Pragadish V**
- GitHub: [@pragadish-v](https://github.com/pragadish-v)
- Project Link: [https://github.com/pragadish-v/myshop](https://github.com/pragadish-v/myshop)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## ⭐ Show your support

Give a ⭐️ if you like this project!

## 📝 Acknowledgments

- Bootstrap team for the amazing framework
- Font Awesome for the icon library
- Inspiration from various e-commerce platforms

---

**Note:** This is a frontend-only project. Backend functionality would need to be implemented separately for a fully functional e-commerce store.
