import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/templates", label: "Templates" },
  { to: "/pdfs", label: "PDFs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-tight text-foreground">
            Digital<span className="text-accent">Nest</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-body font-medium transition-colors hover:text-accent ${
                location.pathname === link.to ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/cart"
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={18} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-body font-bold min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

        </div>

        {/* Mobile toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/cart"
            className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-body font-bold min-w-[18px] min-h-[18px] flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {user && (
            <Avatar className="w-7 h-7">
              <AvatarImage src={profile?.profile_image || undefined} />
              <AvatarFallback className="bg-accent text-accent-foreground text-[10px] font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          )}

          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block text-sm font-body font-medium py-1 ${
                location.pathname === link.to ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-border pt-3 mt-3 space-y-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 py-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={profile?.profile_image || undefined} />
                    <AvatarFallback className="bg-accent text-accent-foreground text-[9px] font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-body text-foreground truncate">{profile?.name || user.email}</span>
                </div>
                <button
                  onClick={() => { setOpen(false); signOut(); }}
                  className="text-sm font-body text-destructive py-1"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="block text-sm font-body font-medium text-muted-foreground py-1">
                  Sign in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="block text-sm font-body font-medium text-accent py-1">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
