import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import gptLogo from "@/assets/images/gpt-logo.png";
import userLogo from "@/assets/images/user.png";

export default function Component() {
  // Generate sample messages for demonstration
  const messages = Array.from({ length: 15 }, (_, index) => ({
    id: index,
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia facilis dicta quis, laboriosam perferendis in?   ${index + 1}`,
    isUser: index % 2 === 0,
  }));

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="flex flex-col items-stretch w-full max-w-screen-lg border border-red-900 rounded-xl"
        style={{
          maxHeight: "50rem",
        }}
      >
        {/* Messages container */}
        <div className="flex flex-col flex-grow overflow-auto">
          {messages.map((message, index) => (
            <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} p-4 gap-4`} key={index}>
              {!message.isUser && (
                <img
                  alt="Avatar"
                  className="rounded-full"
                  src={gptLogo}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
              )}
              <div className="flex flex-col gap-1 min-w-0">
                <div className="font-semibold">{message.isUser ? 'You' : 'Grace Sullivan'}</div>
                <div className="bg-gray-100 rounded-lg p-2" style={{ maxWidth: "500px", wordWrap: "break-word" }}>{message.text}</div>
              </div>
              {message.isUser && (
                <img
                  alt="Avatar"
                  className="rounded-full"
                  src={userLogo}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t flex-none">
          <form className="flex gap-4 items-end">
            <Textarea className="flex-1 min-h-[2rem] rounded-2xl resize-none" placeholder="Type your message..." />
            <Button variant="outline" className="rounded-full self-end" type="submit">Send</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
