import { Message, User } from "@/lib/types";
import { cn, getRelativeTime } from "@/lib/utils";
import { Link } from "react-router-dom";

type ChatItemProps = {
  user: User;
  lastMessage: Message;
  conversationId: number;
  isActive?: boolean;
};

const ChatItem = ({
  conversationId,
  lastMessage,
  user,
  isActive = false,
}: ChatItemProps) => {
  // TODO: is online status
  const isOnline = Math.random() < 0.5;
  const isLastMessage = !!lastMessage;
  const lastMessageSentBy =
    lastMessage?.senderId === user.id ? user.username : "You";

  return (
    <Link
      to={`/chat/${conversationId}`}
      className={cn(
        "relative flex min-h-20 items-center border-b border-neutral-100 p-4",
        {
          "bg-neutral-100": isActive,
        },
      )}
    >
      {isActive && (
        <div
          aria-hidden
          className="absolute left-[1px] h-full w-1 bg-primary"
        ></div>
      )}
      <div className="h-12 w-12 flex-shrink-0 rounded-full">
        <img
          src={user.image}
          alt="User avatar"
          className="aspect-square h-full rounded-full"
        />
      </div>
      <div className="ml-4 flex flex-col">
        <p className="text-lg font-semibold text-gray-800">
          {user.username}
          <span
            className={cn("mb-1 ml-3 inline-block h-1 w-1 rounded-full", {
              "bg-green-500": isOnline,
              "bg-gray-300": !isOnline,
            })}
          ></span>
          <span className="ml-2 text-sm font-normal text-gray-400">
            {getRelativeTime(new Date(user.lastActive))}
          </span>
        </p>
        {isLastMessage && (
          <p className="line-clamp-2 text-sm font-medium text-gray-700">
            <span className="text-gray-500">{lastMessageSentBy}: </span>
            {lastMessage?.text}
          </p>
        )}
      </div>
    </Link>
  );
};

export default ChatItem;
