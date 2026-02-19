import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
  const { user, profile } = useAuth() as any;

  const email = user?.email ?? user?.user?.email ?? "";
  const meta = user?.user_metadata ?? user?.user?.user_metadata ?? {};
  const name =
    profile?.full_name ||
    meta?.full_name ||
    meta?.name ||
    (email ? email.split("@")[0] : "User");

  return (
    <div className="p-6 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div><span className="font-medium">Name:</span> {name}</div>
          <div><span className="font-medium">Email:</span> {email}</div>
          <div><span className="font-medium">Role:</span> {profile?.role ?? "student"}</div>
        </CardContent>
      </Card>
    </div>
  );
}
