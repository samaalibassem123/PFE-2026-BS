import { Skeleton } from "@/components/ui/skeleton";

export function UsersTableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="rounded-md border">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="px-4 py-3 text-left">Created_at</th>
            <th className="px-4 py-3 text-left">Username</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-left">Role</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rows }).map((_, i) => (
            <tr key={i} className="border-b last:border-b-0">
              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[140px]" />
              </td>

              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[100px]" />
              </td>

              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[180px]" />
              </td>

              <td className="px-4 py-3">
                <Skeleton className="h-4 w-[70px]" />
              </td>

              <td className="px-4 py-3">
                <Skeleton className="h-8 w-8 rounded-md" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
