import { ShoppingBag, UserRound } from "lucide-react";

export default function Header() {
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="brand-text site-logo" href="/" aria-label="SURO home">
        SURO
      </a>

      <nav className="site-nav" aria-label="Main menu">
        <a href="#products">Products</a>
        <a href="#learn-more">Learn More</a>
        <a href="#software">Software</a>
        <a href="#help">Help</a>
      </nav>

      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Open cart">
          <ShoppingBag size={20} strokeWidth={1.8} />
        </button>
        <button className="icon-button" type="button" aria-label="Open profile">
          <UserRound size={20} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
