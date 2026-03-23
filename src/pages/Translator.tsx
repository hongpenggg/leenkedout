import { useState } from 'react';
import { translateToLinkedInLingo } from '@/utils/openrouter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface TranslationHistory {
  id: string;
  original: string;
  translated: string;
  timestamp: Date;
  score: number;
}

export function Translator() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<TranslationHistory[]>([
    {
      id: '1',
      original: "I'm doing something different.",
      translated: "I'm leaning into my North Star to disrupt the status quo.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      score: 98,
    },
    {
      id: '2',
      original: "Working with other teams to finish the project.",
      translated: "Leveraging cross-functional agility to optimize deliverables.",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      score: 95,
    },
  ]);
  const { toast } = useToast();

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    const translated = await translateToLinkedInLingo(inputText);
    setOutputText(translated);
    
    // Add to history
    const newEntry: TranslationHistory = {
      id: Date.now().toString(),
      original: inputText,
      translated,
      timestamp: new Date(),
      score: Math.floor(Math.random() * 15) + 85, // Random score between 85-100
    };
    setHistory(prev => [newEntry, ...prev]);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText);
    toast({
      title: 'Copied!',
      description: 'Your optimized corporate speak is ready to paste.',
    });
  };

  const handleSave = () => {
    toast({
      title: 'Saved!',
      description: 'Added to your Vault of Excellence.',
    });
  };

  return (
    <div className="relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] orb-animate"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] orb-animate" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-tertiary/5 blur-[100px] orb-animate" style={{ animationDelay: '-10s' }}></div>
      </div>

      <main className="max-w-[1440px] mx-auto px-6 py-12 lg:py-20 flex flex-col gap-12">
        {/* Hero Title */}
        <div className="max-w-3xl">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            Translate <span className="text-gradient">Sincerity</span> into <span className="italic text-on-surface-variant">Scalability</span>.
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Our proprietary neural engine converts your human thoughts into enterprise-grade corporate buzzwords. It's not a message; it's a paradigm shift.
          </p>
        </div>

        {/* Translator Interface */}
        <div className="grid lg:grid-cols-2 gap-8 relative items-center">
          {/* Left Panel: Input */}
          <div className="glass-panel rounded-xl p-8 border border-white/5 shadow-2xl min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-on-surface">Standard English (The Boring Truth)</h2>
              <span className="text-on-surface-variant text-xs font-label px-3 py-1 bg-surface-container-low rounded-full">RAW INPUT</span>
            </div>
                      <Textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="e.g., 'I am quitting my job because I'm tired.'"
                        className="flex-1 bg-surface-container-lowest/30 border-none focus:ring-1 focus:ring-primary/50 rounded-xl p-6 text-on-surface placeholder:text-on-surface-variant/40 resize-none font-body text-lg min-h-[200px]"
                      />
                      {/* Action Button — bottom of input panel */}
                      <div className="mt-6 flex justify-end">
                        <Button
                          onClick={handleTranslate}
                          disabled={loading || !inputText.trim()}
                          className="group flex items-center gap-3 px-8 py-4 primary-gradient text-on-primary font-headline font-black text-lg rounded-full shadow-glow hover:shadow-glow-lg hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <span className="material-symbols-outlined animate-spin">refresh</span>
                              SYNERGIZING...
                            </>
                          ) : (
                            <>
                              SYNERGIZE
                              <span className="material-symbols-outlined">auto_awesome</span>
                            </>
                          )}
                        </Button>
                      </div>

          </div>

          

          {/* Right Panel: Output */}
          <div className="glass-panel rounded-xl p-8 border border-white/5 shadow-2xl min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline text-xl font-bold text-gradient">LinkedIn Lingo (The Synergy)</h2>
              <span className="text-primary text-xs font-label px-3 py-1 bg-primary/10 rounded-full font-bold">OPTIMIZED</span>
            </div>
            <div className="flex-1 bg-surface-container-lowest/20 rounded-xl p-6 text-on-surface font-body text-lg border border-white/5 leading-relaxed min-h-[200px]">
              {outputText || (
                <span className="text-on-surface-variant italic">
                  "After a period of deep introspection and cross-functional alignment, I've decided to pivot my career trajectory to explore new synergistic horizons and lean into high-impact growth opportunities..."
                </span>
              )}
            </div>
            {/* Action Bar */}
            <div className="flex items-center gap-3 mt-6 justify-end">
              <button
                onClick={handleCopy}
                disabled={!outputText}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
                title="Copy to Clipboard"
              >
                <span className="material-symbols-outlined text-on-surface-variant">content_copy</span>
              </button>
              <button
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
                title="Share to Feed"
                disabled={!outputText}
              >
                <span className="material-symbols-outlined text-on-surface-variant">share</span>
              </button>
              <button
                onClick={handleSave}
                disabled={!outputText}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all disabled:opacity-50"
                title="Save Phrase"
              >
                <span className="material-symbols-outlined text-on-surface-variant">bookmark</span>
              </button>
            </div>
          </div>
        </div>

        {/* History & Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Synergies */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-bold">Recent LinkedIn-isms</h3>
            <div className="space-y-4">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className="glass-panel p-6 rounded-xl border border-white/5 flex gap-6 items-start hover:bg-white/5 transition-all group"
                >
                  <div className={`p-3 rounded-xl ${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    <span className="material-symbols-outlined">history</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest">
                        {Math.floor((Date.now() - item.timestamp.getTime()) / (1000 * 60 * 60))} hours ago
                      </span>
                      <span className={`text-xs font-bold ${index % 2 === 0 ? 'text-primary' : 'text-secondary'}`}>
                        {item.score}% SYNERGY SCORE
                      </span>
                    </div>
                    <p className="text-on-surface font-semibold mb-2">"{item.translated}"</p>
                    <p className="text-on-surface-variant text-sm italic">Original: "{item.original}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Card: Synergy Stats */}
          <div className="flex flex-col gap-6">
            <h3 className="font-headline text-2xl font-bold">Global Impact</h3>
            <div className="glass-panel p-8 rounded-xl border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-6xl">trending_up</span>
              </div>
              <div className="space-y-8">
                <div>
                  <p className="text-on-surface-variant text-sm font-label uppercase mb-2">Buzzwords Generated</p>
                  <p className="text-4xl font-black font-headline text-primary">42,891</p>
                </div>
                <div>
                  <p className="text-on-surface-variant text-sm font-label uppercase mb-2">Corporate Egos Inflated</p>
                  <p className="text-4xl font-black font-headline text-secondary">100%</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <button className="w-full py-4 px-6 bg-white/5 hover:bg-white/10 rounded-xl text-on-surface font-headline font-bold transition-all flex items-center justify-between group">
                    Upgrade to Executive+
                    <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Space for Bottom Nav on Mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
