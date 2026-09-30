import { EventDetails, AiControls } from '../types';

export interface DemoPreset {
  id: string;
  label: string;
  tag: string;
  eventDetails: EventDetails;
  controls: AiControls;
}

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'ai-summit',
    label: 'Global AI & Robotics Summit 2026',
    tag: 'Tech & AI Conference',
    eventDetails: {
      name: 'Global AI & Robotics Summit 2026',
      date: 'November 12-14, 2026 • 9:00 AM - 6:00 PM EST',
      location: 'Metropolitan Innovation Center, San Francisco, CA & Virtual Livestream',
      organizer: 'NextWave Tech Forum & Frontier Intelligence Labs',
      description: 'The premier worldwide conference uniting 2,500+ AI researchers, founders, robotics engineers, and enterprise leaders. Featuring 40+ keynote presentations, live humanoid robot demonstrations, breakthrough model architecture teardowns, and an exclusive investor matchmaking arena.',
      context: 'Announce our 48-hour Early Bird Ticket Launch with discount code "EARLYVIP" saving 30%. Emphasize limited in-person seats and high-profile keynote speaker reveals.',
    },
    controls: {
      tone: 'Exciting',
      length: 'Medium',
      audience: 'Professionals',
      creativity: 'High',
      language: 'English',
    },
  },
  {
    id: 'music-fest',
    label: 'Aura Pulse Music & Visual Arts Fest',
    tag: 'Music & Cultural Arts',
    eventDetails: {
      name: 'Aura Pulse Music & Visual Arts Fest',
      date: 'July 18-19, 2026 • Gates Open 2:00 PM',
      location: 'Silver Lake Amphitheater & Art District, Austin, TX',
      organizer: 'Aura Collective & Velvet Moon Productions',
      description: 'A 2-day immersive sensory festival merging electronic, indie, and ambient live performances with 3D projection-mapped light sculptures, artisan night market, gourmet food trucks, and interactive synth installations.',
      context: 'Create high-energy lineup announcement teasing headliners, night art installations, and general admission weekend passes going live this Friday noon.',
    },
    controls: {
      tone: 'Exciting',
      length: 'Short',
      audience: 'General Public',
      creativity: 'High',
      language: 'English',
    },
  },
  {
    id: 'pitch-night',
    label: 'NextGen Founder Pitch Arena & VC Mixer',
    tag: 'Startups & Venture Capital',
    eventDetails: {
      name: 'NextGen Founder Pitch Arena & VC Mixer',
      date: 'October 28, 2026 • 6:00 PM - 9:30 PM PST',
      location: 'Founders Loft, Seattle, WA',
      organizer: 'VentureSprint Accelerator & Pacific Capital Network',
      description: 'Ten pre-seed and seed stage startups pitch live in front of a panel of tier-1 VCs and angel investors for $250,000 in non-dilutive grant funding and direct syndicate backing. Followed by an executive rooftop networking reception.',
      context: 'Call for startup founder applications and investor RSVP. Only 10 pitching slots available; deadline to apply is next Tuesday.',
    },
    controls: {
      tone: 'Professional',
      length: 'Medium',
      audience: 'Professionals',
      creativity: 'Medium',
      language: 'English',
    },
  },
  {
    id: 'charity-gala',
    label: 'CleanOceans Hope & Harmony Annual Gala',
    tag: 'Philanthropy & Charity',
    eventDetails: {
      name: 'CleanOceans Hope & Harmony Annual Gala',
      date: 'December 5, 2026 • Black Tie • 7:00 PM',
      location: 'Grand Biltmore Ballroom, Coral Gables, Miami, FL',
      organizer: 'The Blue Horizon Foundation & Marine Conservation Trust',
      description: 'An inspiring black-tie charity dinner and silent auction celebrating a decade of ocean cleanup operations. Featuring a 3-course sustainable dinner by Michelin-starred chefs, live chamber orchestra, and keynote remarks from renowned marine biologists.',
      context: 'Formal patron invitation and table sponsorship push. Highlight that 100% of auction proceeds fund autonomous coastal waste interception vessels.',
    },
    controls: {
      tone: 'Formal',
      length: 'Long',
      audience: 'General Public',
      creativity: 'Medium',
      language: 'English',
    },
  },
  {
    id: 'hackathon',
    label: 'BuildSprint: AI Agents 48-Hour Hackathon',
    tag: 'Developer & Student Hackathon',
    eventDetails: {
      name: 'BuildSprint: AI Agents 48-Hour Hackathon',
      date: 'September 19-21, 2026 • Starts Friday 5:00 PM',
      location: 'Hybrid: MIT Stata Center, Cambridge, MA + Worldwide Online',
      organizer: 'OpenSource Innovators & DevCrew Global',
      description: 'A 48-hour global hackathon challenging teams of developers, designers, and students to build autonomous AI agents solving climate tracking, healthcare triage, and developer productivity. $50,000 in cash prizes, cloud credits, and direct interview fast-tracks.',
      context: 'Hype up registration for student and professional builders. Mention free cloud API credits, mentor office hours, and prize pool.',
    },
    controls: {
      tone: 'Exciting',
      length: 'Medium',
      audience: 'Students',
      creativity: 'High',
      language: 'English',
    },
  },
];

export const CONTEXT_QUICK_PRESETS = [
  { label: '🚀 Early-Bird Ticket Launch', prompt: 'Announce early-bird tickets opening with a limited-time 20% discount code, highlighting urgency and limited seats.' },
  { label: '🎙️ Keynote & Speaker Reveal', prompt: 'Spotlight the newly announced keynote speakers and their groundbreaking session topics to build authority and anticipation.' },
  { label: '⏰ Final 24-Hour Countdown', prompt: 'Create an urgent last-chance reminder that ticket registrations close in 24 hours, emphasizing FOMO and sold-out tiers.' },
  { label: '🤝 Sponsor & Partner Spotlight', prompt: 'Thank our premier partners and sponsors, highlighting how their support enables cutting-edge experiences for attendees.' },
  { label: '🎟️ VIP & Exclusive Perks', prompt: 'Highlight the exclusive VIP pass perks including backstage access, private networking lounge, and direct speaker Q&A.' },
  { label: '📸 Post-Event Recap & Thank You', prompt: 'Express deep gratitude to all attendees, speakers, and sponsors with a vibrant recap of milestone moments and announcement of next year’s dates.' },
];
