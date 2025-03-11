import { ProfileDropdown } from "@/entities/Self";
import { Header } from "@/shared/ui/header";
import { mockLinks } from "../const/mock";
import { TopNav } from "./TopNav";

export function AppHeader() {
  return (
    <Header>
      <TopNav links={mockLinks} />
      <div className="ml-auto flex items-center space-x-4">
        <ProfileDropdown />
      </div>
    </Header>
  );
}
