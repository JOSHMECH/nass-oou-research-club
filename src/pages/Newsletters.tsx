import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Newspaper, Calendar, User } from "lucide-react";

interface Newsletter {
  id: string;
  title: string;
  author: string;
  abstract: string;
  created_at: string;
}

const Newsletters = () => {
  const [items, setItems] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("publications")
        .select("*")
        .eq("type", "newsletter")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setItems((data as Newsletter[]) || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="mb-2 font-display text-3xl font-bold md:text-4xl">
          <span className="text-primary">Newsletters</span>
        </h1>
        <p className="mb-10 text-muted-foreground">Club updates, events, and academic news.</p>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => <div key={i} className="h-24 animate-pulse rounded-xl border bg-muted" />)}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border bg-card py-16 text-center">
            <Newspaper size={48} className="mb-4 text-muted-foreground/40" />
            <h3 className="font-display text-xl font-semibold">No newsletters yet</h3>
            <p className="mt-2 text-sm text-muted-foreground">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((n) => (
              <article key={n.id} className="rounded-xl border bg-card p-6 transition-all hover:shadow-gold">
                <h3 className="font-display text-lg font-semibold">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.abstract}</p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><User size={12} />{n.author}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{new Date(n.created_at).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Newsletters;
