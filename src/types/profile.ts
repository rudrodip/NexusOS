export type profile = {
  username: string;
  bio: string | null;
  email: string | null;
  location: string | null;
  blog: string | null;
  company: string | null;
  twitter_username: string | null;
  avatar_url: string;
  html_url: string;
  skills: string[];
  tags: string[];
  categories: string[],
}