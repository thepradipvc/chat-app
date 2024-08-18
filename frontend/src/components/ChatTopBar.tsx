import { User } from "@/lib/types";
import { cn, getRelativeTime } from "@/lib/utils";

const ChatTopBar = ({ user }: { user: User }) => {
  const { username, image, lastActive } = user;
  // TODO: replace with real data
  const isActive = true;

  return (
    <div className="flex h-[70px] items-center gap-2 bg-neutral-100 px-8">
      <div className="h-full w-max py-2">
        <img
          src={image}
          alt="User avatar"
          className="aspect-square h-full rounded-full"
        />
      </div>
      <div>
        <p className="text-lg font-bold text-gray-800">
          {username}
          <span
            className={cn("mb-1 ml-2 inline-block h-2 w-2 rounded-full", {
              "bg-green-500": isActive,
              "bg-gray-300": !isActive,
            })}
          ></span>
        </p>
        <p className="text-sm text-gray-400">
          Active {getRelativeTime(new Date(lastActive))}
        </p>
      </div>
    </div>
  );
};

export default ChatTopBar;
