import { useState } from 'react';
import { generateHumbleBragPost } from '@/utils/openrouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const toneOptions = [
  { value: 'grateful', label: 'Grateful & Humbled', icon: '🙏' },
  { value: 'excited', label: 'Excited & Energetic', icon: '🚀' },
  { value: 'reflective', label: 'Deep & Reflective', icon: '💭' },
  { value: 'professional', label: 'Professional & Polished', icon: '💼' },
  { value: 'casual', label: 'Casual & Relatable', icon: '✨' },
];

const topicSuggestions = [
  'Getting a promotion',
  'Speaking at a conference',
  'Hitting a milestone',
  'Starting a new job',
  'Winning an award',
  'Publishing a book',
  'Getting featured in media',
  'Completing a certification',
];

export function HumbleBrag() {
  const [topic, setTopic] = useState('');
  const [selectedTone, setSelectedTone] = useState('grateful');
  const [generatedPost, setGeneratedPost] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setLoading(true);
    const tone = toneOptions.find(t => t.value === selectedTone)?.label || 'grateful';
    const post = await generateHumbleBragPost(topic, tone);
    setGeneratedPost(post);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    toast({
      title: 'Copied!',
      description: 'Your humble brag is ready to disrupt the feed.',
    });
  };

  const handleRegenerate = () => {
    handleGenerate();
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
            The <span className="text-gradient">Humble Brag</span> Generator
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl">
            Transform your achievements into posts that sound humble while secretly flexing. It's not bragging if you're "grateful," right?
          </p>
        </div>

        {/* Generator Interface */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel: Input */}
          <div className="space-y-6">
            <Card className="glass-panel ghost-border border-0">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-on-surface font-headline font-bold">
                    What do you want to brag about?
                  </Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Just got promoted to VP"
                    className="bg-surface-container-lowest/30 border-white/10 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary/50 focus:ring-primary/20"
                  />
                </div>

                {/* Topic Suggestions */}
                <div className="space-y-2">
                  <Label className="text-on-surface-variant text-sm">Quick suggestions:</Label>
                  <div className="flex flex-wrap gap-2">
                    {topicSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setTopic(suggestion)}
                        className="px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 text-on-surface-variant hover:text-on-surface rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-on-surface font-headline font-bold">Select your tone</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {toneOptions.map((tone) => (
                      <button
                        key={tone.value}
                        onClick={() => setSelectedTone(tone.value)}
                        className={`p-4 rounded-xl border transition-all text-left ${
                          selectedTone === tone.value
                            ? 'bg-primary/10 border-primary/50 text-primary'
                            : 'bg-white/5 border-white/10 text-on-surface hover:bg-white/10'
                        }`}
                      >
                        <span className="text-2xl mb-2 block">{tone.icon}</span>
                        <span className="text-sm font-medium">{tone.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={loading || !topic.trim()}
                  className="w-full primary-gradient text-on-primary font-headline font-bold py-4 rounded-xl shadow-glow hover:shadow-glow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined animate-spin">refresh</span>
                      Generating Humble Brag...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <span className="material-symbols-outlined">auto_fix_high</span>
                      Generate Humble Brag
                    </span>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="glass-panel ghost-border border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardContent className="p-6">
                <h3 className="font-headline font-bold text-lg mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">lightbulb</span>
                  Pro Tips for Maximum Impact
                </h3>
                <ul className="space-y-3 text-sm text-on-surface-variant">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Start with "So humbled" or "Incredibly grateful" for maximum faux-modesty
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Mention how it's "not about you" while listing all your achievements
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    End with an inspirational quote no one asked for
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Use strategic emojis: 🚀 for success, 🙏 for gratitude, 💡 for wisdom
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel: Output */}
          <div className="space-y-6">
            <Card className="glass-panel ghost-border border-0 min-h-[500px] flex flex-col">
              <CardContent className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-headline text-xl font-bold text-gradient">Your Humble Brag</h2>
                  <span className="text-primary text-xs font-label px-3 py-1 bg-primary/10 rounded-full font-bold">
                    AI-GENERATED
                  </span>
                </div>

                {generatedPost ? (
                  <>
                    <Textarea
                      value={generatedPost}
                      onChange={(e) => setGeneratedPost(e.target.value)}
                      className="flex-1 bg-surface-container-lowest/20 border-white/5 text-on-surface font-body text-base leading-relaxed resize-none min-h-[300px]"
                    />
                    <div className="flex gap-3 mt-6">
                      <Button
                        onClick={handleCopy}
                        className="flex-1 bg-white/5 hover:bg-white/10 text-on-surface font-headline font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">content_copy</span>
                        Copy to Clipboard
                      </Button>
                      <Button
                        onClick={handleRegenerate}
                        disabled={loading}
                        className="flex-1 primary-gradient text-on-primary font-headline font-bold py-3 rounded-xl shadow-glow hover:shadow-glow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <span className="material-symbols-outlined">refresh</span>
                        Regenerate
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-4xl text-primary">auto_awesome</span>
                    </div>
                    <p className="text-on-surface-variant text-lg mb-2">
                      Your humble brag will appear here
                    </p>
                    <p className="text-on-surface-variant/60 text-sm">
                      Enter a topic and select a tone to get started
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview Card */}
            {generatedPost && (
              <Card className="glass-panel ghost-border border-0">
                <CardContent className="p-6">
                  <h3 className="font-headline font-bold text-sm text-on-surface-variant mb-4 uppercase tracking-wider">
                    LinkedIn Preview
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-surface-bright border border-white/10 overflow-hidden shrink-0">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=chief"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-headline font-bold text-on-surface">Chief Visionary</p>
                      <p className="text-xs text-on-surface-variant">Synergy Architect at LeenkedOUT</p>
                      <p className="text-[10px] text-outline mt-0.5">Just now • <span className="material-symbols-outlined text-[10px]">public</span></p>
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-on-surface line-clamp-4">
                    {generatedPost.split('\n').slice(0, 3).join('\n')}...
                  </div>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                    <button className="flex items-center gap-1 text-on-surface-variant text-xs hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">favorite</span>
                      Synergize
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant text-xs hover:text-secondary transition-colors">
                      <span className="material-symbols-outlined">chat_bubble</span>
                      Echo
                    </button>
                    <button className="flex items-center gap-1 text-on-surface-variant text-xs hover:text-tertiary transition-colors">
                      <span className="material-symbols-outlined">cycle</span>
                      Amplify
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Footer Space for Bottom Nav on Mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
