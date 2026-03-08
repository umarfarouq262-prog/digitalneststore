import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-primary py-12">
    <div className="container grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="font-display text-lg font-bold text-primary-foreground mb-3">
          Digital<span className="text-accent">Nest</span>
        </h3>
        <p className="text-sm text-primary-foreground/60 leading-relaxed">
          Your one-stop shop for PDFs, courses, templates & more.
        </p>
      </div>
      <div>
        <h4 className="font-body text-xs font-semibold text-primary-foreground/80 mb-3 uppercase tracking-wider">Products</h4>
        <div className="space-y-2">
          {[
            { to: "/courses", label: "Courses" },
            { to: "/templates", label: "Templates" },
            { to: "/pdfs", label: "PDFs" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="block text-sm text-primary-foreground/50 hover:text-accent transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-body text-xs font-semibold text-primary-foreground/80 mb-3 uppercase tracking-wider">Company</h4>
        <div className="space-y-2">
          {[
            { to: "/about", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
          ].map((link) => (
            <Link key={link.to} to={link.to} className="block text-sm text-primary-foreground/50 hover:text-accent transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-body text-xs font-semibold text-primary-foreground/80 mb-3 uppercase tracking-wider">Stay Connected</h4>
        <p className="text-sm text-primary-foreground/50">Follow us for tips and new releases.</p>
        <div className="flex gap-4 mt-3">
          {["Twitter", "Instagram", "YouTube"].map((s) => (
            <span key={s} className="text-xs text-primary-foreground/40 hover:text-accent cursor-pointer transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </div>
    <div className="container mt-8 pt-6 border-t border-primary-foreground/10">
      <p className="text-xs text-primary-foreground/30 text-center">© 2026 DigitalNest. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
