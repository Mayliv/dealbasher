
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">DealSeeker</h3>
            <p className="text-sm text-muted-foreground">
              Find the best deals, discounts, and promotions from around the web, shared by our community of deal hunters.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Electronics</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Fashion</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Home & Garden</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Gaming</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Beauty</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">How It Works</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Posting Guidelines</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Contact Us</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Facebook</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Twitter</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Instagram</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Telegram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DealSeeker. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Privacy Policy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Terms of Service</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-deal-red">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
