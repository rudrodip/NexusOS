import { Repository } from "@/types/github-types";
import { Repo } from "./repo";

type GithubRepoProps = {
  repos: Repository[];
  author: string;
  caption?: string;
};

export const GithubRepos = (props: GithubRepoProps) => {
  return (
    <section id="github-repos">
      <h1 className="font-heading text-2xl text-center">{props.caption ? props.caption : "Repositories"}</h1>
      <div className="grid grid-cols-2 gap-3 my-3 hover:bg-opacity-75">
        {props.repos.map((repo, id) => {
          return (
            <Repo
              key={id}
              name={repo.name}
              desc={repo.description}
              starCount={repo.stargazerCount}
              language={repo.primaryLanguage?.name}
              repoUrl={repo.url}
              authorUsername={props.author}
            />
          );
        })}
      </div>
    </section>
  );
};
