import { ProfileDropdown } from "@/entities/Self/profile-dropdown";
import { Header } from "@/shared/ui/header";
import { mockLinks } from "../const/mock";
import { TopNav } from "./top-nav";

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
