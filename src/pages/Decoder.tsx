import { useState } from 'react';
import { decodeLInkedInJunk } from '@/utils/openrouter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface DecodeHistory {
  id: string;
  original: string;
  decoded: string;
  timestamp: Date;
  bullshitScore: number;
}

export function Decoder() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<DecodeHistory[]>([
    {
      id: '1',
      original: "Incredibly humbled to announce I'm joining [Company] as Head of Disruption.",
      decoded: "I got a new job. I'm very excited about my title.",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      bullshitScore: 97,
    },
    {
      id: '2',
      original: "After a period of deep reflection, I'm pivoting to explore new opportunities aligned with my North Star.",
      decoded: "I quit or got fired. I don't want to say which.",
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      bullshitScore: 99,
    },
  ]);
  const { toast } = useToast();

  const handleDecode = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    const decoded = await decodeLInkedInJunk(inputText);
    setOutputText(decoded);
    const newEntry: DecodeHistory = {
      id: Date.now().toString(),
      original: inputText,
      decoded,
      timestamp: new Date(),
      bullshitScore: Math.floor(Math.random() * 20) + 80,
    };
    setHistory(prev => [newEntry, ...prev]);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: 'Copied!',
      description: 'The truth has been extracted.',
    });
  };

  return (
    <div className="relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] orb-animate"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] orb-animate" style={{ animationDelay: '-7s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-accent/5 blur-[100px] orb-animate" style={{ animationDelay: '-13s' }}></div>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 flex flex-col gap-12">
        {/* Hero */}
        <div className="max-w-3xl">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Decode the <span className="text-gradient">Bullshit</span>.{' '}
            <span className="italic text-muted-foreground">Finally.</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            Paste any LinkedIn post. We'll strip out the jargon and tell you what they actually meant in plain English. No fluff. No mercy.
          </p>
        </div>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-2 gap-8 relative items-center">
          {/* Input: LinkedIn Junk */}
          <div className="glass-panel rounded-xl p-8 border border-white/5 shadow-2xl min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold">LinkedIn Post</h2>
              <span className="text-muted-foreground text-xs px-3 py-1 bg-white/5 rounded-full">RAW JUNK</span>
            </div>
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder={`e.g., "So humbled to announce I'm joining [Company] as Chief Synergy Officer 🚀"`}
                        className="flex-1 bg-white/5 border-none focus:ring-1 focus:ring-primary/50 rounded-xl p-6 text-foreground placeholder:text-muted-foreground/40 resize-none text-lg min-h-[200px]"
                      />
                      {/* Action Button — bottom of input panel */}
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleDecode}
                          disabled={loading || !inputText.trim()}
                          className="group flex items-center gap-3 px-8 py-4 primary-gradient font-headline font-black text-lg rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <span className="material-symbols-outlined animate-spin">refresh</span>
                              DECODING...
                            </>
                          ) : (
                            <>
                              DECODE
                              <span className="material-symbols-outlined">leak_remove</span>
                            </>
                          )}
                        </Button>
                      </div>

          </div>

          

          {/* Output: Plain English */}
          <div className="glass-panel rounded-xl p-8 border border-white/5 shadow-2xl min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-gradient">What They Actually Meant</h2>
              <span className="text-primary text-xs px-3 py-1 bg-primary/10 rounded-full font-bold">TRUTH</span>
            </div>
            <div className="flex-1 bg-white/5 rounded-xl p-6 text-foreground text-lg border border-white/5 leading-relaxed min-h-[200px]">
              {outputText || (
                <span className="text-muted-foreground italic">
                  "I got a new job. I'm very pleased with my title."
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 mt-6 justify-end">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
                title="Copy"
              >
                <span className="material-symbols-outlined text-muted-foreground">content_copy</span>
              </button>
              <button
                disabled={!outputText}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
                title="Share to Feed"
              >
                <span className="material-symbols-outlined text-muted-foreground">share</span>
              </button>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-bold">Recent Decodings</h3>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-panel p-6 rounded-xl border border-white/5 flex gap-6 items-start hover:bg-white/5 transition-all"
                >
                  <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-muted-foreground uppercase tracking-widest">
                        {Math.floor((Date.now() - item.timestamp.getTime()) / (1000 * 60 * 60))} hours ago
                      </span>
                      <span className={`text-xs font-bold ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                        {item.bullshitScore}% BULLSHIT
                      </span>
                    </div>
                    <p className="text-foreground font-semibold mb-2">"{item.decoded}"</p>
                    <p className="text-muted-foreground text-sm italic">Original: "{item.original}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Card */}
          <div className="flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-bold">Junk Detected</h3>
            <div className="glass-panel p-8 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">filter_alt</span>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-muted-foreground text-sm uppercase mb-2">Buzzwords Removed</p>
                  <p className="text-4xl font-black font-headline text-primary">89,231</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm uppercase mb-2">Average Bullshit Score</p>
                  <p className="text-4xl font-black font-headline text-secondary">94%</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <p className="text-muted-foreground text-sm">LinkedIn posts contain an average of <span className="text-primary font-bold">12 buzzwords</span> per paragraph.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="h-20 md:hidden"></div>
    </div>
  );
}
