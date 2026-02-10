import { Users, Briefcase, Folder, User } from "lucide-react";
import ActiveUsersCard from "../../components/ActiveUsersCard";
import { useGetUsersNumbers } from "./hooks/users-card-info";
import { toast } from "sonner";
import { useEffect } from "react";
import { getErrorMessage } from "@/shared/api/backend";

export default function UsersCardSection() {
  const { data, isError, isPending, error } = useGetUsersNumbers();

  useEffect(() => {
    if (isError) {
      toast.error(getErrorMessage(error), { position: "top-center" });
    }
  }, [isError]);

  return (
    <div className="flex gap-3 w-full justify-between">
      <ActiveUsersCard
        title="Total Users"
        desc="Total users created by the admin"
        value={data?.total_users ?? 0}
        loading={isPending}
        icon={<Users />}
      />
      <ActiveUsersCard
        title="Total Admins"
        desc="Total admins accounts"
        value={data?.total_admins ?? 0}
        icon={<User />}
        loading={isPending}
      />
      <ActiveUsersCard
        title="Total Project Managers"
        desc="Total Project Managers accounts"
        value={data?.total_projectM ?? 0}
        icon={<Folder />}
        loading={isPending}
      />
      <ActiveUsersCard
        title="Total RH"
        desc="Total Humans ressource accounts"
        value={data?.total_rh ?? 0}
        icon={<Briefcase />}
        loading={isPending}
      />
    </div>
  );
}
