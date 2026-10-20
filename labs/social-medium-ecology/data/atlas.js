/*
  Social Medium Ecology — Atlas content
  Citations: [refKey, locator]. Locators are given only where the passage is well known.
*/
window.SME = window.SME || {};

/* Lens definitions. Positions are computed from trait codes (platforms.js) except McLuhan's,
   which are hand-placed because hot/cool has no clean trait equivalent. */
SME.LENSES = [
 { id:"mcl", label:"McLuhan", name:"Hot and cool media", cite:[["mcluhan1964","ch. 2"]],
   blurb:"Hot media are high-definition and leave little for the audience to fill in; cool media are low-definition and demand participation. The vertical axis is McLuhan's other preoccupation: whether a medium extends the eye (the printed page, the visual frame) or the ear and voice (speech, the 'acoustic space' of oral culture).",
   x:["Hot · little to fill in","Cool · you complete it"], y:["Extends the eye","Extends the ear and voice"],
   coded:"Hand-placed. McLuhan's categories resist trait coding; his own examples were contradictory." },
 { id:"inn", label:"Innis", name:"The bias of communication", cite:[["innis1951"],["innis1950"]],
   blurb:"Light, fast media bind space: they help an authority run territory and favor the present. Durable media bind time: they favor memory, continuity and local authority. Ephemeral feeds are extreme space-binders; searchable archives and community-run servers lean toward time.",
   x:["Space-binding · fast, wide, now","Time-binding · durable"], y:["Centralized control","Distributed control"],
   fx:"persist", fy:["gov","exit"], coded:"x = Persistence; y = mean of Governance and Exit." },
 { id:"boyd", label:"boyd", name:"Networked publics", cite:[["boyd2010"],["boyd2014"],["marwick2011"]],
   blurb:"Networked publics differ from physical ones in persistence, visibility, spreadability and searchability (boyd 2014). The result is context collapse: a post meant for one audience reaches all of them at once (Marwick and boyd 2011). Privacy, on this account, is control over context rather than secrecy.",
   x:["Bounded audience","Unbounded public"], y:["Contexts stay separate","Context collapse"],
   fx:"-bound", fy:"conflict", coded:"x = inverse of Audience boundary; y = Friction." },
 { id:"zub", label:"Zuboff · Doctorow", name:"Extraction", cite:[["zuboff2019"],["doctorow2025"]],
   blurb:"Zuboff: behavioral data is the raw material, and predictions of your behavior are the product sold to advertisers. Doctorow: platforms move value from users to business customers to shareholders. Top right is the mature surveillance platform; bottom left is the nonprofit and the protocol.",
   x:["Value stays with users","Value moved to shareholders"], y:["Little behavioral data","Heavy behavioral prediction"],
   fx:"doctorow", fy:"extract", coded:"x = Doctorow stage (0–3); y = Data extraction." },
 { id:"ill", label:"Illich · van Dijck", name:"Convivial or captive", cite:[["illich1973"],["vandijck2018"]],
   blurb:"Illich: a convivial tool is one people can shape to their own ends and walk away from. van Dijck, Poell and de Waal: platforms have become infrastructure whose owners set the rules of public life. Horizontal: who writes the rules. Vertical: whether you can leave and take your network with you.",
   x:["Owner writes the rules","Communities write the rules"], y:["Locked in","You can leave with your network"],
   fx:"gov", fy:"exit", coded:"x = Governance; y = Exit." },
 { id:"cl", label:"Clusters", name:"Five media", cite:[["mcluhan1964","ch. 1"]],
   blurb:"The platforms grouped by form rather than by company, which is McLuhan's basic move: attend to the medium, not the content. Scroll down for each cluster.",
   x:["",""], y:["",""], coded:"Grouping by dominant form." }
];

SME.CLUSTER_LAYOUT = {fb:[16,80],ig:[28,88],yt:[22,66],tt:[34,74],x:[64,86],th:[76,84],bs:[70,72],md:[82,70],rd:[16,30],dc:[26,20],tw:[30,36],wa:[60,32],tg:[72,40],sg:[82,26],sc:[66,16],li:[46,52],pi:[54,58]};

SME.CLUSTER_TEXT = [
 { k:"feed", title:"The feed decides", ids:["fb","ig","yt","tt"], topo:"star",
   topoCap:"One model at the center, many viewers around it. Content flows out by ranking, not by who follows whom.",
   thesis:"These four have converged on one form: an endless ranked stream, increasingly video, chosen by a model from your behavior rather than from whom you follow. The social graph that defined Facebook in 2008 is now mostly a starting signal for the recommender.",
   reads:[
    ["Raymond Williams", [["williams1974","ch. 4"]], "Williams argued that broadcasting's characteristic experience is not the single program but flow: a planned sequence that carries the viewer from one item to the next. The For You page is flow with the schedule removed and the sequence planned per viewer."],
    ["Neil Postman", [["postman1985","ch. 2"]], "Each medium carries an epistemology, a way of deciding what counts as knowing. Postman argued that television recast news and politics as entertainment. Short video extends the pattern to medicine, finance and war explained in thirty seconds. Applying him here is extrapolation; he died in 2003."],
    ["Marshall McLuhan", [["mcluhan1964","ch. 1"]], "The content of any medium is an older medium. Short video's content is television, radio and the music video. Its message is the change of pace and scale: attention cut into units of seconds."],
    ["Shoshana Zuboff", [["zuboff2019"]], "Ranking runs on prediction. What you watch, skip and replay improves the service, and the data beyond that need, which Zuboff calls behavioral surplus, feeds predictions of what you will do next, sold to advertisers."],
    ["Wendy Hui Kyong Chun", [["chun2016"]], "New media matter most when they become habits. The scroll is designed to be repeated without a decision, which is why hours can pass without anything seeming to happen."],
    ["Henry Jenkins (counterpoint)", [["jenkins2013"]], "The same feeds lowered the cost of reaching an audience to nearly nothing. Creators without gatekeepers built careers and whole genres. The open question is who keeps the value, not whether the creativity was real."]],
   tension:"Williams would push back on McLuhan's determinism here. The ranked feed was a business decision, not destiny. Instagram chose to imitate TikTok in 2020–22, and its users objected loudly at the time." },
 { k:"square", title:"Who owns the square", ids:["x","th","bs","md"], topo:"cascade",
   topoCap:"A dense public graph. A single post cascades across it, far beyond its intended audience.",
   thesis:"Text-based public conversation split four ways after Twitter's 2022 sale. Each branch is an experiment on one question: does changing the owner or the protocol change the medium?",
   reads:[
    ["danah boyd", [["boyd2014"],["marwick2011"]], "Networked publics are persistent, visible, spreadable and searchable. Audiences collapse into one, so a remark meant for friends meets strangers and opponents. The quote-post turns context collapse into a feature."],
    ["Raymond Williams", [["williams1974","ch. 1"]], "Technologies emerge from social intentions, not the other way round. X is a clean test: much the same software, a new owner, and within two years a different medium with different norms. Its parent company's 2026 IPO filing counted about 550M monthly users across X and Grok combined, below the 600M X alone had claimed."],
    ["Evgeny Morozov", [["morozov2013"]], "Solutionism is the belief that the right technical design settles a social problem. Bluesky and Mastodon risk it: the architecture changed, but the appetite for pile-ons did not."],
    ["Ivan Illich", [["illich1973"]], "A convivial tool is one people can shape and leave. Mastodon comes closest of anything here. Its weakness is that conviviality asks a lot of each person: pick a server, find people, accept slower discovery."],
    ["Clay Shirky (counterpoint)", [["shirky2008"]], "When group-forming becomes nearly free, collective action follows. Movements, fandoms and expert networks formed on Twitter that could not have formed before. Much of that infrastructure was then exposed to a single change of ownership."]],
   tension:"Scale went to an incumbent's existing graph, not to the open protocols. Threads passed 500M monthly users by riding Instagram's network, while Bluesky's mobile audience shrank to about 10M by mid-2026 and Mastodon remains under 1M." },
 { k:"rooms", title:"The return of the room", ids:["rd","dc","tw"], topo:"rooms",
   topoCap:"Bounded rooms with dense talk inside and only occasional bridges between them.",
   thesis:"Bounded spaces with local norms, volunteer moderators and live talk. These are where people most often say social media still feels social.",
   reads:[
    ["Walter Ong", [["ong1982"]], "Electronic media produce a 'secondary orality' that revives the communal, participatory and formulaic habits of oral culture. Twitch chat, with its emotes and repeated phrases, is formulaic oral performance; Discord's voice channels are simply speech."],
    ["Douglas Rushkoff", [["rushkoff2013"]], "Digital life collapses narrative into a continuous present. Live streams and always-on servers replace stories with beginnings and endings by a feed of now."],
    ["Harold Innis", [["innis1951"]], "Reddit is unusually time-binding: a durable, searchable archive people trust enough to add 'reddit' to their search queries. That durability is exactly what Reddit now licenses to AI companies."],
    ["José van Dijck", [["vandijck2013"]], "Platforms turn sociality into a resource to be measured and sold. Much of the value of Reddit and Discord is produced by unpaid moderators, which the 2023 Reddit protests made visible."],
    ["Yochai Benkler (counterpoint)", [["benkler2006"]], "Commons-based peer production is real here. Subreddit wikis, help servers and hobbyist communities are knowledge commons built without a firm directing the work, even though firms host them."]],
   tension:"Rushkoff's question, who is programming whom, applies to moderators. Volunteers shape these communities more than the companies do, until the company changes the rules." },
 { k:"back", title:"Retreat into the group chat", ids:["wa","tg","sg","sc"], topo:"groups",
   topoCap:"Small sealed groups. A forward hops from one to the next, unseen by anyone outside.",
   thesis:"As public feeds filled with strangers and performance, much close social life moved into private, encrypted or disappearing channels. The public sphere did not vanish; parts of it moved behind a door.",
   reads:[
    ["danah boyd", [["boyd2014"]], "Privacy means control over who sees what, not secrecy. Group chats rebuild the boundaries between contexts that public platforms dissolved. boyd's teenage informants worked this out early."],
    ["Harold Innis", [["innis1950"]], "Disappearing messages are a choice about memory. Snapchat and Signal lean away from the record, which protects individuals and can also let institutions avoid accountability."],
    ["Walter Ong", [["ong1982"]], "Voice notes, now common on WhatsApp in many countries, are a return of orality to the phone."],
    ["Evgeny Morozov", [["morozov2011"]], "Networks serve states as well as dissidents. Telegram is both an underground press and a propaganda channel, and the French case against its founder (2024) shows governments reaching for the platform itself."],
    ["Shoshana Zuboff", [["zuboff2019"]], "Encryption protects message content, not metadata or the business layer around it. Paid business messaging and subscriptions are now among Meta's fastest-growing revenue lines."]],
   tension:"Private forwarding spreads rumors without public correction. The walls that protect a family chat also keep fact-checkers out." },
 { k:"aspire", title:"The self as portfolio", ids:["li","pi"], topo:"grid",
   topoCap:"A board of saved items arranging itself around a future self.",
   thesis:"Two platforms organized around a future self rather than around other people: the professional you want to be seen as, and the home, outfit or event you are planning toward.",
   reads:[
    ["José van Dijck", [["vandijck2013"]], "LinkedIn turns relationships into countable connectivity: connections, endorsements, profile views. It reports registered members rather than monthly users, which measures presence as accumulation."],
    ["Douglas Rushkoff", [["rushkoff2010"]], "Users learn the genre the system rewards. The one-sentence-per-line professional post is people programming themselves to the feed."],
    ["Neil Postman", [["postman1992"]], "A technopoly measures what it can count. Career becomes a dashboard of signals."],
    ["Wendy Hui Kyong Chun", [["chun2016"]], "Pinterest runs on a gentler habit: saving for later. People often describe it as calm, because it is oriented to plans rather than to other people. It is also a shopping funnel."],
    ["Empirical counterpoint", [["rajkumar2022"]], "Large-scale randomized experiments on LinkedIn's 'People You May Know' feature found that moderately weak ties, measured by mutual connections, produced the most job mobility. On this narrow but important outcome, the weak-tie network works."]],
   tension:"These are the least theorized platforms on the list, perhaps because they are the least dramatic. That may be a blind spot: they shape working lives and spending more directly than the public squares do." }
];

SME.THINKERS = [
 { n:"Marshall McLuhan", s:"Ecologist", e:"Pre-web", refs:["mcluhan1964","mcluhan1988"], d:"The form of a medium reshapes perception and society more than any message it carries. Hot and cool media; the tetrad." },
 { n:"Harold Innis", s:"Ecologist", e:"Pre-web", refs:["innis1950","innis1951"], d:"Every medium is biased toward time (durability, tradition) or space (reach, administration), and power organizes around that bias." },
 { n:"Walter Ong", s:"Ecologist", e:"Pre-web", refs:["ong1982"], d:"Electronic media produce a 'secondary orality' that revives the communal, present-tense habits of spoken culture." },
 { n:"Neil Postman", s:"Ecologist", e:"Pre-web", refs:["postman1985","postman1992"], d:"Each medium carries an epistemology. Television turned public discourse into entertainment; a technopoly defers to technique." },
 { n:"Raymond Williams", s:"Critic", e:"Pre-web", refs:["williams1974"], d:"Technologies come from social intentions, not the reverse. Introduced 'flow' and 'mobile privatisation'." },
 { n:"Ivan Illich", s:"Critic", e:"Pre-web", refs:["illich1973"], d:"Tools should expand people's autonomy and be shapeable by them; past a threshold, tools and institutions begin to control their users." },
 { n:"Douglas Rushkoff", s:"Ecologist", e:"Web era", refs:["rushkoff2010","rushkoff2013","rushkoff2019"], d:"If you don't understand the biases of the systems you use, you are being programmed by them. Digital life collapses narrative into the present." },
 { n:"Evgeny Morozov", s:"Critic", e:"Web era", refs:["morozov2011","morozov2013"], d:"Internet-centrism and solutionism: the mistaken belief that technology settles political and social problems." },
 { n:"danah boyd", s:"Ethnographer", e:"Platform era", refs:["boyd2010","boyd2014","marwick2011"], d:"Networked publics are persistent, visible, spreadable and searchable (2014; her 2010 list was persistence, replicability, scalability and searchability), producing context collapse. Privacy is control over context." },
 { n:"José van Dijck", s:"Critic", e:"Platform era", refs:["vandijck2013","vandijck2018"], d:"Platforms convert sociality into connectivity and become the infrastructure of public life, with their owners setting the rules." },
 { n:"Wendy Hui Kyong Chun", s:"Critic", e:"Platform era", refs:["chun2016"], d:"New media matter most when they become habits; constant updating keeps users in place." },
 { n:"Shoshana Zuboff", s:"Critic", e:"Platform era", refs:["zuboff2019"], d:"Behavioral data is the raw material and prediction the product. Platforms sell certainty about what you will do." },
 { n:"Cory Doctorow", s:"Critic", e:"Platform era", refs:["doctorow2023","doctorow2025"], d:"Platforms decay in stages: first good to users; then users are squeezed for business customers; then business customers are squeezed so the platform keeps the value. The remedies are interoperability and the right to leave." },
 { n:"Yochai Benkler", s:"Optimist", e:"Web era", refs:["benkler2006"], d:"Commons-based peer production lets people make information goods together outside markets and firms." },
 { n:"Clay Shirky", s:"Optimist", e:"Web era", refs:["shirky2008","shirky2010"], d:"When group-forming becomes nearly free, collective action and creation expand." },
 { n:"Henry Jenkins", s:"Optimist", e:"Web era", refs:["jenkins2006","jenkins2013"], d:"Audiences are participants who remix and circulate media; value comes from that spread." }
];

SME.LIMITS = [
 ["Determinism versus choice.", "McLuhan and Postman treat a medium as a force that reshapes us whatever we intend. Williams and Morozov treat it as the product of decisions by owners and engineers. The clearest natural experiment favors Williams: Twitter became X with largely the same software and a new owner, and within two years its norms and its audience had changed."],
 ["The retreat is partial.", "The story that people fled public feeds for group chats is only half true. Instagram reached 2 billion daily users and Threads passed 500 million monthly users in 2026. People added private rooms; they did not leave the feeds."],
 ["Decentralization has not won on scale.", "Bluesky's mobile audience fell to about 10 million monthly users by mid-2026, and Mastodon has under a million. Illich would say conviviality was never about size. A market analyst would say network effects won again."],
 ["Most of the canon predates the smartphone.", "Innis died in 1952, McLuhan in 1980, Williams in 1988, Illich in 2002, Ong and Postman in 2003. Their frameworks endure because they describe forms, not apps. Recommendation systems trained on behavior are nonetheless a genuinely new form; Zuboff, Chun, van Dijck and Doctorow are the writers who addressed it directly."],
 ["The optimists were partly right.", "Benkler, Shirky and Jenkins predicted cheap publishing, collective creation and participatory fan cultures, and all of that happened on these platforms. What they underestimated was who would capture the value. Doctorow's model describes exactly that gap."]
];
