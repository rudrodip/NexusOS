export type project = {
  authorId: string;
  frameworks: string[];
  categories: string[];
  image_url?: string;
  tags: string[];
  url?: string;
  repo_url: string;

  pre_contributors: string[];
  contributors: string[];
}