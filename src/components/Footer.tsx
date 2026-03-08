import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary py-12">
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="font-display text-lg font-bold text-foreground mb-3">DigiShelf</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Premium digital products crafted to help you learn, grow, and succeed.
        </p>
      </div>
      <div>
        <h4 className="font-body text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Navigate</h4>
        <div className="space-y-2">
          {["/products", "/about", "/blog", "/contact"].map((path) => (
            <Link key={path} to={path} className="block text-sm text-muted-foreground hover:text-accent transition-colors">
              {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-body text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">Stay Connected</h4>
        <p className="text-sm text-muted-foreground">Follow us on social media for tips and new releases.</p>
        <div className="flex gap-4 mt-3">
          {["Twitter", "Instagram", "LinkedIn"].map((s) => (
            <span key={s} className="text-xs text-muted-foreground hover:text-accent cursor-pointer transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="container mt-8 pt-6 border-t border-border">
      <p className="text-xs text-muted-foreground text-center">© 2026 DigiShelf. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
