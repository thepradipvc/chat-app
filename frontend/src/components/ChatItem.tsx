import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type ChatItemProps = {
  chat: {
    user: string;
    messages: string[];
    timestamp: string;
  };
  isActive?: boolean;
};

const ChatItem = ({ chat, isActive = false }: ChatItemProps) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  const isOnline = Math.random() < 0.5;

  return (
    <Link
      to={`/chat/${chat.user}`}
      className={cn(
        "relative flex min-h-20 items-center border-b border-neutral-100 p-4",
        {
          "bg-neutral-50": isActive,
        },
      )}
    >
      {isActive && (
        <div
          aria-hidden
          className="bg-primary absolute left-[1px] h-full w-1"
        ></div>
      )}
      <div className="h-12 w-12 flex-shrink-0 rounded-full">
        <img
          src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
          alt="User avatar"
          className="aspect-square h-full rounded-full"
        />
      </div>
      <div className="ml-4 flex flex-col">
        <p className="text-lg font-semibold text-gray-800">
          {chat.user}
          <span
            className={cn("mb-1 ml-3 inline-block h-1 w-1 rounded-full", {
              "bg-green-500": isOnline,
              "bg-gray-300": !isOnline,
            })}
          ></span>
          <span className="ml-2 text-sm font-normal text-gray-400">
            {chat.timestamp.split(" ").slice(0, 2).join(" ")}
          </span>
        </p>
        <p className="line-clamp-2 text-sm font-medium text-gray-700">
          <span className="text-gray-500">{chat.user}: </span>
          {chat.messages[chat.messages.length - 1]}
        </p>
      </div>
    </Link>
  );
};

export default ChatItem;
