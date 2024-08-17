import { cn } from "@/lib/utils";

type ChatTopBarProps = {
  user: string;
  timestamp: string;
};

const ChatTopBar = ({ user, timestamp }: ChatTopBarProps) => {
  const isActive = true;

  // create random number between 1 and 100
  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return (
    <div className="flex h-[70px] items-center gap-2 bg-neutral-50 px-8">
      <div className="h-full w-max py-2">
        <img
          src={`https://randomuser.me/api/portraits/men/${randomNumber}.jpg`}
          alt="User avatar"
          className="aspect-square h-full rounded-full"
        />
      </div>
      <div>
        <p className="text-lg font-bold text-gray-800">
          {user}
          <span
            className={cn("mb-1 ml-2 inline-block h-2 w-2 rounded-full", {
              "bg-green-500": isActive,
              "bg-gray-300": !isActive,
            })}
          ></span>
        </p>
        <p className="text-sm text-gray-400">Active {timestamp}</p>
      </div>
    </div>
  );
};

export default ChatTopBar;
