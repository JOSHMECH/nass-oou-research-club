import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Calendar, User, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface Journal {
  id: string;
  title: string;
  author: string;
  abstract: string;
  category: string;
  file_url: string | null;
  created_at: string;
}

const Journals = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("publications")
        .select("*")
        .eq("type", "journal")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setJournals((data as Journal[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="font-display text-3xl font-bold md:text-4xl">
              Research <span className="text-primary">Journals</span>
            </h1>
            <p className="mt-2 text-muted-foreground">Browse published research papers and academic journals.</p>
          </div>
          <Button asChild className="bg-gradient-gold shadow-gold">
            <Link to="/publish">Submit Your Paper</Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-xl border bg-muted" />
            ))}
          </div>
        ) : journals.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border bg-card py-16 text-center">
            <FileText size={48} className="mb-4 text-muted-foreground/40" />
            <h3 className="font-display text-xl font-semibold">No journals yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Be the first to publish a research paper!</p>
            <Button asChild className="mt-6 bg-gradient-gold shadow-gold">
              <Link to="/publish">Publish Now</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journals.map((j) => (
              <article key={j.id} className="group rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-gold hover:-translate-y-1">
                <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {j.category}
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold leading-tight line-clamp-2">{j.title}</h3>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{j.abstract}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User size={12} />{j.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{new Date(j.created_at).toLocaleDateString()}</span>
                </div>
                {j.file_url && (
                  <a href={j.file_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                    <Download size={14} /> Download PDF
                  </a>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Journals;
