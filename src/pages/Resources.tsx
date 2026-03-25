import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Library, Download, Calendar } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  author: string;
  abstract: string;
  category: string;
  file_url: string | null;
  created_at: string;
}

const Resources = () => {
  const [items, setItems] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("publications")
        .select("*")
        .eq("type", "resource")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setItems((data as Resource[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">
          Resource <span className="text-primary">Library</span>
        </h1>
        <p className="mb-10 text-muted-foreground">Curated academic materials and study guides.</p>

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => <div key={i} className="h-32 animate-pulse rounded-xl border bg-muted" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border bg-card py-16 text-center">
            <Library size={48} className="mb-4 text-muted-foreground/40" />
            <h3 className="font-display text-xl font-semibold">No resources yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Resources will be added soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((r) => (
              <article key={r.id} className="rounded-xl border bg-card p-6 transition-all hover:shadow-gold">
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{r.category}</span>
                <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.abstract}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><Calendar size={12} />{new Date(r.created_at).toLocaleDateString()}</span>
                  {r.file_url && (
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                      <Download size={14} /> Download
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;
