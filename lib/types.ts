export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  per_page: number;
};

export type Short = {
  id: string;
  youtube_id: string;
  title: string;
  description?: string | null;
  thumbnail_url?: string | null;
  duration_seconds?: number | null;
  published_at?: string | null;
  view_count?: number;
  like_count?: number;
  comment_count?: number;
  is_featured?: boolean;
  is_trending?: boolean;
  sort_order?: number;
  last_synced_at?: string | null;
};

export type GalleryImage = {
  id: string;
  title?: string | null;
  description?: string | null;
  image_url: string;
  cloudinary_public_id?: string | null;
  width?: number | null;
  height?: number | null;
  tags?: string[];
  sort_order?: number;
  is_visible?: boolean;
  created_at?: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  url: string;
  handle?: string | null;
  icon?: string | null;
  sort_order: number;
  is_visible: boolean;
};

export type ContactInfo = {
  email?: string | null;
  business_email?: string | null;
  location?: string | null;
  note?: string | null;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type Favorite = {
  id: string;
  category: string;
  title: string;
  subtitle?: string | null;
  image_url?: string | null;
  link?: string | null;
  note?: string | null;
  sort_order: number;
  created_at?: string;
};

export type AboutContent = {
  headline?: string | null;
  bio?: string | null;
  avatar_url?: string | null;
  highlights?: Array<{ label: string; value: string; icon?: string }>;
};

export type HomepageSection = {
  section: string;
  data: Record<string, unknown>;
};

export type SiteSetting = {
  key: string;
  value: Record<string, unknown>;
};

export type Analytics = {
  shorts_total: number;
  gallery_total: number;
  messages_total: number;
  messages_unread: number;
  favorites_total: number;
  total_views: number;
  last_sync_at?: string | null;
};

export type Activity = {
  id: string;
  actor_email?: string | null;
  action: string;
  target?: string | null;
  metadata?: Record<string, unknown>;
  created_at: string;
};
