import { graphql } from "@octokit/graphql";
import {
  userData,
  userDataResponse,
  Repository,
  RepositoryOwner,
  RepoInfoRes,
  ContribStats,
  searchRes
} from "@/types/github-types";

export const getUser = async (
  username: string | null | undefined,
  access_token: string | null | undefined
): Promise<userData> => {
  const response = await graphql<userDataResponse>(
    `
      {
        search (query: "${username}", type: USER, first: 1){
          edges {
            node {
              ... on User{
                name
                email
                bio
                location
                avatarUrl
                company
                twitterUsername
                bio
                websiteUrl
              }
            }
          }
        }
      }
      `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );
  return response.search.edges[0].node;
};

export const getPinnedRepos = async (
  username: string | null | undefined,
  access_token: string | null | undefined
) => {
  const response = await graphql<searchRes<{
    pinnedItems: { totalCount: number; nodes: Repository[] };
  }>>(
    `
    {
      search (query: "${username}", type: USER, first: 1){
        edges {
          node {
            ... on User{
              pinnedItems(first: 100, types: REPOSITORY) {
                totalCount
                nodes {
                  ... on Repository {
                    name
                    description
                    url
                    stargazerCount
                    primaryLanguage {
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );
  if (response.search.edges.length > 0){
    return response.search.edges[0].node.pinnedItems.nodes
  } else {
    throw new Error('Cannot find user')
  }
};

export const getRecentRepos = async (
  username: string | null | undefined,
  access_token: string | null | undefined
): Promise<Repository[] | undefined> => {
  const response = await graphql<searchRes<RepositoryOwner>>(
    `
    {
      search (query: "${username}", type: USER, first: 1){
        edges {
          node {
            ... on User{
              repositories(
                first: 6
                
                ownerAffiliations: OWNER
                privacy: PUBLIC
                isFork: false
                isLocked: false
                orderBy: {field: UPDATED_AT, direction: DESC}
              ) {
                totalCount
                nodes {
                  url
                  name
                  description
                  stargazerCount
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );

  if (response.search.edges.length > 0){
    return response.search.edges[0].node.repositories.nodes
  } else {
    throw new Error('Cannot find user')
  }
};

export const getContribStats = async (
  username: string | null | undefined,
  access_token: string | null | undefined
) => {
  const response = await graphql<searchRes<ContribStats>>(
    `
    {
      search (query: "${username}", type: USER, first: 1){
        edges {
          node {
            ... on User{
              contributionsCollection{
                totalCommitContributions
                totalPullRequestContributions
                totalRepositoryContributions
                totalIssueContributions
              }
            }
          }
        }
      }
    }
    `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );

  if (response.search.edges.length > 0){

    return {
      totalCommitContributions: response.search.edges[0].node.contributionsCollection.totalCommitContributions,
      totalPullRequestContributions: response.search.edges[0].node.contributionsCollection.totalPullRequestContributions,
      totalRepositoryContributions: response.search.edges[0].node.contributionsCollection.totalRepositoryContributions,
      totalIssueContributions: response.search.edges[0].node.contributionsCollection.totalIssueContributions,
    };
  } else {
    throw new Error('Cannot find user')
  }
}

export const getRepoInfo = async (
  username: string | null | undefined,
  access_token: string | null | undefined
) => {
  const response = await graphql<searchRes<RepoInfoRes>>(
    `
    {
      search (query: "${username}", type: USER, first: 1){
        edges {
          node {
            ... on User{
              followers{
                totalCount
              }
              repositories(first: 100, isFork: false, privacy: PUBLIC, ownerAffiliations: OWNER) {
                nodes {
                  forkCount
                  stargazerCount
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
    `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );

  let totalForks = 0;
  let totalStars = 0;
  let languages: string[] = [];

  if (response.search.edges.length > 0){
    const user = response.search.edges[0].node
    user.repositories.nodes.forEach((repo) => {
      totalForks += repo.forkCount;
      totalStars += repo.stargazerCount;
      repo.primaryLanguage?.name && languages.push(repo.primaryLanguage.name);
    });
  
    let tempSet = new Set(languages);
    languages = Array.from(tempSet); // Convert the Set back to an array
  
    return { followers: user.followers.totalCount, totalForks, totalStars, languages };
  } else {
    throw new Error('Cannot find user')
  }
};

