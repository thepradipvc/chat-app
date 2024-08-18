import { getOtherUserInConversation } from "@/actions/chats";
import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ChatTopBar from "@/components/ChatTopBar";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useParams } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  const conversationId = Number(id);

  const { data: user } = useQuery({
    queryKey: ["otherUser", conversationId],
    queryFn: () => getOtherUserInConversation({ conversationId }),
  });

  if (!user) {
    return (
      <div className="grid h-full flex-col place-items-center overflow-y-auto border-r border-neutral-100">
        <Loader size="40" className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      <ChatTopBar user={user} />
      <ChatMessages conversationId={conversationId} />
      <ChatInput isDisabled />
    </div>
  );
};

export default Chat;
