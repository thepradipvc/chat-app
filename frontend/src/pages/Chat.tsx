import ChatItem from "@/components/ChatItem";
import FilterButtons from "@/components/FilterButtons";
import SearchButton from "@/components/SearchButton";
import { Outlet, useParams } from "react-router-dom";

const chats = [
  {
    user: "Claire",
    messages: [
      "Hello, I wanted to know more about the product design position opened at Atlassian.",
      "I'm particularly interested in the specific skills and experience required for the role.",
    ],
    timestamp: "11 days ago",
  },
  {
    user: "Parik",
    messages: [
      "Sure, tell us. What do you wanna know?",
      "We're looking for someone with a strong background in UX/UI design, and experience working in agile environments.",
    ],
    timestamp: "11 days ago",
  },
  {
    user: "Naina",
    messages: [
      "Hello, I wanted to know more about the product design position opened at Atlassian.",
    ],
    timestamp: "11 days ago",
  },
  {
    user: "John",
    messages: [
      "Hello, I wanted to know more about the product design position opened at Atlassian.",
    ],
    timestamp: "11 days ago",
  },
  {
    user: "Kristine",
    messages: [
      "However we're looking for someone with a little more experience!",
    ],
    timestamp: "11 days ago",
  },
  {
    user: "Olivia",
    messages: [
      "I'm interested in the product design position. What are the specific requirements for the role?",
    ],
    timestamp: "10 days ago",
  },
  {
    user: "Ethan",
    messages: [
      "Hi there, I have a few questions about the product design position. What is the typical day-to-day like?",
    ],
    timestamp: "9 days ago",
  },
  {
    user: "Maya",
    messages: ["I'm excited about this position. Can you "],
    timestamp: "8 days ago",
  },
  {
    user: "Noah",
    messages: [
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis ipsam aliquam debitis et eaque quis ducimus laudantium rem. Molestias, soluta mollitia obcaecati amet ducimus quibusdam suscipit nesciunt eaque eligendi aliquam corporis iure error ad in, nostrum cum odio a, sequi ipsa illo reprehenderit sunt assumenda eius fugiat. Nostrum, iste quasi!",
    ],
    timestamp: "7 days ago",
  },
];

const Chat = () => {
  return (
    <div className="grid h-full max-h-full grid-cols-[1fr_2fr]">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default Chat;

const Sidebar = () => {
  const { id } = useParams();

  return (
    <aside className="flex h-full flex-col overflow-y-auto border-r border-neutral-100">
      <SearchButton />
      <FilterButtons />
      <div className="no-scrollbar overflow-y-auto">
        {chats.map((chat, index) => (
          <ChatItem key={index} chat={chat} isActive={chat.user === id} />
        ))}
      </div>
    </aside>
  );
};
