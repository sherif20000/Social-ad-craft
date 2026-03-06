export const PLATFORMS = [
  { id: 'facebook', name: 'Facebook', color: '#1877F2' },
  { id: 'instagram', name: 'Instagram', color: '#E1306C' },
  { id: 'twitter', name: 'X / Twitter', color: '#14171A' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2' },
  { id: 'tiktok', name: 'TikTok', color: '#010101' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000' },
  { id: 'pinterest', name: 'Pinterest', color: '#E60023' },
  { id: 'snapchat', name: 'Snapchat', color: '#FFFC00' },
  { id: 'google', name: 'Google Ads', color: '#4285F4' },
];

export const OBJECTIVES = [
  { id: 'traffic', name: 'Traffic', hasCta: true, defaultCta: 'Learn More' },
  { id: 'sales', name: 'Sales / Conversions', hasCta: true, defaultCta: 'Shop Now' },
  { id: 'leads', name: 'Lead Generation', hasCta: true, defaultCta: 'Sign Up' },
  { id: 'awareness', name: 'Awareness / Reach', hasCta: false, defaultCta: '' },
  { id: 'engagement', name: 'Engagement', hasCta: false, defaultCta: '' },
  { id: 'app_install', name: 'App Installs', hasCta: true, defaultCta: 'Install Now' },
  { id: 'video_views', name: 'Video Views', hasCta: true, defaultCta: 'Watch More' },
];

export const PLATFORM_FORMATS = {
  facebook: [
    { id: 'single_image', name: 'Single Image' },
    { id: 'carousel', name: 'Carousel' },
    { id: 'video', name: 'Video' },
    { id: 'story', name: 'Story' },
  ],
  instagram: [
    { id: 'single_image', name: 'Single Image' },
    { id: 'carousel', name: 'Carousel' },
    { id: 'video', name: 'Reels / Video' },
    { id: 'story', name: 'Story' },
  ],
  twitter: [
    { id: 'single_image', name: 'Single Image' },
    { id: 'carousel', name: 'Carousel' },
    { id: 'video', name: 'Video' },
  ],
  linkedin: [
    { id: 'single_image', name: 'Single Image' },
    { id: 'carousel', name: 'Carousel (Document)' },
    { id: 'video', name: 'Video' },
  ],
  tiktok: [
    { id: 'in_feed', name: 'In-Feed Video' },
    { id: 'spark', name: 'Spark Ad' },
    { id: 'top_view', name: 'TopView' },
  ],
  youtube: [
    { id: 'in_stream', name: 'In-Stream (Skippable)' },
    { id: 'in_feed', name: 'In-Feed Video' },
    { id: 'shorts', name: 'Shorts' },
    { id: 'bumper', name: 'Bumper (6s)' },
  ],
  pinterest: [
    { id: 'standard', name: 'Standard Pin' },
    { id: 'carousel', name: 'Carousel Pin' },
    { id: 'video', name: 'Video Pin' },
  ],
  snapchat: [
    { id: 'single', name: 'Single Image / Video' },
    { id: 'story', name: 'Story Ad' },
    { id: 'collection', name: 'Collection Ad' },
  ],
  google: [
    { id: 'search', name: 'Search Ad' },
    { id: 'display', name: 'Display Ad' },
    { id: 'shopping', name: 'Shopping Ad' },
  ],
};

export const PLACEHOLDER_IMAGE = 'https://images.unsplash.com/photo-1662350689147-3d6c67b7cd10?w=600&q=80';

export const CAROUSEL_PLACEHOLDERS = [
  'https://images.unsplash.com/photo-1662350689147-3d6c67b7cd10?w=400&q=80',
  'https://images.unsplash.com/photo-1760108232787-40ec40f9a706?w=400&q=80',
  'https://images.unsplash.com/photo-1758275557784-39516582a05d?w=400&q=80',
];

export const DEFAULT_AD_DATA = {
  brandName: 'Your Brand',
  brandHandle: '@yourbrand',
  profileImage: '',
  caption: 'Discover our latest collection crafted for those who demand quality. Shop now and get 20% off your first order.',
  headline: 'Shop the Collection',
  description: 'Premium quality. Limited time offer. Free shipping on orders over $50.',
  ctaText: 'Shop Now',
  ctaLink: 'yourbrand.com',
  mediaUrl: '',
  mediaType: 'image',
  objective: 'traffic',
  adFormat: 'single_image',
  carouselCards: [
    { imageUrl: '', headline: 'Summer Collection', description: 'New arrivals for the season' },
    { imageUrl: '', headline: 'Best Sellers', description: 'Our most popular items' },
    { imageUrl: '', headline: 'Limited Edition', description: 'Only available this week' },
  ],
};

export const CTA_OPTIONS = [
  'Shop Now', 'Learn More', 'Sign Up', 'Download', 'Book Now',
  'Contact Us', 'Get Quote', 'Subscribe', 'Watch More', 'Apply Now',
  'Get Offer', 'Order Now', 'See Menu', 'Buy Tickets', 'Install Now',
];

export const PLATFORM_SPECS = {
  facebook: {
    caption: { recommended: 125, max: 63206 },
    headline: { recommended: 40, max: 255 },
    description: { recommended: 30, max: 255 },
    dimensions: { single_image: '1080x1080 (1:1)', carousel: '1080x1080 /card', video: '1080x1080 or 1920x1080', story: '1080x1920 (9:16)' },
  },
  instagram: {
    caption: { recommended: 125, max: 2200 },
    headline: { recommended: 40, max: 100 },
    description: { recommended: 30, max: 100 },
    dimensions: { single_image: '1080x1080 (1:1)', carousel: '1080x1080 /card', video: '1080x1920 (Reels)', story: '1080x1920 (9:16)' },
  },
  twitter: {
    caption: { recommended: 280, max: 280 },
    headline: { recommended: 70, max: 70 },
    description: { recommended: 200, max: 200 },
    dimensions: { single_image: '1200x675 (16:9)', carousel: '800x418 /card', video: '1920x1080 (16:9)' },
  },
  linkedin: {
    caption: { recommended: 150, max: 700 },
    headline: { recommended: 70, max: 200 },
    description: { recommended: 100, max: 300 },
    dimensions: { single_image: '1200x627 (1.91:1)', carousel: '1080x1080 /card', video: '1920x1080 (16:9)' },
  },
  tiktok: {
    caption: { recommended: 100, max: 2200 },
    headline: { recommended: 40, max: 100 },
    description: { recommended: 100, max: 300 },
    dimensions: { in_feed: '1080x1920 (9:16)', spark: '1080x1920 (9:16)', top_view: '1080x1920 (9:16)' },
  },
  youtube: {
    caption: { recommended: 150, max: 5000 },
    headline: { recommended: 70, max: 100 },
    description: { recommended: 150, max: 5000 },
    dimensions: { in_stream: '1920x1080 (16:9)', in_feed: '1920x1080 (16:9)', shorts: '1080x1920 (9:16)', bumper: '1920x1080 (16:9)' },
  },
  pinterest: {
    caption: { recommended: 100, max: 500 },
    headline: { recommended: 40, max: 100 },
    description: { recommended: 100, max: 500 },
    dimensions: { standard: '1000x1500 (2:3)', carousel: '1000x1500 /pin', video: '1000x1500 (2:3)' },
  },
  snapchat: {
    caption: { recommended: 80, max: 160 },
    headline: { recommended: 34, max: 34 },
    description: { recommended: 100, max: 200 },
    dimensions: { single: '1080x1920 (9:16)', story: '1080x1920 (9:16)', collection: '1080x1920 (9:16)' },
  },
  google: {
    caption: { recommended: 90, max: 90 },
    headline: { recommended: 30, max: 30 },
    description: { recommended: 90, max: 90 },
    dimensions: { search: 'Text only', display: '1200x628 (1.91:1)', shopping: '800x800 (1:1)' },
  },
};
