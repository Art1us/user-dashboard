import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/shared/components/ui/sidebar";
import { NavGroup } from "@/shared/components/layout/nav-group";
import { NavUser } from "@/shared/components/layout/nav-user";
import { TeamSwitcher } from "@/entities/Self";
import type { ComponentProps } from "react";
import { mockSidebarData } from "../const/mock";

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
