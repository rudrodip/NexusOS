"use client";

import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface Creators {
  affiliation?: string;
  name: string;
  orcid?: string;
}
interface PaperCardProps {
  id: number;
  published: string;
  resource_type: string;
  access: string;
  title: string;
  creators: Creators[];
}

const PaperCard = ({
  id,
  published,
  resource_type,
  access,
  title,
  creators,
}: PaperCardProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border glassy-bg p-5"
    >
      <div className="grid grid-cols-3">
        <div>
          <div className="flex text-sm flex-wrap my-1">
            <p className="rounded-sm bg-blue-500 p-1 mr-1">{published}</p>
            <p className="rounded-sm bg-gray-500 p-1 mr-1">
              {resource_type.toUpperCase()}
            </p>
            <p className="rounded-sm bg-green-600 p-1 mr-1">
              {access.toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex justify-between table-fixed">
          <Link href={`/papers/${id}`}>{title}</Link>
        </div>
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
        <p className="font-medium">Contributors</p>
        <div className="flex flex-wrap my-2">
          {creators?.map((elem, index) => {
            return (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <p className="rounded-sm p-1 mr-1 text-sm my-1 bg-secondary">
                      {elem["name"]}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent>
                    {elem?.affiliation && (
                      <p>Affiliation: {elem.affiliation}</p>
                    )}
                    {elem?.orcid && <p>ORCID: {elem.orcid}</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            );
          })}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default PaperCard;
