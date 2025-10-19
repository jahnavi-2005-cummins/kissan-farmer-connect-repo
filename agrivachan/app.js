import React, { useState, useEffect, useRef } from "react";
import "./style.css";

// Product Data
const products = [
  { name: "Bhendi", price: 17, oldPrice: 30, city: "Mumbai", tag: "Kisan Special", img: "/bhendi.jpg" },
  { name: "Palak", price: 19, oldPrice: 30, city: "Pune", tag: "Kisan Special", img: "/palak.jpg" },
  { name: "Mango", price: 129, oldPrice: 200, city: "Nagpur", tag: "Holi Special", img: "/mango.jpeg" },
  { name: "Grapes Red Flame", price: 75, oldPrice: 110, city: "Nashik", tag: "Kisan Special", img: "/grapes.jpg" },
  { name: "Banana", price: 45, oldPrice: 60, city: "Kochi", tag: "Fresh Fruit", img: "/banana.jpeg" },
  { name: "Apple", price: 99, oldPrice: 150, city: "Shimla", tag: "Winter Special", img: "/apple.jpg" },
  { name: "Orange", price: 85, oldPrice: 120, city: "Nagpur", tag: "Seasonal Special", img: "/orange.jpg" },
];

const mainImages = ["/pic1.png", "/pic2.png", "/pic3.png", "/pic4.png"];

function App() {
  const [showPopup, setShowPopup] = useState(!localStorage.getItem("userLocation"));
  const [location, setLocation] = useState(localStorage.getItem("userLocation") || "");
  const [mainIndex, setMainIndex] = useState(0);
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const productCarouselRef = useRef(null);

  // Auto-slide main carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % mainImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll product carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const carousel = productCarouselRef.current;
      if (carousel && carousel.firstChild) {
        const cardWidth = carousel.firstChild.offsetWidth;
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0;
        } else {
          carousel.scrollLeft += cardWidth;
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Save cart in localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Location popup
  const saveLocation = () => {
    if (location) {
      localStorage.setItem("userLocation", location);
      setShowPopup(false);
    } else {
      alert("Please select a location!");
    }
  };

  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find((item) => item.name === product.name);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (product) => {
    setCart(cart.filter((item) => item.name !== product.name));
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><img src="/logo.jpeg" alt="Logo" /></div>
        <button className="chat-ai-btn">Chat With AI</button>
        <div className="search-bar">
          <input type="text" placeholder="Search for Product" />
          <button><i className="fa fa-search"></i></button>
        </div>
        <div className="nav-links">
          <button>Track Order</button>
          <button onClick={() => setShowPopup(true)}>Change Location</button>
          <button><i className="fa fa-shopping-cart"></i> My Cart ({cart.length})</button>
          <select id="language-select" onChange={(e) => console.log(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="bn">Bengali</option>
          </select>
          <button>Login/Register</button>
        </div>
      </nav>

      {/* Location Popup */}
      {showPopup && (
        <div className="location-popup-overlay">
          <div id="location-popup">
            <button className="close-btn" onClick={() => setShowPopup(false)}>×</button>
            <h2>Select Your Location</h2>
            <p>Please select your location to get personalized recommendations.</p>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">-- Select Location --</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
            </select>
            <button className="save-btn" onClick={saveLocation}>Save</button>
          </div>
        </div>
      )}

      {/* Main Carousel */}
      <div className="carousel">
        <div
          className="carousel-images"
          style={{ transform: `translateX(-${mainIndex * 100}vw)` }}
        >
          {mainImages.map((img, idx) => (
            <img src={img} className="carousel-item" key={idx} alt={`Slide ${idx}`} />
          ))}
        </div>
      </div>

      {/* Product Carousel */}
      <div className="product-carousel-container">
        <div className="product-carousel" ref={productCarouselRef}>
          {products.map((product) => (
            <div className="product-card" key={product.name}>
              <img src={product.img} alt={product.name} />
              <div className={`tag ${product.tag.includes("Special") ? "green" : "yellow"}`}>{product.tag}</div>
              <div className="price"><span className="old-price">₹{product.oldPrice}</span> ₹{product.price}</div>
              <div className="product-name">{product.name}</div>
              <div className="min-order">Min Order: 100kg</div>
              <div className="city">City: {product.city}</div>
              <button className="save-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Section */}
      <div className="cart">
        <h2>My Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item) => (
            <div key={item.name} className="cart-item">
              {item.name} - ₹{item.price} x {item.quantity}{" "}
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src="/logo.jpeg" alt="Logo" className="footer-logo" />
            <ul className="footer-menu">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
            </ul>
          </div>
          <div className="footer-center">
            <h3>CONTACTS</h3>
            <p><strong>AgriVachan Corporate Office</strong></p>
            <p>Plot no. C-10, TTC Industrial Estate, MIDC, Pawne, Navi Mumbai, Maharashtra - 400705</p>
            <p>1800 267 0993</p>
            <p>customercare@agrivachan.in</p>
          </div>
          <div className="footer-right">
            <div className="social-links">
              <a href="#"><img src="/faceook.png" alt="Facebook" /></a>
              <a href="#"><img src="/insta.jpeg" alt="Instagram" /></a>
              <a href="#"><img src="/twitter.png" alt="Twitter" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025, Agrivachan | <a href="#">Privacy Policy</a> | <a href="#">Sitemap</a> | <a href="#">Terms & Conditions</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
