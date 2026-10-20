/*
  Social Medium Ecology — platform data
  ------------------------------------------------------------
  This is the one file to edit when figures go stale.
  1. Update AS_OF.
  2. Update each platform's `users` block (value in millions, label, kind, date, source key).
  3. Add or update the matching entry in SOURCES.
  Trait coding (0–4) is interpretive; see method.html#traits for definitions.
*/
window.SME = window.SME || {};

SME.AS_OF = "October 2026";

SME.CLUSTERS = {
  feed:   { name: "Feed and broadcast",      short: "Feed",    color: "--feed" },
  square: { name: "Public squares",          short: "Squares", color: "--square" },
  rooms:  { name: "Rooms and communities",   short: "Rooms",   color: "--rooms" },
  back:   { name: "Backchannels",            short: "Backchannels", color: "--back" },
  aspire: { name: "Aspiration and identity", short: "Aspiration", color: "--aspire" }
};

/* Trait dimensions used by the Atlas lenses and the Values self-assessment */
SME.TRAITS = {
  algo:     { name: "Curation",        lo: "You choose what you see",      hi: "A model ranks what you see",
              levels: ["you choose everything you see", "mostly you choose", "a mix of your choices and ranking", "mostly ranked by a model", "fully ranked by a model"] },
  bound:    { name: "Audience boundary", lo: "Open to anyone",             hi: "Bounded and private",
              levels: ["open to anyone", "mostly public", "partly bounded", "mostly members or contacts", "private to people you know"] },
  persist:  { name: "Persistence",     lo: "Ephemeral",                    hi: "Durable and searchable",
              levels: ["gone quickly", "short-lived", "around for a while", "durable", "durable and searchable for years"] },
  extract:  { name: "Data extraction", lo: "Little behavioral profiling",   hi: "Heavy behavioral profiling",
              levels: ["almost no behavioral profiling", "light profiling", "moderate profiling", "heavy profiling", "profiling is the business model"] },
  gov:      { name: "Governance",      lo: "Owner writes the rules",        hi: "Communities write the rules",
              levels: ["the owner writes every rule", "mostly the owner", "shared between owner and communities", "mostly communities", "communities write their own rules"] },
  exit:     { name: "Exit",            lo: "Locked in",                     hi: "You can leave with your network",
              levels: ["your network is locked in", "hard to take your network with you", "partly portable", "mostly portable", "you can leave and take your network"] },
  conflict: { name: "Friction",        lo: "Calm",                          hi: "Argumentative, contexts collapse",
              levels: ["calm", "mostly calm", "some friction", "frequent argument", "built for argument"] },
  live:     { name: "Pace",            lo: "Slow, asynchronous",            hi: "Real-time",
              levels: ["slow and asynchronous", "unhurried", "daily rhythm", "fast", "real-time"] }
};
SME.FORMATS = {
  text: "Writing", visual: "Images", short: "Short video", long: "Long video", voice: "Live and voice", chat: "Conversation and messaging"
};

/*
  users.value is in millions and drives bubble size only.
  kind: "reported" = company-reported or filed; "claimed" = company statement, older or unaudited;
        "estimate" = third-party estimate; "proxy" = a different metric used as a stand-in.
*/
SME.PLATFORMS = [
 { id:"fb", name:"Facebook", owner:"Meta", launched:2004, cluster:"feed",
   users:{ value:3000, label:"About 3B monthly", kind:"estimate", date:"2026", src:"meta-q2-2026",
     note:"Meta stopped reporting Facebook daily and monthly users after Q4 2023; it now reports only Family daily active people (3.60B on average in June 2026)." },
   traits:{ algo:3.5, bound:1.5, persist:2, extract:4, gov:0.5, exit:0.5, conflict:2.5, live:1.5, text:2.5, visual:2.5, short:3, long:2, voice:1.5, chat:2.5 },
   mcluhan:[45,40], doctorow:2.9,
   doctorowWhy:"Organic reach for Pages fell sharply through the 2010s; the feed now favors recommended video over friends.",
   tetrad:{ e:"Kinship and the village bulletin board, kept at planetary scale.", o:"The address book, the class reunion, the local paper's notices.", r:"Small-town gossip and the church social.", v:"A feed of strangers' videos and AI posts, where friends become an audience you rarely see." },
   play:["Run a Group if community matters; use Pages mainly for paid reach and events.","Organic Page reach is low, and the feed now favors strangers' video."] },

 { id:"ig", name:"Instagram", owner:"Meta", launched:2010, cluster:"feed",
   users:{ value:3000, label:"3B monthly; 2B daily", kind:"reported", date:"Sept 2025 / Q2 2026", src:"ig-3b",
     note:"3B monthly: Mark Zuckerberg, 24 September 2025. 2B daily: Meta Q2 2026 earnings call, 29 July 2026." },
   traits:{ algo:3.5, bound:1, persist:2, extract:4, gov:0, exit:0, conflict:2, live:2, text:0.5, visual:4, short:3.5, long:0.5, voice:1.5, chat:2 },
   mcluhan:[22,22], doctorow:2.6,
   doctorowWhy:"Moved from a chronological feed (to 2016) to a ranked feed heavy with recommended Reels and ads.",
   tetrad:{ e:"The photo album, turned into a public performance.", o:"The printed snapshot and the magazine spread.", r:"The studio portrait's pose and the society page.", v:"The self as storefront. Photos made for the feed rather than for memory." },
   play:["Reels for discovery, carousels for saves, DMs to convert.","The feed is ranked for strangers; followers seeing you is not guaranteed."] },

 { id:"yt", name:"YouTube", owner:"Alphabet", launched:2005, cluster:"feed",
   users:{ value:2600, label:"About 2.5B (advertising reach)", kind:"estimate", date:"Jan 2025", src:"youtube-reach",
     note:"Alphabet does not publish YouTube monthly users. Common figures are advertising-reach estimates." },
   traits:{ algo:3.5, bound:0.5, persist:4, extract:4, gov:0.5, exit:0.5, conflict:2, live:1, text:0.5, visual:1, short:3, long:4, voice:2, chat:1 },
   mcluhan:[15,48], doctorow:2.4,
   doctorowWhy:"Still pays creators a revenue share, but ad load and recommendation dependence have grown steadily.",
   tetrad:{ e:"Broadcast television, open to anyone with a camera.", o:"The TV schedule, the video store, the printed manual.", r:"The lyceum lecture, the vaudeville bill, the traveling showman.", v:"Autoplay flow. Television returns, personalized and endless." },
   play:["Long-form evergreen videos, with Shorts as trailers. Titles and thumbnails are your search engine.","Slow to start, but the archive compounds for years."] },

 { id:"tt", name:"TikTok", owner:"ByteDance; US joint venture since January 2026", launched:2017, cluster:"feed",
   users:{ value:1800, label:"About 1.6–1.9B monthly", kind:"estimate", date:"2026", src:"tiktok-est",
     note:"TikTok does not publish a global monthly figure; 1.59B is DataReportal ad reach, about 1.9B a Business of Apps estimate. Excludes Douyin. In the US, TikTok has been run by the TikTok USDS Joint Venture since 22 January 2026, with ByteDance retaining 19.9%." },
   traits:{ algo:4, bound:0, persist:1.5, extract:4, gov:0, exit:0, conflict:3, live:3, text:0.5, visual:1, short:4, long:1, voice:2, chat:1 },
   mcluhan:[30,62], doctorow:2.2,
   doctorowWhy:"Doctorow's own early example (2023): reach is allocated by the platform and can be withdrawn.",
   tetrad:{ e:"The hook: sound, movement and the first second of attention.", o:"The follower count, the channel, the playlist.", r:"Carnival, street performance, the dance craze passed hand to hand.", v:"The viewer becomes a training signal, and creators perform for the model." },
   play:["Post often and test hooks; the first second decides everything. Use TikTok Shop for products.","Follower counts barely matter, and ownership and regulation keep shifting."] },

 { id:"x", name:"X (formerly Twitter)", owner:"SpaceX (via xAI)", launched:2006, cluster:"square",
   users:{ value:550, label:"About 550M monthly (X and Grok combined)", kind:"reported", date:"March 2026", src:"spacex-s1",
     note:"SpaceX S-1 (May 2026): about 550M monthly users across X and Grok combined, quarter ended 31 March 2026. No X-only figure is disclosed. X alone had previously claimed about 600M." },
   traits:{ algo:3.5, bound:0, persist:2, extract:3, gov:0.5, exit:0, conflict:4, live:4, text:4, visual:1.5, short:1.5, long:1, voice:1.5, chat:2.5 },
   mcluhan:[58,30], doctorow:2.8,
   doctorowWhy:"Since 2022, reach increasingly depends on paid verification, and policy follows the owner's priorities.",
   tetrad:{ e:"The headline and the wire service, in everyone's hands.", o:"The press release and newsroom gatekeeping.", r:"The pamphleteer and the soapbox.", v:"The owner's megaphone. Paid reach decides who is heard in the square." },
   play:["Short daily posts plus thoughtful replies to larger accounts in your field.","Reach increasingly depends on paid Premium and on one owner's decisions."] },

 { id:"th", name:"Threads", owner:"Meta", launched:2023, cluster:"square",
   users:{ value:500, label:"500M+ monthly", kind:"reported", date:"Q2 2026", src:"meta-q2-2026-ap" },
   traits:{ algo:3.5, bound:0.5, persist:1.5, extract:3.5, gov:0.5, exit:1.5, conflict:3, live:3, text:4, visual:1.5, short:1, long:0, voice:0, chat:2.5 },
   mcluhan:[52,38], doctorow:1.4,
   doctorowWhy:"Still in the growth phase, with limited ads; it inherits Instagram's graph and Meta's model.",
   tetrad:{ e:"Instagram's social graph, converted into conversation.", o:"Dependence on Twitter for casual public talk.", r:"Early Twitter's low-stakes chatter.", v:"A recommendation feed of strangers and engagement-bait text." },
   play:["Conversational, low-polish posts that borrow your Instagram graph.","Its For You feed brings engagement bait along with reach."] },

 { id:"bs", name:"Bluesky", owner:"Bluesky Social PBC (AT Protocol)", launched:2023, cluster:"square",
   users:{ value:10.4, label:"About 10.4M mobile monthly", kind:"estimate", date:"June 2026", src:"bsky-similarweb",
     note:"Similarweb mobile estimate via TechCrunch; down 27.2% year over year. About 46M registered accounts." },
   traits:{ algo:1.5, bound:0.5, persist:2.5, extract:0.5, gov:2.5, exit:3, conflict:2.5, live:2.5, text:4, visual:1.5, short:0.5, long:0, voice:0, chat:2.5 },
   mcluhan:[62,24], doctorow:0.6,
   doctorowWhy:"Designed around an open protocol, custom feeds and account portability, which resist the curve; still venture-funded.",
   tetrad:{ e:"Choice of feed and moderation, layered by the user.", o:"The single master algorithm.", r:"The RSS reader and the open web of 2005.", v:"A small, like-minded crowd, and a protocol whose company still runs most of it." },
   play:["Join starter packs and topic custom feeds. The crowd is small but dense with tech, research and journalism.","Mobile usage fell by about a quarter in the past year."] },

 { id:"md", name:"Mastodon", owner:"Nonprofit software; thousands of independent servers", launched:2016, cluster:"square",
   users:{ value:0.8, label:"About 0.75–1M monthly", kind:"estimate", date:"Feb 2026", src:"mastodon-stats",
     note:"About 10.5M registered accounts (April 2026)." },
   traits:{ algo:0, bound:1, persist:2.5, extract:0, gov:4, exit:3.5, conflict:1.5, live:2, text:4, visual:1, short:0.5, long:0, voice:0, chat:2.5 },
   mcluhan:[76,20], doctorow:0.1,
   doctorowWhy:"No ads, no central owner, and account migration between servers.",
   tetrad:{ e:"The town: local servers with local norms.", o:"The platform owner.", r:"Email, Usenet, the cooperative.", v:"Admin fiefdoms, and discovery so hard that few newcomers stay." },
   play:["Pick a server that matches your topic. With no algorithm, hashtags and boosts do the work.","Tiny reach, but strong credibility with open-source and privacy communities."] },

 { id:"rd", name:"Reddit", owner:"Reddit, Inc.", launched:2005, cluster:"rooms",
   users:{ value:800, label:"514.6M weekly (monthly not reported)", kind:"proxy", date:"Q2 2026", src:"reddit-q2-2026",
     note:"Reddit reports daily and weekly active uniques, not monthly. Bubble size uses a rough monthly estimate." },
   traits:{ algo:2, bound:1.5, persist:4, extract:2.5, gov:2.5, exit:0.5, conflict:2.5, live:1.5, text:4, visual:1.5, short:1, long:0.5, voice:0.5, chat:3 },
   mcluhan:[72,15], doctorow:2.1,
   doctorowWhy:"The 2023 API pricing change ended most third-party apps; the archive is now licensed to AI companies.",
   tetrad:{ e:"The specialist club and the town meeting.", o:"The standalone forum, the FAQ, the review site.", r:"The coffeehouse, the guild, the letters page.", v:"A training-data mine and a search-answer layer, built on unpaid moderators." },
   play:["Participate for weeks before promoting. Run AMAs. Keep roughly nine helpful posts per promotional one.","Threads rank in search and AI answers, but moderators can remove you with no appeal."] },

 { id:"dc", name:"Discord", owner:"Discord Inc.", launched:2015, cluster:"rooms",
   users:{ value:200, label:"200M+ monthly", kind:"claimed", date:"Dec 2025", src:"discord-mau" },
   traits:{ algo:0.5, bound:3, persist:1.5, extract:1, gov:2.5, exit:0, conflict:1, live:3.5, text:3, visual:1, short:0.5, long:0.5, voice:4, chat:4 },
   mcluhan:[88,90], doctorow:1.3,
   doctorowWhy:"Monetizes mainly through subscriptions; ads (Quests) are recent and limited.",
   tetrad:{ e:"The clubhouse and the LAN party.", o:"IRC, web forums, TeamSpeak.", r:"The tavern back room and the ham radio net.", v:"Knowledge that cannot be searched, and communities that vanish when a server closes." },
   play:["Own a server with roles, events and office hours: the clubhouse for people who already like you.","Nothing in it is searchable, so it needs a front door elsewhere."] },

 { id:"tw", name:"Twitch", owner:"Amazon", launched:2011, cluster:"rooms",
   users:{ value:190, label:"About 140–240M monthly", kind:"estimate", date:"2026", src:"twitch-est",
     note:"Amazon does not publish Twitch monthly users." },
   traits:{ algo:2, bound:1.5, persist:1, extract:2.5, gov:1.5, exit:0.5, conflict:2, live:4, text:1, visual:0, short:1.5, long:3, voice:4, chat:3 },
   mcluhan:[48,86], doctorow:2.3,
   doctorowWhy:"Repeated changes to revenue splits and ad requirements have squeezed creators.",
   tetrad:{ e:"Watching over a friend's shoulder.", o:"The broadcast schedule and the arcade crowd.", r:"The campfire storyteller with a talking-back audience.", v:"Parasocial patronage, with the audience as tip jar." },
   play:["Keep a fixed schedule, co-stream, and cut clips for short-video platforms.","Growth is slow without collaborations, and it demands a lot of time."] },

 { id:"wa", name:"WhatsApp", owner:"Meta", launched:2009, cluster:"back",
   users:{ value:3000, label:"3B+ monthly", kind:"claimed", date:"April 2025", src:"whatsapp-3b" },
   traits:{ algo:0.5, bound:3.5, persist:2, extract:1.5, gov:1, exit:2, conflict:1, live:3, text:3, visual:2, short:1.5, long:0, voice:2.5, chat:4 },
   mcluhan:[85,85], doctorow:1.6,
   doctorowWhy:"Messages are end-to-end encrypted, but business messaging, Channels and ads in Updates are expanding.",
   tetrad:{ e:"The phone call and the kitchen-table conversation.", o:"SMS, the landline, the family newsletter.", r:"Oral rumor and the village well; voice notes bring speech back.", v:"Forwarded rumors at national scale. Groups quietly become broadcast." },
   play:["Channels for broadcast, Communities for cohorts, WhatsApp Business for support.","Huge outside the US, but discovery happens elsewhere."] },

 { id:"tg", name:"Telegram", owner:"Telegram FZ-LLC", launched:2013, cluster:"back",
   users:{ value:1000, label:"1B+ monthly", kind:"claimed", date:"March 2025", src:"telegram-1b" },
   traits:{ algo:0.5, bound:2.5, persist:2.5, extract:1, gov:1, exit:2, conflict:1.5, live:3, text:3, visual:1.5, short:1, long:0.5, voice:2, chat:3.5 },
   mcluhan:[64,62], doctorow:1.2,
   doctorowWhy:"Premium subscriptions and channel ads, with no ranked feed; ownership is concentrated in its founder.",
   tetrad:{ e:"The broadcast channel inside a chat app.", o:"Mailing lists and the state's monopoly on news.", r:"Samizdat and the underground press.", v:"A vector for scams and propaganda, and a founder under state pressure." },
   play:["Run a channel as a newsletter inside the app, with a linked group for discussion.","Strong in Eastern Europe, the Middle East and South Asia; its reputation for scams can rub off."] },

 { id:"sg", name:"Signal", owner:"Signal Foundation (nonprofit)", launched:2014, cluster:"back",
   users:{ value:85, label:"About 70–100M monthly", kind:"claimed", date:"April 2025", src:"signal-mau",
     note:"Meredith Whittaker to NZZ, April 2025, as reported secondhand; the original interview was not located." },
   traits:{ algo:0, bound:4, persist:1, extract:0, gov:1, exit:2, conflict:0.5, live:3, text:3, visual:1, short:0.5, long:0, voice:2, chat:4 },
   mcluhan:[92,72], doctorow:0.2,
   doctorowWhy:"A nonprofit funded by donations, collecting as little data as it can.",
   tetrad:{ e:"The sealed letter and the whispered conversation.", o:"The easy wiretap.", r:"The private parlor, and the right not to be recorded.", v:"Officials governing by disappearing message, hidden from the public they answer to." },
   play:["Not a broadcast channel. Use it for an inner circle: advisors, early customers, trusted peers.","Choosing it signals privacy values, which is a statement in itself."] },

 { id:"sc", name:"Snapchat", owner:"Snap Inc.", launched:2011, cluster:"back",
   users:{ value:971, label:"971M monthly; 493M daily", kind:"reported", date:"Q2 2026", src:"snap-q2-2026" },
   traits:{ algo:2, bound:3, persist:0.5, extract:3, gov:0, exit:0.5, conflict:1, live:3, text:1, visual:3, short:3, long:0, voice:1.5, chat:3.5 },
   mcluhan:[72,55], doctorow:2.0,
   doctorowWhy:"Core chat is ad-free, but Discover, Spotlight and Stories carry growing ad loads.",
   tetrad:{ e:"The glance and the passing remark.", o:"The photograph as permanent record.", r:"The impermanence of speech.", v:"Streaks as compulsion. Ephemerality undercut by screenshots." },
   play:["Stories and Spotlight for reaching younger audiences, plus a Public Profile.","Content leaves no archive, so it rarely compounds."] },

 { id:"li", name:"LinkedIn", owner:"Microsoft", launched:2003, cluster:"aspire",
   users:{ value:310, label:"About 310M monthly (1.3B members)", kind:"estimate", date:"2026", src:"linkedin-est",
     note:"LinkedIn reports registered members, not monthly users. The monthly figure is a third-party estimate." },
   traits:{ algo:3, bound:1.5, persist:2, extract:3, gov:0, exit:0.5, conflict:1, live:1, text:3.5, visual:1.5, short:1, long:1, voice:1, chat:2 },
   mcluhan:[38,10], doctorow:2.5,
   doctorowWhy:"Paid tiers gate search and messaging; the feed rewards a formulaic style that drives engagement.",
   tetrad:{ e:"The CV and the Rolodex.", o:"The headhunter's file and the trade newsletter.", r:"The guild register and the calling card.", v:"Performative vulnerability posts, and a work identity that absorbs the whole self." },
   play:["Treat your profile as a storefront and messages as your main tool. Post real work, not formulas. Organizations win through people, not company pages.","The formulaic, line-broken post style makes everyone sound the same."] },

 { id:"pi", name:"Pinterest", owner:"Pinterest, Inc.", launched:2010, cluster:"aspire",
   users:{ value:640, label:"640M monthly", kind:"reported", date:"Q2 2026", src:"pins-q2-2026" },
   traits:{ algo:3.5, bound:1, persist:4, extract:3, gov:0, exit:0.5, conflict:0, live:0, text:0.5, visual:4, short:1.5, long:0, voice:0, chat:0.5 },
   mcluhan:[18,6], doctorow:2.0,
   doctorowWhy:"Increasingly shoppable; ads and shopping links take a larger share of the feed.",
   tetrad:{ e:"The scrapbook and the mood board.", o:"The clipping file and the mail-order catalog.", r:"The cabinet of curiosities and the hope chest.", v:"Aspiration turned into a shopping funnel." },
   play:["Evergreen pins that link to your site work like search marketing. Connect a product catalog if you sell.","Results arrive slowly and only fit visual subjects."] }
];

SME.byId = Object.fromEntries(SME.PLATFORMS.map(p => [p.id, p]));

/* How much of what you see is chosen by a ranking model (0) you choose → (100) model chooses. Interpretive. */
SME.DRIFT = {
  fb:{2008:30,2010:45,2016:65,2020:72,2026:88}, ig:{2010.8:0,2015.9:0,2016.5:45,2020.6:66,2026:90},
  yt:{2008:35,2012:55,2016:75,2020:85,2026:92}, tt:{2018.6:90,2020:95,2026:97},
  x:{2008:0,2015.9:5,2016.2:35,2020:55,2023.1:80,2026:85}, th:{2023.5:60,2026:85},
  bs:{2023.2:20,2024:30,2026:40}, md:{2016.8:0,2026:2},
  rd:{2008:15,2012:20,2016:25,2020:35,2023:45,2026:55}, dc:{2015.4:0,2020:0,2026:8},
  tw:{2011.5:20,2016:30,2020:40,2026:55}, wa:{2009.5:0,2020:2,2026:15},
  tg:{2013.7:0,2020:3,2026:10}, sg:{2014.5:0,2026:0}, sc:{2011.7:0,2015:15,2020.9:35,2026:55},
  li:{2008:10,2012:25,2016:50,2020:60,2026:75}, pi:{2010.2:20,2015.6:45,2020:75,2026:85}
};
SME.DRIFT_EVENTS = [
  { year:2009, text:"Facebook ranks News Feed (Top News)", src:"hist-fb-feed" },
  { year:2012, text:"YouTube optimizes discovery (suggestions, then search) for watch time", src:"hist-yt-watchtime" },
  { year:2016, text:"Twitter and Instagram move to ranked timelines", src:["hist-tw-2016","hist-ig-2016"] },
  { year:2018, text:"TikTok absorbs Musical.ly and becomes one global app", src:"hist-tiktok-2018" },
  { year:2020, text:"Instagram Reels launches", src:"hist-reels-2020" },
  { year:2023, text:"X makes For You the default; Threads launches", src:"hist-threads-2023" }
];

/* Data sources for figures (bibliographic references live in refs.js) */
SME.SOURCES = {
  "meta-q2-2026": { title:"Meta Reports Second Quarter 2026 Results", publisher:"Meta Investor Relations", date:"29 July 2026",
    url:"https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/" },
  "meta-q2-2026-ap": { title:"Meta shares drop as Q2 profit declines due to legal expenses and severance costs (earnings-call figures)", publisher:"Associated Press via NY1", date:"29 July 2026",
    url:"https://ny1.com/nyc/all-boroughs/ap-top-news/2026/07/29/meta-shares-drop-as-q2-profit-declines-due-to-legal-expenses-and-severance-costs" },
  "ig-3b": { title:"Instagram hits 3B users, prioritizes Reels and DMs (reporting Zuckerberg's 24 Sept 2025 post)", publisher:"MediaPost", date:"September 2025",
    url:"https://www.mediapost.com/publications/article/409382/instagram-hits-3b-users-prioritizes-reels-dms.html" },
  "snap-q2-2026": { title:"Snap Inc. Announces Second Quarter 2026 Financial Results (Form 8-K, Exhibit 99.1)", publisher:"U.S. SEC", date:"3 August 2026",
    url:"https://www.sec.gov/Archives/edgar/data/0001564408/000156440826000047/snap-20260803xexx991pressr.htm" },
  "pins-q2-2026": { title:"Pinterest Announces Second Quarter 2026 Results (Form 8-K, Exhibit 99.1)", publisher:"U.S. SEC", date:"4 August 2026",
    url:"https://www.sec.gov/Archives/edgar/data/0001506293/000150629326000102/q2-26xpressrelease.htm" },
  "reddit-q2-2026": { title:"Reddit Reports Second Quarter 2026 Results", publisher:"Reddit Investor Relations", date:"30 July 2026",
    url:"https://s203.q4cdn.com/380862485/files/doc_financials/2026/q2/Q2-26-Earnings-Press-Release.pdf" },
  "spacex-s1": { title:"Space Exploration Technologies Corp., Form S-1 Registration Statement", publisher:"U.S. SEC", date:"20 May 2026",
    url:"https://www.sec.gov/Archives/edgar/data/1181412/000162828026036936/spaceexplorationtechnologi.htm" },
  "bsky-similarweb": { title:"Bluesky's active user base is shrinking as its focus expands beyond the app", publisher:"TechCrunch (Sarah Perez, citing Similarweb)", date:"11 August 2026",
    url:"https://techcrunch.com/?p=3151942" },
  "mastodon-stats": { title:"43 Mastodon Statistics for 2026", publisher:"Marketful", date:"2026",
    url:"https://marketful.com/mastodon-statistics" },
  "signal-mau": { title:"Signal statistics (citing Meredith Whittaker, NZZ interview, April 2025)", publisher:"SQ Magazine", date:"2026",
    url:"https://sqmagazine.co.uk/signal-statistics/" },
  "youtube-reach": { title:"YouTube statistics: why no official monthly user figure exists", publisher:"Elite Content Marketer (citing DataReportal)", date:"2026",
    url:"https://www.elitecontentmarketer.com/youtube-statistics/" },
  "tiktok-est": { title:"TikTok statistics (2026)", publisher:"Skillademia (citing DataReportal and Business of Apps)", date:"2026",
    url:"https://skillademia.com/statistics/tiktok-statistics/" },
  "telegram-1b": { title:"Telegram founder Pavel Durov says app now has 1B users", publisher:"TechCrunch", date:"19 March 2025",
    url:"https://techcrunch.com/2025/03/19/telegram-founder-pavel-durov-says-app-now-has-1b-users-calls-whatsapp-a-cheap-watered-down-imitation" },
  "whatsapp-3b": { title:"WhatsApp now has more than 3 billion monthly users (Meta Q1 2025 earnings call)", publisher:"TechCrunch", date:"1 May 2025",
    url:"https://techcrunch.com/?p=3001817" },
  "linkedin-est": { title:"LinkedIn statistics 2026 (members vs. monthly users)", publisher:"Axis Intelligence", date:"2026",
    url:"https://axis-intelligence.com/?p=32971" },
  "discord-mau": { title:"Discord files confidentially for IPO", publisher:"Storyboard18 (citing Bloomberg)", date:"7 January 2026",
    url:"https://www.storyboard18.com/amp/social-media/discord-files-confidentially-for-ipo-reports-87132.htm" },
  "twitch-est": { title:"Twitch statistics 2026", publisher:"Axis Intelligence", date:"2026",
    url:"https://axis-intelligence.com/twitch-statistics/" }
};
