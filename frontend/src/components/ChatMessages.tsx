import { getMessages } from "@/actions/chats";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useIntersection } from "@mantine/hooks";
import { forwardRef, useEffect, useRef } from "react";

const ChatMessages = ({ conversationId }: { conversationId: number }) => {
  const { user } = useAuth();
  const lastMessageRef = useRef<HTMLParagraphElement>(null);

  const { ref, entry } = useIntersection({
    root: lastMessageRef.current,
    threshold: 1,
  });

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["messages", conversationId],
    queryFn: ({ pageParam = 0 }) =>
      getMessages({ conversationId, cursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchNextPage();
    }
  }, [entry, fetchNextPage]);

  if (!data) {
    return (
      <div className="grid h-full flex-col place-items-center overflow-y-auto border-r border-neutral-100">
        <Loader size="40" className="animate-spin" />
      </div>
    );
  }

  const messages = data?.pages.flatMap((page) => page.messages);

  return (
    <div className="custom-scrollbar flex flex-1 flex-col-reverse overflow-y-auto border-y border-neutral-100 px-8 py-4">
      {messages.map((message, i) => {
        const isNextMessageFromSamePerson =
          messages[i]?.senderId === messages[i + 1]?.senderId;

        return (
          <Message
            key={i}
            message={message.text}
            side={message.senderId === user?.id ? "right" : "left"}
            isNextMessageFromSamePerson={isNextMessageFromSamePerson}
            ref={i === messages.length - 1 ? ref : undefined}
          />
        );
      })}
    </div>
  );
};

export default ChatMessages;

type MessageProps = {
  message: string;
  side: "left" | "right";
  isNextMessageFromSamePerson: boolean;
};

const Message = forwardRef<HTMLParagraphElement, MessageProps>(
  ({ message, side, isNextMessageFromSamePerson }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(
          "w-4/5 max-w-max rounded-lg bg-neutral-100 p-4 font-medium text-muted-foreground",
          {
            "ml-auto bg-primary text-white": side === "right",
            "mt-2": isNextMessageFromSamePerson,
            "mt-10": !isNextMessageFromSamePerson,
          },
        )}
      >
        {message}
      </p>
    );
  },
);
