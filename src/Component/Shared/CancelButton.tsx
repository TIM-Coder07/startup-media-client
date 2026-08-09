"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  id: string;
  startupTitle: string;
};

export default function CancelButton({
  id,
  startupTitle,
}: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BETTER_AUTH_URL}/applications/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      toast.success("Investment request deleted");

      router.refresh();

    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <AlertDialog>
      <Button isIconOnly variant="danger">
        <Trash2 size={18} />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog>
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Investment?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              Are you sure you want to delete{" "}
              <strong>{startupTitle}</strong>?
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger"
                onPress={handleDelete}
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}