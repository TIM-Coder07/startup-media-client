"use client";

import { ArrowRightFromSquare, Gear, Persons } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function Profile() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <Dropdown>
      <Dropdown.Trigger className="rounded-full">
        <Avatar>
          <Avatar.Image
            alt="Junior Garcia"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
          />
          <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
        </Avatar>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <div className="px-3 pt-3 pb-1">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt="Jane"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
              />
              <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
            </Avatar>

            <div className="flex flex-col gap-0">
              <p className="text-sm leading-5 font-medium">Jane Doe</p>
              <p className="text-xs leading-none text-muted">
                jane@example.com
              </p>
            </div>
          </div>
        </div>

        <Dropdown.Menu>
          <Dropdown.Item id="dashboard">
            <Label>Dashboard</Label>
          </Dropdown.Item>

          <Dropdown.Item id="profile">
            <Label>Profile</Label>
          </Dropdown.Item>

          <Dropdown.Item id="settings">
            <div className="flex w-full items-center justify-between">
              <Label>Settings</Label>
              <Gear className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item id="new-project">
            <div className="flex w-full items-center justify-between">
              <Label>Create Team</Label>
              <Persons className="size-3.5 text-muted" />
            </div>
          </Dropdown.Item>

          <Dropdown.Item
            id="logout"
            variant="danger"
            onAction={handleSignOut}
          >
            <div className="flex w-full items-center justify-between">
              <Label>Log Out</Label>
              <ArrowRightFromSquare className="size-3.5 text-danger" />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}