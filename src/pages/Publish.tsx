import { useState } from "react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Upload, CheckCircle } from "lucide-react";

const categories = ["Science", "Technology", "Engineering", "Mathematics", "Social Sciences", "Humanities", "Health Sciences", "Other"];

const Publish = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    author: "",
    abstract: "",
    category: "",
    type: "journal" as "journal" | "newsletter" | "resource",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.abstract || !form.category) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    let file_url: string | null = null;

    if (file) {
      const ext = file.name.split(".").pop();
      const path = `publications/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("publications").upload(path, file);
      if (uploadError) {
        toast.error("File upload failed: " + uploadError.message);
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("publications").getPublicUrl(path);
      file_url = urlData.publicUrl;
    }

    const { error } = await supabase.from("publications").insert({
      title: form.title,
      author: form.author,
      abstract: form.abstract,
      category: form.category,
      type: form.type,
      file_url,
      published: true,
    });

    if (error) {
      toast.error("Submission failed: " + error.message);
    } else {
      toast.success("Publication submitted successfully!");
      setForm({ title: "", author: "", abstract: "", category: "", type: "journal" });
      setFile(null);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-12">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            <span className="text-primary">Publish</span> Your Work
          </h1>
          <p className="mt-2 text-muted-foreground">Submit your research paper, newsletter, or academic resource.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border bg-card p-6 shadow-sm md:p-8">
          <div className="space-y-2">
            <label className="text-sm font-medium">Publication Type *</label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v as typeof form.type })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="journal">Research Journal</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="resource">Resource Material</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title *</label>
            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Enter title of your publication" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Author(s) *</label>
            <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="e.g. John Doe, Jane Smith" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category *</label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Abstract / Description *</label>
            <Textarea
              value={form.abstract}
              onChange={(e) => setForm({ ...form, abstract: e.target.value })}
              placeholder="Provide a brief summary of your work..."
              rows={5}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Upload File (PDF, DOCX)</label>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-primary/40 px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5">
                <Upload size={16} className="text-primary" />
                {file ? file.name : "Choose file..."}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </label>
              {file && <CheckCircle size={18} className="text-primary" />}
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-gradient-gold shadow-gold text-lg py-6">
            {loading ? "Submitting..." : "Submit Publication"}
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Publish;
