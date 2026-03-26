import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { BookOpen, Upload, Newspaper, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoImg from "/images/logo.webp";

const features = [
  {
    icon: BookOpen,
    title: "Research Journals",
    description: "Access peer-reviewed research papers and academic journals published by club members.",
    link: "/journals",
  },
  {
    icon: Newspaper,
    title: "Newsletters",
    description: "Stay updated with the latest club activities, events, and research breakthroughs.",
    link: "/newsletters",
  },
  {
    icon: Library,
    title: "Resource Library",
    description: "Browse curated academic materials, reference guides, and study resources.",
    link: "/resources",
  },
  {
    icon: Upload,
    title: "Publish Work",
    description: "Submit your research papers and academic writings for publication on our platform.",
    link: "/publish",
  },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(36_76%_44%/0.15),transparent_60%)]" />
      <div className="container relative z-10 flex flex-col items-center py-20 text-center md:py-32">
        <img
          src={logoImg}
          alt="NASS OOU Research Club"
          className="mb-8 h-28 w-28 animate-fade-in rounded-full border-4 border-primary/30 object-cover shadow-gold md:h-36 md:w-36"
        />
        <h1 className="mb-4 max-w-3xl animate-fade-in font-display text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
          NASS OOU <span className="text-gradient-gold">Research Club</span>
        </h1>
        <p className="mb-8 max-w-xl animate-fade-in text-lg text-muted-foreground/80" style={{ animationDelay: "0.2s" }}>
          Empowering academic excellence through collaborative research, knowledge sharing, and scholarly publication.
        </p>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button asChild size="lg" className="bg-gradient-gold shadow-gold hover:opacity-90">
            <Link to="/journals">Browse Journals</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary/40 text-primary-foreground hover:bg-primary/10">
            <Link to="/publish">Publish Research</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="container py-16 md:py-24">
      <h2 className="mb-12 text-center font-display text-3xl font-bold md:text-4xl">
        What We <span className="text-primary">Offer</span>
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Link
            key={f.title}
            to={f.link}
            className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-gold hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <f.icon size={24} />
            </div>
            <h3 className="mb-2 font-display text-lg font-semibold">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.description}</p>
          </Link>
        ))}
      </div>
    </section>
  </Layout>
);

export default Index;
