import { cn } from "@/lib/utils";

const ChatMessages = ({ messages }: { messages: string[] }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Message
          key={index}
          message={message}
          side={index % 2 == 0 ? "left" : "right"}
        />
      ))}
    </>
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
        "text-muted-foreground w-max max-w-2xl rounded-lg bg-neutral-50 p-4 font-medium",
        {
          "bg-primary ml-auto text-white": side === "right",
        },
      )}
    >
      {message}
    </p>
  );
};
