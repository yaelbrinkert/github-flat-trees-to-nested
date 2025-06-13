import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";

export default function CodeStudio({ children }: any) {
  function handleCopy() {
    console.log("Hello");
  }
  return (
    <div className="w-full bg-accent rounded-xl flex flex-col">
      <div className="w-full h-[30px] bg-[#bbb] rounded-t-xl flex items-center px-[10px]">
        <div className="flex flex-row gap-2">
          <span className="h-[12px] w-[12px] rounded-[50%] border-1 bg-[#ff3b47] border-[#9d252b]"></span>
          <span className="h-[12px] w-[12px] rounded-[50%] border-1 bg-[#ffc100] border-[#9d802c]"></span>
          <span className="h-[12px] w-[12px] rounded-[50%] border-1 bg-[#00d742] border-[#049931]"></span>
        </div>
      </div>
      <div className="h-full bg-accent p-[15px] rounded-b-xl flex flex-col gap-1 relative">
        <Button
          className="absolute z-10 top-2 right-2 h-[30px] w-[30px]"
          variant="outline"
          onClick={handleCopy}
        >
          <Clipboard />
        </Button>
        {children}
      </div>
    </div>
  );
}

export function StudioLine({ children }: any) {
  return <code>{children}</code>;
}

export function StudioList({ children }: any) {
  return <pre>{children}</pre>;
}
