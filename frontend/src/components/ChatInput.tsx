import { Paperclip, SendHorizontal } from "lucide-react";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

interface ChatInputProps {
  isDisabled: boolean;
}

const ChatInput = ({ isDisabled }: ChatInputProps) => {
  //   const { addMessage, handleInputChange, isLoading, message } =
  //     useContext(ChatContext);

  //   const { toast } = useToast();
  console.log(isDisabled);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <div className="relative">
      <Textarea
        rows={1}
        ref={textareaRef}
        maxRows={4}
        autoFocus
        // onChange={handleInputChange}
        // value={message}
        // onKeyDown={(e) => {
        //   if (e.key === "Enter" && !e.shiftKey) {
        //     e.preventDefault();

        //     if (isLoading) {
        //       toast({
        //         description:
        //           "Please wait for the previous message to be responded",
        //         variant: "default",
        //       });
        //       return;
        //     }

        //     if (message === "") return;

        //     addMessage();

        //     textareaRef.current?.focus();
        //   }
        // }}
        placeholder="Type your message here"
        className="custom-scrollbar resize-none py-3 pr-24 text-base placeholder:font-medium placeholder:text-[#afafaf]"
      />

      <Button
        size="icon"
        variant="ghost"
        className="absolute bottom-2 right-[56px]"
      >
        <Paperclip className="text-primary h-5 w-5" />
      </Button>

      <Button
        // disabled={isLoading || isDisabled || message === ""}
        className="absolute bottom-2 right-[8px] bg-[#fee7e2] hover:bg-[#e99a8882]"
        aria-label="send message"
        // onClick={() => {
        //   addMessage();

        //   textareaRef.current?.focus();
        // }}
        size="icon"
      >
        <SendHorizontal className="text-primary h-5 w-5" />
      </Button>
    </div>
  );
};

export default ChatInput;
