import { generateKYC } from "../gemini";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Sparkles, User, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

const PersonaDashboard = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setResult(""); 

    try {
      const data = await generateKYC(input);
      setResult(data);
    } catch (error) {
      console.error("Error generating persona:", error);
      setResult("## Error\nFailed to generate persona. Please check your API key in the .env file.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2s
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
              LinkedIn Persona Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Powered by Gemini 2.5 Flash Lite
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-4xl px-6 py-10 space-y-8">
        {/* Input Section */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            LinkedIn Profile Data
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste the LinkedIn profile content here..."
            className="min-h-[200px] resize-y bg-card border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-primary font-mono text-sm"
          />
          <Button
            onClick={handleGenerate}
            disabled={loading || !input.trim()}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            {loading ? "Analyzing Profile..." : "Generate KYC Persona"}
          </Button>
        </section>

        {/* Output Section */}
        {result && (
          <section className="rounded-xl border border-border bg-card shadow-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            {/* Toolbar Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/30 rounded-t-xl">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Analysis Result
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2 transition-all duration-300"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Copy</span>
                  </>
                )}
              </Button>
            </div>

            {/* Markdown Content */}
            <div className="p-6 md:p-8 prose prose-invert max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-primary mb-4 border-b border-border pb-2" {...props} />,
                  h2: ({node, ...props}) => <h2 className="text-xl font-semibold text-foreground mt-6 mb-3 flex items-center gap-2" {...props} />,
                  h3: ({node, ...props}) => <h3 className="text-lg font-medium text-foreground mt-4 mb-2" {...props} />,
                  strong: ({node, ...props}) => <span className="font-bold text-primary/90 bg-primary/10 px-1 rounded" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 text-muted-foreground" {...props} />,
                  li: ({node, ...props}) => <li className="marker:text-primary" {...props} />,
                  p: ({node, ...props}) => <p className="leading-7 text-muted-foreground mb-4" {...props} />,
                }}
              >
                {result}
              </ReactMarkdown>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default PersonaDashboard;