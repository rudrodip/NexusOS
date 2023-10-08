"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export function LoginButton() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center align-middle items-center h-screen">
      <Tabs defaultValue="signin" className="w-[400px] my-5">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <Card>
            <CardHeader>
              <Image
                src="/images/features/feature5.png"
                alt="connect"
                width={600}
                height={600}
                className="rounded-md"
              />
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Stay connected by signing in. Access your profile and connect
                with others.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex justify-center flex-col">
              <Button
                variant="outline"
                onClick={() => {
                  setLoading(true);
                  signIn("github");
                }}
                disabled={loading}
              >
                Continue with Github
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <Image
                src="/images/features/feature7.png"
                alt="connect"
                width={600}
                height={600}
                className="rounded-md"
              />
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Join Our Community: Become a part of our growing community and
                connect with like-minded individuals, and let&apos;s accelerate NASA&apos;s open science initiative together
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 flex justify-center flex-col">
              <Button
                variant="outline"
                onClick={() => {
                  setLoading(true);
                  signIn("github");
                }}
                disabled={loading}
              >
                Continue with Github
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
