import { type UseChatHelpers } from "ai/react";

import { Button } from "@/components/ui/button";
import { PromptForm } from "@/components/chat/prompt-form";
import { IconRefresh, IconStop } from "@/components/ui/icons";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearMessages } from "@/redux/slices/chatSlice";
import { Hit } from "@/types/zenodo";
import { Repository } from "@/types/github-types";
import { usePathname } from "next/navigation";
import { IconArrowRight } from "@/components/ui/icons";
import { User } from "@prisma/client";

type FormData = {
  domain: string;
  language: string;
  desc: string;
};

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | "append"
    | "isLoading"
    | "reload"
    | "messages"
    | "stop"
    | "input"
    | "setInput"
  > {
  id?: string;
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
}: ChatPanelProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { repoData } = useAppSelector((state) => state.repoSlice);
  const { record } = useAppSelector((state) => state.recordSlice);
  const { users, formData } = useAppSelector((state) => state.rankSlice);

  const ExplainResearchPaper = async (record: Hit) => {
    const prompt = `Its a system prompt. Here's a research paper:-
      title: ${record.metadata.title}
      published: ${record?.metadata.publication_date}
      type: ${record.metadata.resource_type.title.toUpperCase()}
      creators: ${record.metadata?.creators?.join(", ")}
      keywords: ${record.metadata?.keywords?.join(", ")}
      description: ${record.metadata?.description}
      Please explain this research paper to the user like a professional in fewer words. And try to answer questions.
      `;
    dispatch(clearMessages());
    await append({
      id: "pre-prompt",
      content: prompt,
      role: "system",
    });
  };

  const ExplainRepo = async (repoData: {
    repo: Repository;
    readme: string;
  }) => {
    const prompt = `Its a system prompt. Here's a open source repository:-
      name: ${repoData.repo.name}
      url: ${repoData.repo.url}
      primary language: ${repoData.repo.primaryLanguage.name}
      description: ${repoData.repo.description}
      readme: ${repoData.readme}
      Please explain this repo to the user like a professional in fewer words. And try to answer questions.
      `;
    dispatch(clearMessages());
    await append({
      id: "pre-prompt",
      content: prompt,
      role: "system",
    });
  };

  const RecommendContributor = async ({
    users,
    formData,
  }: {
    users: User[];
    formData: FormData;
  }) => {
    const prompt = `Here is a project requirements:
    Domain: ${formData.domain}
    Language: ${formData.language}
    Desc: ${formData.desc}
    Potential candidates and their bio are given below, try to give me a list of them who are best suitable for this
    ${users.slice(0, 5).map((user, id) => {
      return `User: ${id + 1}
      Name: ${user.name}
      Bio: ${user.bio}
      Domains of expertise: ${user.domains.join(", ")}  
      Languages: ${user.languages.join(", ")}
      `;
    })}
    `;
    dispatch(clearMessages());
    await append({
      id: "pre-prompt",
      content: prompt,
      role: "system",
    });
  };

  return (
    <div>
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center gap-3">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
          {pathname.includes("/papers") && record?.metadata.description && (
            <Button
              variant="outline"
              className="bg-background"
              onClick={async () => await ExplainResearchPaper(record)}
              disabled={isLoading}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              Explain this paper
            </Button>
          )}
          {pathname.includes("/projects") && repoData?.readme && (
            <Button
              variant="outline"
              className="bg-background"
              onClick={async () => await ExplainRepo(repoData)}
              disabled={isLoading}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              Explain this repo
            </Button>
          )}
          {pathname.includes("/find") && users && formData && (
            <Button
              variant="outline"
              className="bg-background"
              onClick={async () =>
                await RecommendContributor({ users, formData })
              }
              disabled={isLoading}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              Recommend Contributors
            </Button>
          )}
        </div>
        <div className="space-y-4 border-t px-4 py-2 sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async (value) => {
              await append({
                id,
                content: value,
                role: "user",
              });
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
