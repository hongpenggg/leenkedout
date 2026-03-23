import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Post {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
    verified?: boolean;
    badge?: 'verified' | 'premium';
  };
  content: string;
  timestamp: string;
  visibility: 'public' | 'connections';
  likes: number;
  comments: number;
  image?: string;
  tags: string[];
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Chad "The Disruptor" Maxwell',
      title: 'Global Head of Future-Proofing @ SynergeticFlow',
      avatar: 'chad',
      verified: true,
      badge: 'verified',
    },
    content: `Humbled to announce I've successfully optimized my hydration workflow (drank 250ml of H2O). By pivoting my internal fluid logistics from "reactive" to "proactive", I've seen a 4.2% increase in cognitive bandwidth during the 2 PM slump. 

True leadership is realizing that every sip is a micro-investment in the human capital ecosystem. 💧🚀`,
    timestamp: '2h',
    visibility: 'public',
    likes: 1248,
    comments: 42,
    tags: ['GrowthMindset', 'Efficiency', 'HydrationArbitrage', 'LiquidSynergy'],
  },
  {
    id: '2',
    author: {
      name: 'Sarah "Hyper-Growth" Henderson',
      title: 'VP of Unstructured Serendipity @ NexusScale',
      avatar: 'sarah',
      badge: 'premium',
    },
    content: `I just spent 45 minutes staring at a blank whiteboard. Most people call this "procrastination." In the high-velocity startup ecosystem, we call this "Quantum Incubation of Strategic Inaction." 

By refusing to produce value today, I am creating a vacuum of productivity that will be filled by a catastrophic burst of breakthrough synergy tomorrow.

Stop doing. Start being the space where doing happens. 🧘‍♀️💼`,
    timestamp: '5h',
    visibility: 'connections',
    likes: 892,
    comments: 15,
    image: 'whiteboard',
    tags: ['ThoughtLeadership', 'ZenBonds', 'StrategicLanguishing'],
  },
  {
    id: '3',
    author: {
      name: 'Marcus "Pivot" Johnson',
      title: 'Chief Synergy Officer @ Disruptify',
      avatar: 'marcus',
      verified: true,
    },
    content: `So humbled to share that I woke up at 4 AM today. Not because I have to, but because my passion for excellence doesn't have a snooze button.

While others were sleeping, I was:
✅ Optimizing my morning routine
✅ Aligning my chakras with my KPIs
✅ Drinking bulletproof coffee for cognitive enhancement

Success is a choice. What's yours? 🌅💪`,
    timestamp: '8h',
    visibility: 'public',
    likes: 2341,
    comments: 89,
    tags: ['4AMClub', 'SuccessMindset', 'MorningRoutine', 'Grind'],
  },
];

const trendingTopics = [
  { category: 'Corporate Metaverse', title: 'Digital Watercooler Tokenization', count: '4.5k' },
  { category: 'Bio-Hacking', title: 'Micro-Dosing Executive Presence', count: '2.1k' },
  { category: 'Fin-Tech', title: 'Synergy-Back Securities (SBS)', count: '982' },
];

const recommendedConnections = [
  { name: 'Bartholomew "The Bag" Silver', title: 'Founding Partner @ PredatoryCapital', avatar: 'bart' },
  { name: 'Clarissa Exit-Strategy', title: 'Angel Disruptor @ BurnRate Ventures', avatar: 'clarissa' },
];

export function Feed() {
  return (
    <div className="relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] orb-animate"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/10 blur-[120px] orb-animate" style={{ animationDelay: '-5s' }}></div>
      </div>

      <main className="lg:ml-0 min-h-screen pt-4 pb-24 md:pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Feed Column */}
          <div className="md:col-span-8 space-y-8">
            {/* Share Post */}
            <Card className="glass-panel ghost-border border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=chief"
                      alt="User Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="flex-1 bg-surface-container-lowest/50 text-left px-6 py-3 rounded-full text-on-surface-variant font-body hover:bg-surface-bright/50 transition-colors">
                    Broadcast your latest synergy...
                  </button>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-all">
                      <span className="material-symbols-outlined">image</span>
                      <span className="text-xs font-bold uppercase tracking-wider">Asset</span>
                    </button>
                    <button className="flex items-center gap-2 text-secondary hover:bg-secondary/10 px-3 py-2 rounded-lg transition-all">
                      <span className="material-symbols-outlined">videocam</span>
                      <span className="text-xs font-bold uppercase tracking-wider">Broadcast</span>
                    </button>
                  </div>
                  <Button className="primary-gradient px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest text-on-primary shadow-glow">
                    Amplify
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Feed Items */}
            <div className="space-y-6">
              {samplePosts.map((post) => (
                <Card
                  key={post.id}
                  className="glass-panel ghost-border border-0 space-y-4 hover:shadow-2xl hover:shadow-primary/5 transition-all"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/10">
                          <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.author.avatar}`}
                            alt={post.author.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-headline font-bold text-on-surface flex items-center gap-1">
                            {post.author.name}
                            {post.author.badge === 'verified' && (
                              <span className="material-symbols-outlined text-primary text-sm">verified</span>
                            )}
                            {post.author.badge === 'premium' && (
                              <span className="material-symbols-outlined text-secondary text-sm">stars</span>
                            )}
                          </h4>
                          <p className="text-xs text-on-surface-variant font-body">{post.author.title}</p>
                          <p className="text-[10px] text-outline mt-0.5">
                            {post.timestamp} • <span className="material-symbols-outlined text-[10px]">{post.visibility === 'public' ? 'public' : 'groups'}</span>
                          </p>
                        </div>
                      </div>
                      <button className="text-on-surface-variant hover:text-on-surface">
                        <span className="material-symbols-outlined">more_horiz</span>
                      </button>
                    </div>

                    <div className="font-body text-on-surface leading-relaxed whitespace-pre-line mb-4">
                      {post.content}
                    </div>

                    {post.image && (
                      <div className="rounded-xl overflow-hidden mt-4 aspect-video relative mb-4">
                        <div className="w-full h-full bg-gradient-to-br from-surface-container-high to-surface-variant flex items-center justify-center">
                          <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent"></div>
                        <div className="absolute bottom-4 left-4 font-headline font-black text-2xl text-white italic">
                          EMPTY THE BOARD.
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-primary text-sm font-bold">#{tag}</span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex gap-1">
                        <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                          <span className="material-symbols-outlined text-xl">favorite</span>
                          <span className="text-xs font-bold">Synergize</span>
                        </button>
                        <button className="flex items-center gap-2 text-on-surface-variant hover:text-secondary transition-colors px-3 py-1.5 rounded-lg hover:bg-secondary/5">
                          <span className="material-symbols-outlined text-xl">chat_bubble</span>
                          <span className="text-xs font-bold">Echo</span>
                        </button>
                        <button className="flex items-center gap-2 text-on-surface-variant hover:text-tertiary transition-colors px-3 py-1.5 rounded-lg hover:bg-tertiary/5">
                          <span className="material-symbols-outlined text-xl">cycle</span>
                          <span className="text-xs font-bold">Amplify</span>
                        </button>
                      </div>
                      <div className="text-[10px] text-on-surface-variant">
                        {post.likes.toLocaleString()} Synergies • {post.comments} Echoes
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="md:col-span-4 sticky top-24 space-y-8">
            {/* Trending Synergy */}
            <Card className="glass-panel ghost-border border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-headline font-extrabold text-on-surface mb-6 flex items-center justify-between">
                  Trending Synergy
                  <span className="material-symbols-outlined text-primary">trending_up</span>
                </h3>
                <div className="space-y-6">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="group cursor-pointer">
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${
                        index === 0 ? 'text-primary' : index === 1 ? 'text-secondary' : 'text-tertiary'
                      }`}>
                        {topic.category}
                      </p>
                      <h4 className="text-sm font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-1">{topic.count} Disruptors talking about this</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-2 text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors border-t border-white/5 pt-4">
                  View All Trends
                </button>
              </CardContent>
            </Card>

            {/* Recommended Network Connections */}
            <Card className="glass-panel ghost-border border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="font-headline font-extrabold text-on-surface mb-6">
                  VCs to Ignore
                </h3>
                <div className="space-y-6">
                  {recommendedConnections.map((person, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${person.avatar}`}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-on-surface truncate">{person.name}</h4>
                        <p className="text-[10px] text-on-surface-variant truncate">{person.title}</p>
                      </div>
                      <button className="p-2 text-on-surface-variant hover:text-error transition-colors rounded-full hover:bg-error/10">
                        <span className="material-symbols-outlined">person_remove</span>
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Footer Links */}
            <footer className="px-6 flex flex-wrap gap-x-4 gap-y-2 opacity-50 hover:opacity-100 transition-opacity">
              <a href="#" className="text-[10px] font-bold hover:text-primary">About Synergy</a>
              <a href="#" className="text-[10px] font-bold hover:text-primary">Disruption Center</a>
              <a href="#" className="text-[10px] font-bold hover:text-primary">Ecosystem Terms</a>
              <a href="#" className="text-[10px] font-bold hover:text-primary">Privacy Arbitrage</a>
              <p className="text-[10px] font-bold w-full mt-2">LeenkedOUT Corporation © 2024</p>
            </footer>
          </div>
        </div>
      </main>

      {/* Footer Space for Bottom Nav on Mobile */}
      <div className="h-20 md:hidden"></div>
    </div>
  );
}
