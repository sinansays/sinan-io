/*
  Social Medium Ecology — self-assessment content
  Values mode: each answer sets a desired value (0–4) and a weight on one or more trait dimensions.
    Fit = weighted closeness between your desired values and each platform's trait codes (platforms.js).
  Presence mode: each answer adds points to platforms directly (practical fit), plus exclusions and enjoyment.
*/
window.SME = window.SME || {};

/* opts: [label, hint, { dim: [desired 0–4, weight] }] */
SME.VALUES_Q = [
 { t:"When you open an app, who should decide what you see first?", lens:"Williams · flow / Zuboff · prediction", cite:[["williams1974"],["zuboff2019"]],
   opts:[
    ["Me: only people and sources I chose, in the order they posted", "", { algo:[0,1.6] }],
    ["Mostly me, with a few suggestions", "", { algo:[1.5,1.4] }],
    ["A good recommender; surprise me", "", { algo:[3.5,1.2] }],
    ["Whatever is most engaging", "", { algo:[4,1.2] }] ] },
 { t:"Who should be able to see what you post?", lens:"boyd · networked publics", cite:[["boyd2014"]],
   opts:[
    ["Anyone, including strangers", "", { bound:[0,1.5] }],
    ["People in my field or interest area", "", { bound:[1.5,1.3] }],
    ["Members of communities I join", "", { bound:[3,1.4] }],
    ["Only people I know personally", "", { bound:[4,1.6] }] ] },
 { t:"What should happen to what you share?", lens:"Innis · time-binding and space-binding", cite:[["innis1951"]],
   opts:[
    ["Stay findable for years", "", { persist:[4,1.3] }],
    ["Stay around, then fade", "", { persist:[2,1] }],
    ["Disappear after a while", "", { persist:[0.5,1.3] }] ] },
 { t:"How do you feel about a platform profiling your behavior to sell ads?", lens:"Zuboff · surveillance capitalism", cite:[["zuboff2019"]],
   opts:[
    ["Unacceptable; I'll give up features to avoid it", "", { extract:[0,2] }],
    ["I'd rather avoid it", "", { extract:[1,1.2] }],
    ["A fair price for a free service", "", { extract:[3,0.5] }],
    ["It doesn't concern me", "", {}] ] },
 { t:"If the owner changed the rules tomorrow, how much would it matter that you could leave and take your network with you?", lens:"Doctorow · the right to leave", cite:[["doctorow2025"]],
   opts:[
    ["Essential", "", { exit:[4,2] }],
    ["Important", "", { exit:[3,1.2] }],
    ["Nice to have", "", { exit:[2,0.5] }],
    ["Not a concern", "", {}] ] },
 { t:"Who should set and enforce the rules of a space?", lens:"Illich · convivial tools / van Dijck · platform society", cite:[["illich1973"],["vandijck2018"]],
   opts:[
    ["The company; I want consistent policies", "", { gov:[0,1] }],
    ["Volunteer moderators from the community", "", { gov:[2.5,1.2] }],
    ["Each community decides, and I choose which one to join", "", { gov:[4,1.5] }],
    ["Mostly me, with my own filters, feeds and block lists", "", { gov:[3,1], algo:[1,0.6] }] ] },
 { t:"How much disagreement do you want to run into?", lens:"Marwick and boyd · context collapse", cite:[["marwick2011"]],
   opts:[
    ["Bring on the debate", "", { conflict:[4,1.2] }],
    ["Some, when it's in good faith", "", { conflict:[2,1] }],
    ["Very little", "", { conflict:[0.5,1.3] }] ] },
 { t:"Which pace suits you?", lens:"Rushkoff · present shock", cite:[["rushkoff2013"]],
   opts:[
    ["Live and real-time", "", { live:[4,1.2] }],
    ["A daily check-in", "", { live:[2.5,0.8] }],
    ["Slow; I'll read when I have time", "", { live:[0.5,1.2] }] ] },
 { t:"How do you most like to express yourself or take things in?", sub:"Pick any that apply.", lens:"McLuhan · the medium is the message", cite:[["mcluhan1964","ch. 1"]],
   special:"formats", multi:true,
   opts:[["Writing","",{f:"text"}],["Images","",{f:"visual"}],["Short video","",{f:"short"}],["Long video","",{f:"long"}],["Live talk and voice","",{f:"voice"}],["Conversation and messaging","",{f:"chat"}]] },
 { t:"How should a platform treat your attention?", lens:"Postman · epistemology / Chun · habit", cite:[["postman1985"],["chun2016"]],
   opts:[
    ["Hold me as long as it can; I enjoy getting lost", "", { algo:[4,0.8], short:[4,0.8] }],
    ["Give me what I came for, then let me go", "", { algo:[1,1.2], live:[1.5,0.4] }],
    ["Help me go deep on one thing", "", { persist:[4,0.8], long:[3.5,0.6], text:[3.5,0.6] }],
    ["Not try to hold me at all", "", { algo:[0,1.5], extract:[0,0.6] }] ] },
 { t:"What is the main reason you go online socially?", lens:"Purpose", cite:[],
   opts:[
    ["Keep up with people I know", "", { bound:[3.5,1], chat:[3.5,1] }],
    ["Find people who share a niche interest", "", { bound:[2.5,0.8], persist:[3,0.6], chat:[3,0.8], gov:[2.5,0.4] }],
    ["Learn and research", "", { persist:[4,1], text:[3.5,0.6], long:[3,0.5] }],
    ["Follow news and public debate", "", { bound:[0,1], live:[3.5,0.8], text:[3.5,0.6] }],
    ["Be entertained", "", { algo:[3.5,0.8], short:[3.5,0.8] }],
    ["Build an audience for my work", "", { bound:[0,1.2], persist:[3,0.5] }] ],
   audienceOpt:5 },
 { t:"Which of these do you use at least weekly?", sub:"Not scored. Used to compare your values with your habits.", lens:"Your habits", cite:[],
   special:"usage", multi:true, platforms:true }
];

/* Presence mode: opts: [label, hint, { platformId: points }] */
SME.PRESENCE_Q = [
 { t:"What is the main job of this presence right now?", lens:"Goal",
   opts:[
    ["Awareness at scale","Get known by people who have never heard of you",{tt:3,yt:2,ig:2,fb:1,th:1,x:1,sc:1}],
    ["Clients, leads or sales pipeline","Turn attention into conversations and deals",{li:2.5,yt:1,x:1,fb:1,rd:1,wa:0.5}],
    ["Credibility in a field","Be the person or organization others cite",{li:2,x:2,yt:2,th:1,bs:1,md:1,rd:1}],
    ["A loyal core community","Fewer people, much deeper ties",{dc:3,rd:2,tg:2,wa:2,tw:1,md:1}],
    ["Hiring or career moves","",{li:3,x:1,bs:1}],
    ["Direct-to-consumer sales","",{ig:3,tt:3,pi:3,fb:2,yt:1,sc:1}] ] },
 { t:"Who most needs to see it?", lens:"Audience",
   opts:[
    ["Professionals and business buyers","",{li:3,x:1,yt:1,th:1}],
    ["Developers and technical people","",{x:2,bs:2,md:2,rd:2,dc:2,yt:1,li:1}],
    ["A broad consumer market","",{fb:2,ig:3,tt:3,yt:2,sc:1}],
    ["Teens and young adults","",{tt:3,sc:3,ig:2,dc:2,tw:1,yt:1}],
    ["Niche enthusiasts","Hobbyists, fandoms, specialist communities",{rd:3,dc:3,yt:2,tw:2,pi:1}],
    ["Specific regional markets","For example Latin America, South Asia, the Middle East, Eastern Europe",{wa:3,tg:3,fb:2,ig:1,yt:1}] ] },
 { t:"What format comes most naturally?", lens:"McLuhan · the medium is the message",
   opts:[
    ["Writing","Posts, essays, threads",{x:3,li:2,th:2,bs:2,md:2,rd:2}],
    ["Images and visual design","",{ig:3,pi:3}],
    ["Short video","Under a minute",{tt:4,ig:3,yt:2,sc:2,fb:1}],
    ["Long video","Explainers, interviews, tutorials",{yt:4,li:1,fb:1}],
    ["Live and spoken","Streams, talks, hosting discussion",{tw:3,dc:3,yt:2,tt:1,li:1}],
    ["Back-and-forth conversation","Threads, replies, messages",{dc:2,wa:2,rd:2,tg:1,x:1,sc:1,sg:1}] ] },
 { t:"How many hours a week can go into it?", lens:"Capacity",
   opts:[
    ["Under 2","",{li:1.5,x:1,th:1,bs:1,pi:1,tt:-2,yt:-2,tw:-3,dc:-1}],
    ["2 to 5","",{li:1,ig:1,th:1}],
    ["5 to 10","",{ig:1,yt:1,tt:1,dc:1}],
    ["More than 10, or a team","",{yt:2,tt:2,tw:2,dc:1,ig:1}] ] },
 { t:"How do you feel about being on camera?", lens:"Capacity",
   opts:[
    ["I'd rather not","",{tt:-3,yt:-2,tw:-4,sc:-2,ig:-1,li:1,x:1,rd:1,pi:1,th:1}],
    ["Occasionally is fine","",{tw:-2,tt:-1}],
    ["Comfortable","",{tt:2,yt:2,ig:1,sc:1,tw:1}],
    ["I enjoy it, including live","",{tw:3,tt:2,yt:2,ig:1}] ] },
 { t:"How bounded should the audience be?", lens:"boyd · context collapse",
   opts:[
    ["Fully public; strangers are the point","",{x:2,tt:2,th:2,yt:1,ig:1}],
    ["A defined professional circle","",{li:2.5,bs:1,md:1}],
    ["A community I host","Members opt in",{dc:3,tg:2,wa:2,rd:1,sg:1}],
    ["A small trusted inner circle","",{wa:2,sg:3,sc:2,tg:1}] ] },
 { t:"How long should the content stay useful?", lens:"Innis · time-binding",
   opts:[
    ["Years; I want it found by search","",{yt:3,rd:3,pi:3,li:1}],
    ["About a week","",{li:1,x:1,ig:1,th:1,fb:1}],
    ["Only in the moment","",{x:2,tw:2,sc:2,th:1,tt:1}],
    ["It should disappear","",{sc:3,sg:2,ig:1}] ] },
 { t:"How do you feel about letting an algorithm decide who sees you?", lens:"The drift from graph to feed",
   opts:[
    ["Great; let the recommender find strangers","",{tt:3,ig:2,yt:2,th:2,fb:1,li:1,pi:1}],
    ["Fine, as long as followers still see me","",{li:1,x:1,ig:1}],
    ["I want to own the relationship","Followers or members should reliably get what I post",{tg:2,dc:2,bs:2,md:2,wa:1}],
    ["I want to be able to leave and take my audience","",{md:3,bs:3,sg:1,tt:-1,fb:-1}] ] },
 { t:"How much public argument can this presence handle?", lens:"Marwick and boyd · context collapse",
   opts:[
    ["It thrives on debate","",{x:3,th:1,rd:1,bs:1}],
    ["Some friction is fine","",{}],
    ["I'd prefer calm","",{pi:2,li:1,dc:1,ig:1,x:-2,rd:-1}],
    ["It must avoid it","Regulated industry, sensitive clients or high-risk topics",{li:1,pi:1,x:-3,rd:-2,tt:-1,tw:-1}] ] },
 { t:"What is the subject matter?", lens:"Topic",
   opts:[
    ["Technology, AI or software","",{x:2,li:1.5,bs:2,rd:1,yt:1,dc:1,md:1}],
    ["Business, careers or finance","",{li:2.5,x:1,yt:1}],
    ["Lifestyle, design, food, fashion or home","",{pi:3,ig:3,tt:2,yt:1}],
    ["Entertainment, gaming or culture","",{tw:3,tt:2,yt:2,dc:2,rd:1}],
    ["Education and how-to","",{yt:3,tt:1,li:1,pi:1,rd:1}],
    ["News, politics or civic issues","",{x:2,th:2,bs:2,tg:1,yt:1,fb:1}] ] },
 { t:"Where is your audience already active?", sub:"Pick any that apply. This is the strongest single signal.", lens:"Network effects",
   multi:true, platforms:true, pts:3 },
 { t:"Will you pay for ads?", lens:"Economics",
   opts:[
    ["Yes, regularly","",{fb:2,ig:2,tt:1,li:1,pi:1,yt:1,sc:1}],
    ["Occasionally, to boost what works","",{ig:1,fb:1,li:1}],
    ["No; organic only","",{rd:1,dc:1,md:1,bs:1}] ] },
 { t:"What counts as success?", lens:"Measurement",
   opts:[
    ["Reach and followers","",{tt:2,ig:2,yt:2,x:1}],
    ["Visits to a site I own","",{pi:3,li:1,x:1,rd:1,fb:1}],
    ["Conversations and replies","",{th:2,x:1,li:1,bs:1,rd:1}],
    ["Members who stay","",{dc:3,tg:2,wa:1,rd:1}],
    ["Revenue, clients and leads","",{li:1.5,ig:1,fb:1,pi:1,yt:1}] ] },
 { t:"How much do the platform's owner and policies matter?", lens:"Doctorow and Illich",
   opts:[
    ["Not a factor","",{}],
    ["I avoid platforms with volatile ownership","",{x:-3,th:1,bs:1,li:1}],
    ["I prefer independent, nonprofit or open systems","",{md:2,bs:2,sg:2,fb:-1,x:-2}],
    ["I need stability and brand safety","",{li:2,yt:1,fb:1,x:-2,tg:-1}] ] },
 { t:"How do you build trust best, online or off?", sub:"This picks your home base outside the platforms.", lens:"Your off-platform home", special:"archetype",
   opts:[
    ["Hosting: teaching, convening, leading discussion","",{a:"host"}],
    ["Writing: essays, analysis, notes","",{a:"writer"}],
    ["Speaking: talks, interviews, presentations","",{a:"speaker"}],
    ["Showing the work: demos, case studies, portfolios","",{a:"maker"}],
    ["Performing: personality, humor, entertainment","",{a:"performer"}] ] },
 { t:"Which platforms do you enjoy using?", sub:"Pick any. Enjoyment is what keeps a presence going.", lens:"Sustainability", multi:true, platforms:true, pts:2 },
 { t:"Which platforms will you not use, whatever the score?", sub:"Pick any. These are removed from your results, with notes on what you give up.", lens:"Boundaries", multi:true, platforms:true, special:"exclude" }
];

SME.ARCHETYPES = {
 host: { name:"The host", motto:"Teach in public, sell in private.",
   moves:["Run a small recurring session: a roundtable, office hours, a live workshop or an AMA. Cap it so it stays a conversation.","For sensitive audiences, use the Chatham House Rule: what is said can be used, but not attributed.","End each session with a natural next step, such as a private session for the attendee's team or a deeper course."],
   platforms:"Social platforms become invitation channels: direct messages, a channel or newsletter announcing sessions, and a community server for past attendees.",
   measure:"Invitations → attendees → follow-up conversations → outcomes. Followers don't matter here.", cite:[["ong1982"]] },
 writer: { name:"The writer", motto:"Publish less, publish what lasts.",
   moves:["Make a newsletter or site you own your home base; platforms carry excerpts and links back.","Write the kind of document people forward inside their organizations: checklists, teardowns, annotated examples.","If writing is slow, record yourself explaining an idea and edit the transcript into prose."],
   platforms:"Syndicate the sharpest paragraph to the text platforms that fit your audience. Your list is the asset; the platforms are distribution.",
   measure:"Subscribers, forwards and replies, not impressions.", cite:[["innis1951"],["doctorow2025"]] },
 speaker: { name:"The speaker", motto:"Speak where your audience gathers, not where your peers do.",
   moves:["Pitch talks to the events your audience attends, which are often different from your peers' events.","Guest on podcasts and panels; each appearance is a borrowed audience.","Record talks with permission and cut them into clips and written summaries."],
   platforms:"Video platforms hold the archive; short clips travel on the feeds; profiles act as your speaker page.",
   measure:"Invitations to speak, inbound requests after each talk.", cite:[["ong1982"]] },
 maker: { name:"The maker", motto:"Show the work; the work persuades.",
   moves:["Publish demos, case studies and before-and-after examples on a site you control.","Build in public at a sustainable pace: progress notes, not performances.","Let the work be searchable for years: tutorials, galleries, documentation."],
   platforms:"Durable, searchable platforms suit you: long video, visual boards and community archives.",
   measure:"Inquiries that cite a specific piece of work.", cite:[["benkler2006"]] },
 performer: { name:"The performer", motto:"Rent the stage, own the crowd.",
   moves:["Personality-led short video and live streams are your strengths; post on a steady schedule.","Collaborate often; borrowed audiences are the fastest growth.","Move your most engaged fans somewhere you own: a newsletter, a community server, a membership."],
   platforms:"Ranked video feeds reward you most and can withdraw that reward without notice, so plan for the platform changing its rules.",
   measure:"Repeat viewers and members, not one-off views.", cite:[["doctorow2023"],["williams1974","ch. 4"]] }
};

/* Theory lens shown in results, per cluster */
SME.RESULT_LENS = {
 feed:{ t:"You are renting attention from a model", cite:[["williams1974","ch. 4"],["zuboff2019"]],
   presence:"Williams described broadcasting as planned flow; the ranked feed is flow planned per viewer. Zuboff's point is that your content is bait for behavioral prediction. In practice: design for the first second, expect the recommender to change its rules, and move your best followers somewhere you own.",
   values:"Your answers accept the bargain of the ranked feed: discovery and entertainment in exchange for being profiled and steered. Williams would call it flow; Chun would ask which of your habits it is building. Accepting the bargain is a legitimate choice. The lens asks you to make it knowingly." },
 square:{ t:"Every post meets every audience", cite:[["marwick2011"],["williams1974"]],
   presence:"Context collapse is the operating condition here: a post written for peers will be read by critics, journalists and future employers. Ownership also changes the medium, as X showed after 2022. Hedge across at least two squares, and write in a voice that survives being read by a stranger.",
   values:"You value public conversation, which means accepting context collapse: your words travel to audiences you didn't choose. The open protocols (Bluesky, Mastodon) let you keep public talk while reducing dependence on a single owner, at the cost of a smaller crowd." },
 rooms:{ t:"You are a member before you are a voice", cite:[["ong1982"],["benkler2006"]],
   presence:"Ong's secondary orality describes these spaces: communal, present-tense and full of in-jokes. Benkler's commons is real here, and moderators are its stewards. Presences that win earn standing by being useful first; those that broadcast get removed.",
   values:"You value bounded, self-governing spaces with their own norms. That is the closest thing on today's internet to Illich's convivial tools. The trade-off is fragility: the room's rules can still be overridden by the company that hosts it." },
 back:{ t:"Trust over reach", cite:[["boyd2014"],["innis1950"]],
   presence:"Privacy here is control over context, and these channels rebuild the boundaries public platforms dissolved. You cannot be discovered here, so this is where relationships deepen after people find you elsewhere.",
   values:"You value privacy as control over context, which boyd argues is what privacy has always meant. Innis would add that you are also choosing not to leave a record. That protects you, and it can also shelter rumors and officials from scrutiny." },
 aspire:{ t:"The self as portfolio", cite:[["vandijck2013"],["rushkoff2010"]],
   presence:"Platforms turn relationships into countable connectivity, and people learn to write in the genre the algorithm rewards. Be specific rather than formulaic. On visual platforms, think like a librarian: durable, searchable and linked to a site you own.",
   values:"You value calm, durable, future-oriented spaces. van Dijck would note that they still convert your plans into data, and Rushkoff that they train you in their preferred genre. These are the least theorized platforms here, and possibly the most underrated." }
};

/* Sample answers (indices into each question's options; multi = arrays) */
SME.SAMPLES = {
  values: [1, 1, 0, 1, 1, 2, 1, 2, [0,5], 2, 2, [4,15,8,11]],
  presence: {
    orgName: "Sample consultancy",
    you: [1, 0, 4, 1, 3, 1, 0, 2, 2, 1, [15,8], 2, 4, 2, 0, [8,6], [15]],
    org: [1, 0, 0, 1, 0, 1, 0, 1, 3, 1, [15,8], 1, 4, 3, 1, [], []]
  }
};
