import { graphql } from "@octokit/graphql";
import {
  userData,
  userDataResponse,
  Repository,
  ReposGraphQLResponse,
  RepoInfoRes,
  ContribStats
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
  console.log(response);
  return response.search.edges[0].node;
};

export const getPinnedRepos = async (
  username: string | null | undefined,
  access_token: string | null | undefined
) => {
  const response = await graphql<{
    user: { pinnedItems: { totalCount: number; nodes: Repository[] } };
  }>(
    `
    {
      user(login: "${username}") {
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
    `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );
  return response.user.pinnedItems.nodes;
};

export const getRecentRepos = async (
  username: string | null | undefined,
  access_token: string | null | undefined
): Promise<Repository[] | undefined> => {
  const response = await graphql<ReposGraphQLResponse>(
    `
    {
      repositoryOwner(login: "${username}", ) {
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
    `,
    {
      headers: {
        authorization: `token ${access_token}`,
      },
    }
  );
  return response.repositoryOwner?.repositories.nodes;
};

export const getContribStats = async (
  username: string | null | undefined,
  access_token: string | null | undefined
) => {
  const response = await graphql<ContribStats>(
    `
    {
      user(login: "${username}"){
        contributionsCollection{
          totalCommitContributions
          totalPullRequestContributions
          totalRepositoryContributions
          totalIssueContributions
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

  return { 
    totalCommitContributions: response.user.contributionsCollection.totalCommitContributions,
    totalPullRequestContributions: response.user.contributionsCollection.totalPullRequestContributions,
    totalRepositoryContributions: response.user.contributionsCollection.totalRepositoryContributions,
    totalIssueContributions: response.user.contributionsCollection.totalIssueContributions,
   };
}

export const getRepoInfo = async (
  username: string | null | undefined,
  access_token: string | null | undefined
) => {
  const response = await graphql<RepoInfoRes>(
    `
    {
      user(login: "${username}") {
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

  response.user.repositories.nodes.forEach((repo) => {
    totalForks += repo.forkCount;
    totalStars += repo.stargazerCount;
    repo.primaryLanguage?.name && languages.push(repo.primaryLanguage.name);
  });

  let tempSet = new Set(languages);
  languages = Array.from(tempSet); // Convert the Set back to an array

  return { followers: response.user.followers.totalCount, totalForks, totalStars, languages };
};

