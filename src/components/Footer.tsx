import { Link } from "react-router-dom";
import logoImg from "/images/logo.webp";

const Footer = () => (
  <footer className="border-t bg-navy text-navy-foreground">
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoImg} alt="Logo" className="h-10 w-10 rounded-full" />
            <span className="font-display text-lg font-bold text-primary-foreground">
              NASS OOU Research Club
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Advancing knowledge through collaborative research at Olabisi Onabanjo University.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-primary mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/journals", label: "Journals" },
              { to: "/newsletters", label: "Newsletters" },
              { to: "/resources", label: "Resources" },
              { to: "/publish", label: "Publish" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold text-primary mb-4">Contact</h4>
          <p className="text-sm text-muted-foreground">Olabisi Onabanjo University</p>
          <p className="text-sm text-muted-foreground">Ago-Iwoye, Ogun State, Nigeria</p>
        </div>
      </div>
      <div className="mt-8 border-t border-muted-foreground/20 pt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NASS OOU Research Club. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
