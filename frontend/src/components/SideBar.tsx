import { getAllConversations } from "@/actions/chats";
import ChatItem from "@/components/ChatItem";
import FilterButtons from "@/components/FilterButtons";
import SearchButton from "@/components/SearchButton";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const { id } = useParams();
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: getAllConversations,
  });

  if (!chats) {
    return (
      <div className="grid h-full flex-col place-items-center overflow-y-auto border-r border-neutral-100">
        <Loader size="40" className="animate-spin" />
      </div>
    );
  }

  return (
    <aside className="flex h-full flex-col overflow-y-auto border-r border-neutral-100">
      <SearchButton />
      <FilterButtons />
      <div className="no-scrollbar overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat.conversationId}
            conversationId={chat.conversationId}
            user={chat.user}
            lastMessage={chat.lastMessage}
            isActive={chat.conversationId === Number(id)}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
