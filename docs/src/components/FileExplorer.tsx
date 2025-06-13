import { ChevronRight, File, Folder } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSub,
} from "@/components/ui/sidebar";

import { buildNestedArraysShadcn } from "github-flat-trees-to-nested";

export function FileExplorer({ folders }: any) {
  const tree = buildNestedArraysShadcn(folders);
  return (
    <SidebarMenu className="">
      {tree.map((item, index) => (
        <Tree key={index} item={item} />
      ))}
    </SidebarMenu>
  );
}

function Tree({ item }: { item: string | any[] }) {
  const [name, ...items] = Array.isArray(item) ? item : [item];

  if (!items.length) {
    return (
      <SidebarMenuButton
        isActive={name === "button.tsx"}
        className="data-[active=true]:bg-transparent"
      >
        <File />
        {name}
      </SidebarMenuButton>
    );
  }

  return (
    <Collapsible
      className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      defaultOpen={name === "components" || name === "ui"}
    >
      <CollapsibleTrigger asChild>
        <SidebarMenuButton>
          <ChevronRight className="transition-transform" />
          <Folder />
          {name}
        </SidebarMenuButton>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {items.map((subItem, index) => (
            <Tree key={index} item={subItem} />
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}
