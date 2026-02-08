import { Separator } from "@/components/ui/separator";
import ActiveUsersCard from "./components/ActiveUsersCard";
import { Briefcase, Folder, Users } from "lucide-react";
import UsersSection from "./features/users/UsersSection";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="text-foreground/50">Card informations</div>
      <Separator />
      {/**
       * CARD INFO SECTION
       */}
      <div className="flex gap-3 w-full justify-between">
        <ActiveUsersCard
          title="Total Users"
          desc="Total users created by the admin"
          value="0"
          icon={<Users />}
        />
        <ActiveUsersCard
          title="Total RH"
          desc="Total Humans ressources numbers"
          value="0"
          icon={<Briefcase />}
        />
        <ActiveUsersCard
          title="Total Project Managers"
          desc="Total Humans ressources number"
          value="0"
          icon={<Folder />}
        />
        <ActiveUsersCard
          title="Total Employees"
          desc="Total Employees number"
          value="0"
          icon={<Folder />}
        />
      </div>
      <Separator />
      {/**
       * Users table Section
       */}
      <UsersSection />
    </div>
  );
}
