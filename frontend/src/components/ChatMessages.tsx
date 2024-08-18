import { cn } from "@/lib/utils";

const ChatMessages = ({ messages }: { messages: string[] }) => {
  return (
    <div className="custom-scrollbar flex-1 space-y-8 overflow-y-auto border-y border-neutral-100 px-8 py-8">
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          side={index % 2 == 0 ? "left" : "right"}
        />
      ))}
    </div>
  );
};

export default ChatMessages;

type MessageProps = {
  message: string;
  side: "left" | "right";
};

const Message = ({ message, side }: MessageProps) => {
  return (
    <p
      className={cn(
        "w-4/5 max-w-max rounded-lg bg-neutral-50 p-4 font-medium text-muted-foreground",
        {
          "ml-auto bg-primary text-white": side === "right",
        },
      )}
    >
      {message}
    </p>
  );
};
