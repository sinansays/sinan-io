/*
  Social Medium Ecology — bibliography
  Chicago author-date style. Keys are used in citations across the site: cite("williams1974","ch. 4").
*/
window.SME = window.SME || {};

SME.REFS = {
  /* Media ecology */
  mcluhan1964:   { a:"McLuhan, Marshall", y:1964, t:"Understanding Media: The Extensions of Man", p:"New York: McGraw-Hill" },
  mcluhan1988:   { a:"McLuhan, Marshall, and Eric McLuhan", y:1988, t:"Laws of Media: The New Science", p:"Toronto: University of Toronto Press" },
  innis1950:     { a:"Innis, Harold A.", y:1950, t:"Empire and Communications", p:"Oxford: Clarendon Press" },
  innis1951:     { a:"Innis, Harold A.", y:1951, t:"The Bias of Communication", p:"Toronto: University of Toronto Press" },
  ong1982:       { a:"Ong, Walter J.", y:1982, t:"Orality and Literacy: The Technologizing of the Word", p:"London: Methuen" },
  postman1985:   { a:"Postman, Neil", y:1985, t:"Amusing Ourselves to Death: Public Discourse in the Age of Show Business", p:"New York: Viking" },
  postman1992:   { a:"Postman, Neil", y:1992, t:"Technopoly: The Surrender of Culture to Technology", p:"New York: Knopf" },
  rushkoff2010:  { a:"Rushkoff, Douglas", y:2010, t:"Program or Be Programmed: Ten Commands for a Digital Age", p:"New York: OR Books" },
  rushkoff2013:  { a:"Rushkoff, Douglas", y:2013, t:"Present Shock: When Everything Happens Now", p:"New York: Current" },
  rushkoff2019:  { a:"Rushkoff, Douglas", y:2019, t:"Team Human", p:"New York: W. W. Norton" },

  /* Cultural materialism, critique, political economy */
  williams1974:  { a:"Williams, Raymond", y:1974, t:"Television: Technology and Cultural Form", p:"London: Fontana" },
  illich1973:    { a:"Illich, Ivan", y:1973, t:"Tools for Conviviality", p:"New York: Harper & Row" },
  morozov2011:   { a:"Morozov, Evgeny", y:2011, t:"The Net Delusion: The Dark Side of Internet Freedom", p:"New York: PublicAffairs" },
  morozov2013:   { a:"Morozov, Evgeny", y:2013, t:"To Save Everything, Click Here: The Folly of Technological Solutionism", p:"New York: PublicAffairs" },
  vandijck2013:  { a:"van Dijck, José", y:2013, t:"The Culture of Connectivity: A Critical History of Social Media", p:"New York: Oxford University Press" },
  vandijck2018:  { a:"van Dijck, José, Thomas Poell, and Martijn de Waal", y:2018, t:"The Platform Society: Public Values in a Connective World", p:"New York: Oxford University Press" },
  chun2016:      { a:"Chun, Wendy Hui Kyong", y:2016, t:"Updating to Remain the Same: Habitual New Media", p:"Cambridge, MA: MIT Press" },
  zuboff2019:    { a:"Zuboff, Shoshana", y:2019, t:"The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power", p:"New York: PublicAffairs" },
  doctorow2023:  { a:"Doctorow, Cory", y:2023, t:"The 'Enshittification' of TikTok: Or How, Exactly, Platforms Die", p:"Wired, 23 January 2023. First published as \u201cTiktok\u2019s Enshittification,\u201d Pluralistic, 21 January 2023", article:true,
                   url:"https://www.wired.com/story/tiktok-platforms-cory-doctorow/" },
  doctorow2025:  { a:"Doctorow, Cory", y:2025, t:"Enshittification: Why Everything Suddenly Got Worse and What to Do About It", p:"New York: MCD / Farrar, Straus and Giroux" },

  /* Networked publics */
  boyd2010:      { a:"boyd, danah", y:2010, t:"Social Network Sites as Networked Publics: Affordances, Dynamics, and Implications", p:"In A Networked Self: Identity, Community, and Culture on Social Network Sites, edited by Zizi Papacharissi, 39–58. New York: Routledge", article:true },
  boyd2014:      { a:"boyd, danah", y:2014, t:"It's Complicated: The Social Lives of Networked Teens", p:"New Haven: Yale University Press" },
  marwick2011:   { a:"Marwick, Alice E., and danah boyd", y:2011, t:"I Tweet Honestly, I Tweet Passionately: Twitter Users, Context Collapse, and the Imagined Audience", p:"New Media & Society 13 (1): 114–33", article:true,
                   url:"https://doi.org/10.1177/1461444810365313" },

  /* Optimists */
  benkler2006:   { a:"Benkler, Yochai", y:2006, t:"The Wealth of Networks: How Social Production Transforms Markets and Freedom", p:"New Haven: Yale University Press" },
  shirky2008:    { a:"Shirky, Clay", y:2008, t:"Here Comes Everybody: The Power of Organizing Without Organizations", p:"New York: Penguin Press" },
  shirky2010:    { a:"Shirky, Clay", y:2010, t:"Cognitive Surplus: Creativity and Generosity in a Connected Age", p:"New York: Penguin Press" },
  jenkins2006:   { a:"Jenkins, Henry", y:2006, t:"Convergence Culture: Where Old and New Media Collide", p:"New York: New York University Press" },
  jenkins2013:   { a:"Jenkins, Henry, Sam Ford, and Joshua Green", y:2013, t:"Spreadable Media: Creating Value and Meaning in a Networked Culture", p:"New York: New York University Press" },

  /* Empirical */
  rajkumar2022:  { a:"Rajkumar, Karthik, Guillaume Saint-Jacques, Iavor Bojinov, Erik Brynjolfsson, and Sinan Aral", y:2022, t:"A Causal Test of the Strength of Weak Ties", p:"Science 377 (6612): 1304–10", article:true,
                   url:"https://doi.org/10.1126/science.abl4476" },
  covington2016: { a:"Covington, Paul, Jay Adams, and Emre Sargin", y:2016, t:"Deep Neural Networks for YouTube Recommendations", p:"Proceedings of the 10th ACM Conference on Recommender Systems (RecSys '16), 191–98", article:true,
                   url:"https://doi.org/10.1145/2959100.2959190" },

  /* Platform history */
  "hist-fb-feed":     { a:"The Next Web", y:2009, t:"Facebook launches new homepage with Top News as the default feed", p:"The Next Web, 23 October 2009", article:true, url:"https://thenextweb.com/news/facebook-live-homepage" },
  "hist-yt-watchtime":{ a:"YouTube", y:2012, t:"YouTube Search, Now Optimized for Time Watched", p:"YouTube Official Blog, 12 October 2012 (Suggested Videos had moved to watch time in March 2012)", article:true, url:"https://blog.youtube/news-and-events/youtube-search-now-optimized-for-time/" },
  "hist-ig-2016":     { a:"Instagram", y:2016, t:"See the Moments You Care About First", p:"Instagram blog, 15 March 2016", article:true, url:"https://business.instagram.com/blog/see-the-moments-you-care-about-first" },
  "hist-tw-2016":     { a:"Twitter", y:2016, t:"Never Miss Important Tweets from People You Follow", p:"Twitter blog, 10 February 2016 (opt-in; on by default from March 2016)", article:true, url:"https://blog.x.com/official/en_us/a/2016/never-miss-important-tweets-from-people-you-follow.html" },
  "hist-tiktok-2018": { a:"TikTok", y:2018, t:"musical.ly and TikTok Unite to Debut New Worldwide Short-Form Video Platform", p:"TikTok Newsroom, 2 August 2018", article:true, url:"https://newsroom.tiktok.com/musical-ly-and" },
  "hist-reels-2020":  { a:"Instagram", y:2020, t:"Introducing Instagram Reels", p:"Instagram blog, 5 August 2020", article:true, url:"https://about.instagram.com/blog/announcements/introducing-instagram-reels-announcement" },
  "hist-threads-2023":{ a:"Meta", y:2023, t:"Introducing Threads: A New Way to Share With Text", p:"Meta newsroom, 5 July 2023 (X's For You tab became the default in January 2023)", article:true, url:"https://about.fb.com/news/2023/07/introducing-threads-new-app-text-sharing/" }
};
