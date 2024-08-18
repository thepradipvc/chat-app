import ChatInput from "@/components/ChatInput";
import ChatMessages from "@/components/ChatMessages";
import ChatTopBar from "@/components/ChatTopBar";
import { useParams } from "react-router-dom";

const chats = [
  {
    user: "Claire",
    messages: [
      "Hello, I wanted to know more about the product design position opened at Atlassian.",
      "I'm particularly interested in the specific skills and experience required for the role.",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor eaque consequatur aperiam sunt amet, magni eos incidunt doloremque ea ipsam, architecto fugit labore a laborum commodi quo nobis nemo fuga nesciunt saepe vero nostrum, maiores odit! Ad odio harum blanditiis vel in recusandae debitis quaerat molestiae facere possimus, consectetur ullam culpa voluptatem alias a placeat eum. Ex cum exercitationem laboriosam officiis corporis perferendis eaque architecto, doloremque quisquam quasi expedita, aspernatur repudiandae non earum ullam. Eius culpa fuga assumenda ad quidem, aliquid temporibus repudiandae autem. Impedit quasi, quae, dolorem vitae iste sapiente adipisci, reiciendis maxime tempore aperiam amet iure totam nulla id maiores at quisquam? Doloribus quam nemo delectus, excepturi ea provident architecto, sequi eveniet ipsa unde ratione a. Molestiae quidem voluptatem ipsa temporibus, eos dolorum magnam commodi omnis eius, incidunt officiis earum provident eaque. Quam, sed odit iste eaque eius harum fugit nobis consequuntur dolor natus iure repudiandae soluta sequi accusantium in incidunt voluptate sunt ab amet possimus officiis ratione! Vero quas voluptates blanditiis iusto necessitatibus id iure reprehenderit! Distinctio nihil omnis saepe quaerat! Molestias sapiente labore praesentium vero beatae aspernatur architecto fugiat delectus fugit veritatis illo, dolore illum, quam vel quasi unde reiciendis repellat animi iusto veniam porro?",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum placeat ab fugit, eum dolorum nulla. Nihil ipsam unde itaque rem velit nostrum iste, illo voluptatum amet quaerat temporibus molestiae, dolor numquam perspiciatis tenetur, repellendus assumenda ex corporis. Voluptate placeat doloribus earum maxime illum velit blanditiis iste? Officiis unde molestias laborum ut dignissimos praesentium exercitationem at sunt porro. Alias iste saepe animi, a dolor ducimus veritatis odit dolorem! Voluptates eaque quam commodi cumque temporibus odio sunt nulla qui, cupiditate ducimus non quaerat praesentium! Esse velit adipisci laborum quaerat illo qui ab. Illo qui sequi ullam consectetur optio nulla voluptatibus, velit temporibus.",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae nemo unde deserunt earum aliquid a quas? Iste ullam eos facilis deleniti voluptates, ducimus maxime nemo culpa voluptatem harum deserunt, itaque dicta cum explicabo quaerat, cumque fuga repudiandae animi magni id odio adipisci soluta! Id officiis itaque, porro similique magni ut.",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sint illo explicabo dolorum. Ut fugiat, laudantium est nostrum quod, a perspiciatis modi aspernatur sequi eius id sit ea excepturi. Impedit assumenda quaerat perspiciatis est adipisci reiciendis voluptates aut nostrum, obcaecati ut vel expedita explicabo quo provident recusandae illo facilis, dolores repudiandae necessitatibus porro. Vero quibusdam temporibus earum iste consequatur minus dolorum neque voluptatibus harum quis! Ex harum obcaecati ad soluta, dolore quisquam ducimus officia eum fugit! Maiores odio temporibus architecto nulla deserunt doloribus unde obcaecati incidunt id labore debitis beatae, itaque, recusandae minima, soluta minus. Earum iure excepturi totam molestias odit rem est? Nemo, voluptas. Molestiae, veniam facere. Praesentium?",
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero nam omnis vel ut ipsum, eveniet esse? Dolor sint eius odit harum, explicabo rerum eos, impedit nobis velit, at quos?",
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
    messages: [
      "I'm excited about this position. Can you tell me more about the team I'll be working with?",
    ],
    timestamp: "8 days ago",
  },
  {
    user: "Noah",
    messages: [
      "I'm interested in applying for the product design position. What is the salary range for this role?",
    ],
    timestamp: "7 days ago",
  },
];

const ChatBox = () => {
  const { id } = useParams();
  const chat = chats.find((chat) => chat.user === id);
  if (!chat) {
    throw new Error("Chat not found");
  }

  return (
    <div className="flex flex-col overflow-y-auto">
      <ChatTopBar user={chat.user} timestamp={chat.timestamp} />
      <ChatMessages messages={chat.messages} />
      <ChatInput isDisabled />
    </div>
  );
};

export default ChatBox;
