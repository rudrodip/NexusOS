type RepoSearchResult = {
  total_count: number;
  incomplete_results: boolean;
  items: RepoSearchResultItem[];
};

type RepoSearchResultItem = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: SimpleUser | null;
  private: boolean;
  html_url?: string | undefined;
  description: string | null;
  fork: boolean;
  url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  master_branch?: string | undefined;
  default_branch: string;
  score: number;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  forks: number;
  archived: boolean;
  disabled: boolean;
  visibility?: string | undefined;
  license: LicenseSimple | null | undefined;
  permissions?:
    | {
        admin: boolean;
        maintain?: boolean | undefined;
        push: boolean;
        triage?: boolean | undefined;
        pull: boolean;
      }
    | undefined;
  text_matches?:
    | {
        object_url?: string | undefined;
        object_type?: string | null | undefined;
        property?: string | undefined;
        fragment?: string | undefined;
        matches?:
          | { text?: string | undefined; indices?: number[] | undefined }[]
          | undefined;
      }[]
    | undefined;
  temp_clone_token?: string | undefined;
  allow_merge_commit?: boolean | undefined;
  allow_squash_merge?: boolean | undefined;
  allow_rebase_merge?: boolean | undefined;
  allow_auto_merge?: boolean | undefined;
  delete_branch_on_merge?: boolean | undefined;
  allow_forking?: boolean | undefined;
  is_template?: boolean | undefined;
  web_commit_signoff_required?: boolean | undefined;
  topics?: string[] | undefined;
  mirror_url: string | null;
  has_issues?: boolean | undefined;
  has_projects?: boolean | undefined;
  has_pages?: boolean | undefined;
  has_wiki?: boolean | undefined;
  has_downloads?: boolean | undefined;
  has_discussions?: boolean | undefined;
};

type SimpleUser = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null | undefined;
  url: string;
  html_url?: string | undefined;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

type LicenseSimple = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string | undefined;
};

type SearchTextMatchItem = {
  text: string;
  indices: number[];
};

type OctokitRepoSearchResponse = {
  data: {
    total_count: number;
    incomplete_results: boolean;
    items: RepoSearchResultItem[];
  };
};

export {
  RepoSearchResult,
  OctokitRepoSearchResponse,
  RepoSearchResultItem,
  SimpleUser,
  LicenseSimple,
  SearchTextMatchItem,
};
