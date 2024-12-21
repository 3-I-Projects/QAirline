import React from 'react';
import '../style/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2024 QuanAirline. All rights reserved.</p>
                <nav className="footer-nav">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </nav>
                <div className="footer-newsletter">
                    <p>Subscribe to our newsletter:</p>
                    <form>
                        <input className="input-item" type="email" placeholder="Enter your email" />
                        <button type="submit">Subscribe</button>
                    </form>
                </div>
            </div>
        </footer>
    );
};

export default Footer;