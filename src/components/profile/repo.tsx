import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

type RepoProps = {
  name: string;
  desc: string | null | undefined;
  starCount: number;
  repoUrl: string;
  language?: string | undefined | null;
  authorUsername: string;
};

export const Repo = ({
  name,
  desc,
  starCount,
  repoUrl,
  language,
  authorUsername,
}: RepoProps) => {
  return (
    <div className="flex h-full w-auto items-center p-3 gap-3 rounded-md border-2 hover:border-primary delay-75 duration-100 text-sm">
      <a href={`https://github.com/${authorUsername}`} target="_blank">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar>
                <AvatarImage
                  alt="Picture"
                  src={`https://avatars.githubusercontent.com/${authorUsername}`}
                />
                <AvatarFallback>
                  <span className="sr-only">{authorUsername}</span>
                  <Icons.user className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{authorUsername}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </a>
      <Link
        href={{
          pathname: `/projects/${authorUsername}/${name}`,
        }}
        className="flex flex-col justify-between"
      >
        <div>
          <a href={repoUrl} target="_blank" className="font-heading">
            {name}
          </a>
          <p>{desc}</p>
          <p>{language}</p>
        </div>
        <p className="flex gap-2 items-center justify-start my-1">
          <Star className="w-4 h-4" />
          {starCount}
        </p>
      </Link>
    </div>
  );
};
