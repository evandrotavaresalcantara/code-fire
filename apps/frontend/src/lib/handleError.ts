import { toast } from "sonner";

export function handleError(error: unknown) {
  if (error instanceof Error) {
    console.error(error.message);
    toast.error(error.message);
  } else {
    console.error(`${error}`);
    toast.error(`${error}`);
  }
}
