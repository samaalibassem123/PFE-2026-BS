import { Bell } from 'lucide-react';

export default function NotificationBell() {
  return (
    <div className="flex relative cursor-pointer animate-pulse">
      <Bell className=" size-6" />
      <span className=" absolute -top-2 -right-1 text-xs bg-red-500 rounded-full w-4 h-4 flex items-center justify-center p-2">
        0
      </span>
    </div>
  );
}
