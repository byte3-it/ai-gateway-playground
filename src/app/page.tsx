"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AVAILABLE_MODELS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const DEFAULT_MESSAGES = [{ role: "assistant", content: "Hello, I'm a helpful assistant. How can I help you today?" }];

const LOCAL_STORAGE_KEY = "chat-messages";

export default function Home() {
  const [selecteModel, setSelecteModel] = useState(AVAILABLE_MODELS[0].id);
  const [prompt, setPrompt] = useState("Hello, tell me a joke about AI");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  // Load messages from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
        setPrompt("");
      } catch (error) {
        console.error("Error parsing saved messages:", error);
        // Fallback to default message if parsing fails
        setMessages(DEFAULT_MESSAGES);
      }
    } else {
      // Set default message if no saved messages exist
      setMessages(DEFAULT_MESSAGES);
    }
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const submitTextMutation = useMutation({
    mutationFn: async (): Promise<{ message: string }> => {
      const messagesToSend = [...messages, { role: "user", content: prompt }];

      setMessages([...messages, { role: "user", content: prompt }]);
      return await fetch("/api/ai", {
        method: "POST",
        body: JSON.stringify({ model: selecteModel, messages: messagesToSend }),
      }).then((res) => res.json());
    },
    onSuccess: (data: { message: string }) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      setPrompt("");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error submitting text");
    },
  });

  return (
    <div className="flex flex-col gap-4 p-8 h-screen pb-16">
      {/* messages */}
      <div
        className={cn(
          "flex-1 overflow-y-auto border border-gray-200 rounded-md p-4",
          submitTextMutation.isPending && "shadow-lg"
        )}
      >
        {!messages ||
          (messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No messages yet, send your first message</p>
            </div>
          ))}

        <div className="flex flex-col gap-2">
          {messages &&
            messages.map((message, index) => (
              <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div className="p-2 rounded-md border max-w-2xl bg-white">
                  <div className="text-sm">{message.content}</div>
                </div>
              </div>
            ))}

          {/* skeleton for last ai message */}
          {submitTextMutation.isPending && (
            <div className="flex justify-start">
              <Skeleton className="h-[60px] w-lg rounded-xl" />
            </div>
          )}
        </div>
      </div>

      {/* input area */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitTextMutation.mutate();
        }}
      >
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            disabled={submitTextMutation.isPending}
            placeholder="Enter your message"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="flex gap-2">
            <Select
              disabled={submitTextMutation.isPending}
              value={selecteModel}
              onValueChange={(value) => setSelecteModel(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="submit" disabled={submitTextMutation.isPending}>
              {submitTextMutation.isPending && <Loader2 className="size-4 animate-spin" />}
              Send <Send className="size-4" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
