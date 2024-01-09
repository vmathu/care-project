export interface toastProps {
  type: "success" | "info" | "warning" | "error";
  message: string;
  title: string;
  open: boolean;
}
