"use client";

import { setFormData } from "@/redux/slices/rankSlice";
import { languages } from "@/config/languages";
import { categories } from "@/config/categories";
import { UserProfile } from "@/components/profile/user-profile";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchUsers } from "@/redux/slices/rankSlice";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

const FormSchema = z.object({
  domain: z.string(),
  language: z.string(),
  desc: z.string().min(10).max(500),
});

export default function Page() {
  const dispatch = useAppDispatch();
  const { isLoading, isError, users } = useAppSelector(
    (state) => state.rankSlice
  );

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(fetchUsers({ domain: data.domain, language: data.language }));
    dispatch(setFormData(data))
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <section>
      <h1 className="text-center head-text blue-gradient">Find Contributors</h1>
      <div className="w-full my-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="container mx-auto w-full space-y-2 md:space-y-6"
          >
            <div className="grid grid-cols-2 w-full lg:max-w-7xl gap-6">
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Domain</FormLabel>
                    <FormDescription>
                      Choose the domain of your project
                    </FormDescription>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select domain" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-72">
                          {categories.map((option, id) => {
                            return (
                              <SelectItem value={option.value} key={id}>
                                {option.label}
                              </SelectItem>
                            );
                          })}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Language</FormLabel>
                    <FormDescription>
                      Programming language the contributor should be good at
                    </FormDescription>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <ScrollArea className="h-72">
                          {languages.map((lang, id) => {
                            return (
                              <SelectItem value={lang.value} key={id}>
                                {lang.label}
                              </SelectItem>
                            );
                          })}
                        </ScrollArea>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="desc"
                defaultValue=""
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Give your project requirements, such as main programming languages, frameworks and other necessary details in natural language."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="my-3">
                {isLoading ? "Loading..." : "Search"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="container mx-auto my-16">
        {users && (
          <p className="text-sm text-muted-foreground my-1">
            Results: {users?.length}
          </p>
        )}
        <div className="grid grid-cols-1 gap-2">
          {isLoading &&
            Array(5)
              .fill(null)
              .map((_, id) => {
                return <Skeleton key={id} className="h-12 w-full" />;
              })}
          {users?.map((user, id) => {
            return <UserProfile key={id} props={user} />;
          })}
        </div>
      </div>
    </section>
  );
}
