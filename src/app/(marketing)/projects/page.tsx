"use client";

import React, { useEffect } from "react";
import { ExternalLink } from "@/components/chat/external-link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchRepos } from "@/redux/slices/projectsSlice";
import { Button } from "@/components/ui/button";
import { Repo } from "@/components/profile/repo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  search: z.string().min(2, {
    message: "Search query must be at least 2 characters.",
  }),
});

const PapersPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isError, data } = useAppSelector(
    (state) => state.projectsSlice
  );

  useEffect(() => {
    if (data === null) {
      dispatch(fetchRepos("language:python"));
    }
  }, [data, data?.data.items.length, dispatch]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(fetchRepos(data.search));
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <div className="my-5 mx-1 w-full">
      <h1 className="text-center head-text blue-gradient">Open Source Repositories</h1>
      <p className="mb-2 leading-normal text-muted-foreground text-center">
        Thanks to <ExternalLink href="https://github.com/">Github</ExternalLink>
        .
      </p>
      <div className="container mx-auto my-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container mx-auto w-full md:w-1/2 space-y-2 md:space-y-6"
          >
            <div className="">
              <FormField
                control={form.control}
                name="search"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Search</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Search"
                        {...field}
                        className=""
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isLoading}
                variant={isError ? "destructive" : "default"}
                className="my-3"
              >
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="container mx-auto my-16">
        <div className="grid grid-cols-1 gap-2">
          {data?.data &&
            data.data.items.map((repo, id) => {
              return (
                <Repo
                  key={id}
                  name={repo.name}
                  desc={repo.description}
                  starCount={repo.stargazers_count}
                  language={repo.language}
                  repoUrl={repo.url}
                  authorUsername={repo.owner?.login || ""}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PapersPage;