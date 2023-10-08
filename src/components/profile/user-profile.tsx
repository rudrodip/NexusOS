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
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

export const UserProfile = ({ props }: { props: User }) => {
  return (
    <Collapsible className="border glassy-bg p-5">
      <div className="grid grid-cols-3">
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Avatar>
                  <AvatarImage
                    alt="Picture"
                    src={`https://avatars.githubusercontent.com/${props.name}`}
                  />
                  <AvatarFallback>
                    <span className="sr-only">{props.name}</span>
                    <Icons.user className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{props.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Link
          href={{
            pathname: `/${props.name}`,
          }}
          className="flex items-center justify-center"
        >
          <p className="text-center font-heading">{props.name}</p>
        </Link>
        <div className="flex justify-end">
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              <CaretSortIcon className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent className="space-y-2">
        <Separator className="my-2" />
        <div className="text-sm text-muted-foreground my-2">
          <div className="grid grid-cols-2">
            <p>Total stars: {props.totalStars}</p>
            <p>Total commits: {props.totalCommits}</p>
            <p>Total repository contribution: {props.totalRepoContrib}</p>
            <p>Total pull request: {props.totalPullReqs}</p>
          </div>
          <div>
            <p className="desc">{props.bio}</p>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
