import { Separator } from "@/components/ui/separator";
import UsersSection from "./features/users/UsersSection";
import UsersCardSection from "./features/users-card-infos/UsersCardSection";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      {/**
       * CARD INFO SECTION
       */}
      <div className="text-foreground/50">Card informations</div>
      <Separator />
      <UsersCardSection />
      {/**
       * Users table Section
       */}
      <div className="text-foreground/50">Users Table</div>
      <Separator />
      <UsersSection />
    </div>
  );
}
