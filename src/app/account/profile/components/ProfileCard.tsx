"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useAuthStore from "../../../../../store/AuthStore";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileCard() {
  const { user } = useAuthStore();
  return (
    <div className="flex justify-center items-center h-[800px]">
      <Card className="h-[600px] md:w-[800px] p-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-4">
            <Avatar className="h-20 w-20 rounded-lg">
              <AvatarImage
                style={{ borderRadius: "50%" }}
                src={user?.image || ""}
                alt={user?.name || ""}
              />
              <AvatarFallback className="rounded-lg">
                {user?.name?.slice(0, 2).toUpperCase() || "CN"}
              </AvatarFallback>
            </Avatar>
            <span>{user?.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid grid-cols-2 gap-4">
            <p>Role:</p>
            <p>{user?.role}</p>
            <p>Company:</p>
            <p>{user?.company}</p>
            <p>Email:</p>
            <p>{user?.email}</p>
            <p>Phone:</p>
            <p>{user?.phone}</p>
            <p>Address:</p>
            <p>{user?.address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
