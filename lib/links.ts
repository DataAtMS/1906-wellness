export type LinkItem = {
  title: string;
  url: string;
  description: string;
};

export type LinkSection = {
  heading: string;
  items: LinkItem[];
};

export const cannabisLinks: LinkSection[] = [
  {
    heading: "News Outlets",
    items: [
      {
        title: "Marijuana Moment",
        url: "https://www.marijuanamoment.net/",
        description:
          "Daily reporting on cannabis policy, legislation, and federal action in the United States.",
      },
      {
        title: "MJBizDaily",
        url: "https://mjbizdaily.com/",
        description:
          "Business-focused coverage of the legal cannabis industry, including markets, finance, and operations.",
      },
      {
        title: "Leafly News",
        url: "https://www.leafly.com/news",
        description:
          "Consumer-oriented cannabis news covering products, policy, science, and culture.",
      },
      {
        title: "Cannabis Business Times",
        url: "https://www.cannabisbusinesstimes.com/",
        description:
          "Trade publication covering cultivation, retail, and regulation across the cannabis sector.",
      },
      {
        title: "Green Market Report",
        url: "https://www.greenmarketreport.com/",
        description:
          "Financial news and market analysis for the cannabis and hemp industries.",
      },
      {
        title: "Cannabis Wire",
        url: "https://cannabiswire.com/",
        description:
          "Independent journalism focused on cannabis policy, science, and industry.",
      },
    ],
  },
  {
    heading: "Research Institutions",
    items: [
      {
        title: "National Institute on Drug Abuse: Cannabis",
        url: "https://nida.nih.gov/research-topics/cannabis-marijuana",
        description:
          "Federal research portal summarizing studies on cannabis use, health effects, and treatment.",
      },
      {
        title: "National Library of Medicine: Cannabinoids",
        url: "https://pubmed.ncbi.nlm.nih.gov/?term=cannabinoids",
        description:
          "PubMed search interface for peer-reviewed cannabinoid research from biomedical journals worldwide.",
      },
      {
        title: "NORML",
        url: "https://norml.org/",
        description:
          "Long-running advocacy and information clearinghouse for cannabis policy and law.",
      },
      {
        title: "Project CBD",
        url: "https://www.projectcbd.org/",
        description:
          "Educational nonprofit publishing accessible summaries of cannabinoid research and clinical findings.",
      },
      {
        title: "NIH National Center for Complementary and Integrative Health: Cannabis",
        url: "https://www.nccih.nih.gov/health/cannabis-marijuana-and-cannabinoids-what-you-need-to-know",
        description:
          "Federal overview of cannabis and cannabinoids written for general audiences.",
      },
      {
        title: "Centers for Disease Control: Marijuana and Public Health",
        url: "https://www.cdc.gov/cannabis/about/index.html",
        description:
          "Public health information on cannabis use, risks, and surveillance data.",
      },
    ],
  },
  {
    heading: "Industry Publications",
    items: [
      {
        title: "Ganjapreneur",
        url: "https://www.ganjapreneur.com/news/",
        description:
          "Independent cannabis industry news covering business, culture, policy, and emerging brands.",
      },
      {
        title: "High Times",
        url: "https://hightimes.com/",
        description:
          "Long-running cannabis culture, lifestyle, and industry publication.",
      },
      {
        title: "Cannabis Now",
        url: "https://cannabisnow.com/",
        description:
          "Editorial coverage of cannabis culture, business, and advocacy.",
      },
      {
        title: "Hemp Industry Daily",
        url: "https://hempindustrydaily.com/",
        description:
          "Trade publication for hemp growers, processors, and product makers.",
      },
      {
        title: "The New York Times: Marijuana Coverage",
        url: "https://www.nytimes.com/topic/subject/marijuana-and-medical-marijuana",
        description:
          "New York Times topic page aggregating reporting on cannabis policy, business, and culture.",
      },
      {
        title: "Benzinga Cannabis",
        url: "https://www.benzinga.com/cannabis",
        description:
          "Markets-focused cannabis news with public company coverage and analyst commentary.",
      },
    ],
  },
  {
    heading: "Regulatory Bodies",
    items: [
      {
        title: "U.S. Food and Drug Administration: Cannabis Regulation",
        url: "https://www.fda.gov/news-events/public-health-focus/fda-regulation-cannabis-and-cannabis-derived-products-including-cannabidiol-cbd",
        description:
          "Official FDA overview of how cannabis and CBD products are regulated under federal law.",
      },
      {
        title: "Drug Enforcement Administration: Marijuana",
        url: "https://www.dea.gov/drug-information/drug-policy",
        description:
          "Federal drug policy information including marijuana scheduling and enforcement.",
      },
      {
        title: "USDA Hemp Program",
        url: "https://www.ams.usda.gov/rules-regulations/hemp",
        description:
          "U.S. Department of Agriculture regulations covering domestic hemp production and licensing.",
      },
      {
        title: "Colorado Marijuana Enforcement Division",
        url: "https://sbg.colorado.gov/med",
        description:
          "Example state-level cannabis regulatory body; oversees licensing and compliance in Colorado.",
      },
      {
        title: "California Department of Cannabis Control",
        url: "https://cannabis.ca.gov/",
        description:
          "State agency overseeing licensing and regulation of cannabis businesses in California.",
      },
      {
        title: "New York Office of Cannabis Management",
        url: "https://cannabis.ny.gov/",
        description:
          "Regulatory authority for adult-use and medical cannabis in New York State.",
      },
      {
        title: "Congressional Research Service: Cannabis Policy",
        url: "https://crsreports.congress.gov/product/pdf/R/R44782",
        description:
          "Nonpartisan congressional research overview of federal marijuana policy and pending legislation.",
      },
    ],
  },
];

export const wellnessLinks: LinkSection[] = [
  {
    heading: "Government and Public Health",
    items: [
      {
        title: "Centers for Disease Control and Prevention",
        url: "https://www.cdc.gov/",
        description:
          "Federal public health agency providing guidance on disease prevention, nutrition, and healthy living.",
      },
      {
        title: "National Institutes of Health",
        url: "https://www.nih.gov/health-information",
        description:
          "Federal biomedical research agency with health topic summaries written for general audiences.",
      },
      {
        title: "National Institute on Aging",
        url: "https://www.nia.nih.gov/health",
        description:
          "Federal resource on healthy aging, cognition, sleep, and chronic conditions.",
      },
      {
        title: "National Library of Medicine: MedlinePlus",
        url: "https://medlineplus.gov/",
        description:
          "Plain-language health information from the National Library of Medicine.",
      },
      {
        title: "Office of Disease Prevention and Health Promotion",
        url: "https://odphp.health.gov/",
        description:
          "Federal office publishing dietary, physical activity, and prevention guidelines.",
      },
      {
        title: "U.S. Department of Health and Human Services",
        url: "https://www.hhs.gov/",
        description:
          "Federal department overseeing health policy, programs, and consumer health resources.",
      },
    ],
  },
  {
    heading: "Research Institutions",
    items: [
      {
        title: "Mayo Clinic",
        url: "https://www.mayoclinic.org/healthy-lifestyle",
        description:
          "Nonprofit academic medical center publishing evidence-based health and wellness articles.",
      },
      {
        title: "Cleveland Clinic Health Library",
        url: "https://my.clevelandclinic.org/health",
        description:
          "Clinician-reviewed information on conditions, treatments, and preventive health.",
      },
      {
        title: "Johns Hopkins Medicine Health Library",
        url: "https://www.hopkinsmedicine.org/health",
        description:
          "Academic medical center publishing patient-facing health and wellness content.",
      },
      {
        title: "Harvard Health Publishing",
        url: "https://www.health.harvard.edu/",
        description:
          "Consumer health publishing arm of Harvard Medical School covering nutrition, mental health, and prevention.",
      },
      {
        title: "Stanford Center on Longevity",
        url: "https://longevity.stanford.edu/",
        description:
          "Stanford research center publishing on healthy aging, cognition, and lifestyle.",
      },
      {
        title: "University of California, San Francisco Health",
        url: "https://www.ucsfhealth.org/education",
        description:
          "Academic medical center patient education library covering broad wellness topics.",
      },
    ],
  },
  {
    heading: "Wellness Publications",
    items: [
      {
        title: "Healthline",
        url: "https://www.healthline.com/",
        description:
          "Consumer wellness publication with medically reviewed articles on nutrition, fitness, and conditions.",
      },
      {
        title: "Everyday Health",
        url: "https://www.everydayhealth.com/",
        description:
          "Consumer-facing wellness publication covering chronic conditions, fitness, and lifestyle.",
      },
      {
        title: "Verywell Health",
        url: "https://www.verywellhealth.com/",
        description:
          "Reviewed health and wellness content for general readers across conditions and prevention.",
      },
      {
        title: "Verywell Mind",
        url: "https://www.verywellmind.com/",
        description:
          "Mental health and behavioral wellness publication with clinician-reviewed articles.",
      },
      {
        title: "SELF: Health",
        url: "https://www.self.com/health",
        description:
          "General-interest wellness coverage including fitness, mental health, and nutrition.",
      },
      {
        title: "The New York Times: Well",
        url: "https://www.nytimes.com/section/well",
        description:
          "Wellness section of The New York Times covering research, behavior, and longevity.",
      },
    ],
  },
  {
    heading: "Specialty Topics",
    items: [
      {
        title: "Sleep Foundation",
        url: "https://www.sleepfoundation.org/",
        description:
          "Nonprofit publishing evidence-based information on sleep health and disorders.",
      },
      {
        title: "American Heart Association",
        url: "https://www.heart.org/en/healthy-living",
        description:
          "Healthy living resources on diet, physical activity, and cardiovascular wellness.",
      },
      {
        title: "American Psychological Association",
        url: "https://www.apa.org/topics",
        description:
          "Topic library covering stress, mindfulness, sleep, and behavioral health.",
      },
      {
        title: "Academy of Nutrition and Dietetics",
        url: "https://www.eatright.org/",
        description:
          "Professional dietetics association publishing public guidance on food and nutrition.",
      },
      {
        title: "American College of Sports Medicine",
        url: "https://www.acsm.org/",
        description:
          "Professional society publishing position stands on exercise, recovery, and physical activity.",
      },
      {
        title: "Mindful.org",
        url: "https://www.mindful.org/",
        description:
          "Magazine and online publication covering mindfulness practice and research.",
      },
      {
        title: "Greater Good Science Center",
        url: "https://greatergood.berkeley.edu/",
        description:
          "UC Berkeley research center publishing on well-being, gratitude, and prosocial behavior.",
      },
    ],
  },
];
