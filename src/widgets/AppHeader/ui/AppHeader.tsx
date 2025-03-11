import { ProfileDropdown } from "@/entities/Self/profile-dropdown";
import { Header } from "@/shared/components/layout/header";
import { TopNav } from "@/shared/components/layout/top-nav";
import { mockLinks } from "../const/mock";

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
