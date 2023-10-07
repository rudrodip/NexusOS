import { graphql } from "@octokit/graphql";
import {
  userData,
  userDataResponse,
  Repository,
  ReposGraphQLResponse,
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

// export const getRecentPRbyUser = async (username: string): Promise<Repository[] | undefined> => {
//   const response = await graphql<{ data: ReposGraphQLResponse }>(
//     `
//     user(login: ${username}){
//       pullRequests(
//         first: 100
//         orderBy: {field: CREATED_AT, direction: DESC}
//       ){
//         edges{
//           node{
//             title
//           }
//         }
//       }
//     }
//     `
//   )
//   return response.data.repositoryOwner?.repositories.nodes
// }