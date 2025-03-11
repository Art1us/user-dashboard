import type { ComponentProps } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/shared/ui/sidebar";
import { NavUser, TeamSwitcher } from "@/entities/Self";
import { mockSidebarData } from "../const/mock";
import { NavGroup } from "./NavGroup";

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={mockSidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        {mockSidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={mockSidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
