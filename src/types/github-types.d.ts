export type Repository = {
  url: string;
  name: string;
  description: string | null;
  stargazerCount: number;
  primaryLanguage: {
    name: string;
  };
};

export type PageInfo = {
  hasNextPage: boolean;
  endCursor: string | null;
};

export type RepositoryOwner = {
  repositories: {
    totalCount: number;
    pageInfo: PageInfo;
    nodes: Repository[];
  };
};

export type ReposGraphQLResponse = {
  repositoryOwner: RepositoryOwner | null;
};

export type userDataResponse = {
  search: {
    edges: {
      node: userData;
    }[];
  };
};

export type userData = {
  name: string;
  email: string;
  bio: string;
  location: string;
  avatarUrl: string;
  company: string | null;
  twitterUsername: string;
  bioHTML: string;
  websiteUrl: string | null;
};

export type RepoInfoRes = {
  user: {
    followers: {
      totalCount: number;
    }
    repositories: {
      nodes: {
        forkCount: number;
        stargazerCount: number;
        primaryLanguage: {
          name: string;
        };
      }[];
    };
  };
};

export type ContribStats = {
  user: {
    contributionsCollection: {
      totalCommitContributions: number;
      totalPullRequestContributions: number;
      totalRepositoryContributions: number;
      totalIssueContributions: number;
    }
  };
};
