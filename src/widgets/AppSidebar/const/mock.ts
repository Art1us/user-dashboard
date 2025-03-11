import { IconLayoutDashboard } from "@tabler/icons-react";
import { AudioWaveform, Command, GalleryVerticalEnd } from "lucide-react";
import type { SidebarData } from "../model/types";

export const mockSidebarData: SidebarData = {
  user: {
    name: "Artur Pazyniuk",
    email: "artur.pazyniuk.dev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "User Management",
          url: "/",
          icon: IconLayoutDashboard,
        },
      ],
    },
  ],
};
