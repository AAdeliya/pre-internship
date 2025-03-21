"use client";

import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/constants/landing-page";
import clsx from "clsx";
import { Check, ArrowRight, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { VideoPlayer } from "@/components/videoplayer";

const Home = () => {
  const router = useRouter();
  const user = useUser();

  const handleStartForFree = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <NavBar />
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-2xl space-y-8">
              <span className="text-orange bg-orange/20 px-4 py-2 rounded-full text-sm animate-fade-in">
                An AI powered sales assistant chatbot
              </span>
              <h1 className="text-5xl font-bold mb-6 animate-fade-in">
                Supercharge Your Sales with{" "}
                <span className="text-orange">MailGenie</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 animate-fade-in-delay-1">
                Your AI-powered sales assistant! Embed MailGenie to any website
                with just a snippet of code and watch your conversions soar.
              </p>
              <div className="flex gap-4 animate-fade-in-delay-2">
                <Button
                  onClick={handleStartForFree}
                  className="bg-orange hover:bg-orange text-white px-8 py-6 text-lg font-bold transition-all duration-300"
                >
                  Start For Free
                </Button>
                <Button
                  onClick={() => router.push("/demo")}
                  variant="outline"
                  className="border-gray-300 px-8 py-6 text-lg font-bold transition-all duration-300"
                >
                  Watch Demo <ArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
            <Image
              src="/images/iphone.png"
              width={400}
              height={100}
              alt="image"
              className="max-w-lg object-contain"
            />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-500">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose MailGenie?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Intelligent Responses",
                description:
                  "Our AI understands context and provides human-like responses.",
                icon: <Check className="text-orange" />,
              },
              {
                title: "Easy Integrations",
                description:
                  "Embed MailGenie on your website with a single line of code.",
                icon: <ArrowRight className="text-orange" />,
              },
              {
                title: "24/7 Availability",
                description:
                  "Never miss a potential lead with round-the-clock automated responses.",
                icon: <Video className="text-orange" />,
              },
            ].map((feature, index) => (
              <Card
                key={feature.title}
                className="text-center hover:shadow-lg transition-shadow duration-300 animate-fade-in-delay-3"
              >
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      Demo Video
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-center mb-12">
          Watch MailGenie in Action
        </h1>
        <div className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
          <VideoPlayer videoSrc="https://utfs.io/f/08bea37f-afd7-4623-b5cc-e85184528fce-1f02.mp4" />
        </div>
      </div>
    </main>
  );
};

export default Home;
