import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SavedItem {
  id: string;
  type: 'translation' | 'template' | 'snippet';
  title: string;
  original?: string;
  translated: string;
  timestamp: Date;
  tags: string[];
  score?: number;
}

const savedItems: SavedItem[] = [
  {
    id: '1',
    type: 'translation',
    title: 'Career Pivot Announcement',
    original: "I'm looking for a new job in marketing management.",
    translated: "Currently exploring synergistic opportunities within the high-growth marketing ecosystem. Passionate about driving cross-functional alignment and scaling brand equity through data-driven disruption.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    tags: ['Optimized Snippet'],
    score: 96,
  },
  {
    id: '2',
    type: 'translation',
    title: 'Quarterly Achievement',
    original: "I helped my team sell more stuff last quarter.",
    translated: "Spearheaded a multi-layered revenue acceleration initiative, resulting in a 15% delta in quarterly velocity through the implementation of radical transparency and customer-centric vertical integration.",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    tags: ['Strategic Pitch'],
    score: 94,
  },
  {
    id: '3',
    type: 'snippet',
    title: 'The Classic Pivot',
    translated: "Leveraging cross-functional synergies to optimize bottom-line performance while maintaining an agile posture in a dynamic market environment.",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    tags: ['High Irony', 'Buzzword Heavy'],
  },
  {
    id: '4',
    type: 'snippet',
    title: 'The Pioneer',
    translated: "Pioneering a paradigm shift in digital-first solution architectures, fostering a culture of radical ownership and extreme scalability.",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    tags: ['Classic', 'The "Pioneer"'],
  },
  {
    id: '5',
    type: 'snippet',
    title: 'The Modernist',
    translated: "Unlocking latent value through hyper-personalized engagement frameworks and decentralised decision-making nodes.",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    tags: ['Web3 Adjacent'],
  },
];

const humbleBragTemplate = {
  title: "The \"I'm Not Braggart\" Template",
  content: `So incredibly humbled to have been invited to speak at the Future Disruptors Summit. It's not about the platform, but the incredible community of innovators I get to learn from every day. #Blessed #GrowthMindset #Impact`,
};

export function Saved() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Added to your clipboard.',
    });
  };

  return (
    <div className="relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] orb-animate"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] orb-animate" style={{ animationDelay: '-5s' }}></div>
      </div>

      <main className="flex-1 px-6 md:px-12 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="font-headline text-5xl font-extrabold tracking-tight mb-4">
                Vault of <span className="text-gradient">Excellence</span>
              </h1>
              <p className="text-on-surface-variant text-lg max-w-xl">
                Your curated collection of high-impact corporate rhetoric and profile optimizations. Ready to disrupt the feed.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex bg-surface-container-low p-1 rounded-xl ghost-border">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                    viewMode === 'grid'
                      ? 'bg-surface-bright text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    viewMode === 'list'
                      ? 'bg-surface-bright text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  List View
                </button>
              </div>
            </div>
          </div>

          {/* Category: Career Game-Changers */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface">Career Game-Changers</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {savedItems.filter(item => item.type === 'translation').map((item, index) => (
                <Card key={item.id} className="glass-card ghost-border border-0 relative group overflow-hidden hover:shadow-xl transition-all">
                  <CardContent className="p-6">
                    <div className={`absolute -right-4 -top-4 w-24 h-24 ${index === 0 ? 'bg-primary/10' : 'bg-secondary/10'} blur-3xl group-hover:${index === 0 ? 'bg-primary/20' : 'bg-secondary/20'} transition-all`}></div>
                    <div className="flex justify-between items-start mb-6 relative">
                      <div className={`px-3 py-1 rounded-full ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'} text-[10px] font-bold uppercase tracking-widest`}>
                        {item.tags[0]}
                      </div>
                      <span className="text-on-surface-variant text-xs">
                        {Math.floor((Date.now() - item.timestamp.getTime()) / (24 * 60 * 60 * 1000))} days ago
                      </span>
                    </div>
                    <div className="space-y-6 relative">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-2 tracking-widest">Original Draft</p>
                        <p className="text-on-surface italic opacity-70">"{item.original}"</p>
                      </div>
                      <div className={`p-4 rounded-xl bg-surface-container-lowest/40 ghost-border border-l-4 ${index === 0 ? 'border-primary' : 'border-secondary'}`}>
                        <p className={`text-[10px] uppercase font-bold mb-2 tracking-widest ${index === 0 ? 'text-primary' : 'text-secondary'}`}>LinkedIn Lingo</p>
                        <p className="text-on-surface font-semibold leading-relaxed">{item.translated}</p>
                      </div>
                    </div>
                    <div className="mt-8 flex justify-between items-center relative">
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border border-surface bg-surface-bright flex items-center justify-center text-[10px] font-bold">
                          {item.score}
                        </div>
                        <div className={`w-8 h-8 rounded-full border border-surface ${index === 0 ? 'bg-primary/20' : 'bg-secondary/20'} flex items-center justify-center`}>
                          <span className={`material-symbols-outlined ${index === 0 ? 'text-primary' : 'text-secondary'} text-xs`}>bolt</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(item.translated)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-surface-bright hover:bg-white/10 text-on-surface text-sm font-bold transition-all ghost-border"
                      >
                        <span className="material-symbols-outlined text-sm">content_copy</span>
                        Copy for LinkedIn
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Category: Best of Bullshit */}
          <section className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface">Best of Bullshit</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {savedItems.filter(item => item.type === 'snippet').map((item, index) => (
                <Card
                  key={item.id}
                  className="glass-card ghost-border border-0 p-5 hover:bg-surface-bright transition-colors cursor-pointer group"
                  onClick={() => handleCopy(item.translated)}
                >
                  <CardContent className="p-0">
                    <div className={`mb-4 font-headline font-black text-xs tracking-tighter uppercase ${
                      index === 0 ? 'text-error' : index === 1 ? 'text-primary' : 'text-secondary'
                    }`}>
                      {item.tags[0]}
                    </div>
                    <p className="text-on-surface text-sm font-medium line-clamp-3 mb-6">{item.translated}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">{item.tags[1] || 'Classic'}</span>
                      <span className="material-symbols-outlined text-primary text-lg group-hover:scale-110 transition-transform">content_copy</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Category: Humble-Brag Collection */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-headline text-2xl font-bold text-on-surface">Humble-Brag Collection</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <Card className="bg-surface-container-low rounded-2xl p-8 ghost-border relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/3">
                  <div className="aspect-square rounded-2xl bg-surface-container-highest ghost-border p-4 flex flex-col justify-center items-center text-center">
                    <span className="material-symbols-outlined text-6xl text-primary mb-4">workspace_premium</span>
                    <p className="font-headline font-bold text-xl">{humbleBragTemplate.title}</p>
                  </div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="p-5 bg-surface/60 backdrop-blur rounded-xl border-l-4 border-primary">
                    <p className="text-on-surface leading-relaxed italic">"{humbleBragTemplate.content}"</p>
                  </div>
                  <div className="flex gap-4">
                    <Button className="px-6 py-3 rounded-xl primary-gradient text-on-primary font-headline font-extrabold text-sm flex items-center gap-2 shadow-glow">
                      <span className="material-symbols-outlined text-lg">auto_fix_high</span>
                      Remix with AI
                    </Button>
                    <Button
                      onClick={() => handleCopy(humbleBragTemplate.content)}
                      variant="outline"
                      className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-on-surface font-headline font-bold text-sm ghost-border flex items-center gap-2 transition-all"
                    >
                      <span className="material-symbols-outlined text-lg">content_copy</span>
                      Copy Template
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </main>

      {/* Footer Space for Bottom Nav on Mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
