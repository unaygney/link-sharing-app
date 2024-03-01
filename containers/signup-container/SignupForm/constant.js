import EmailIcon from "@/public/icon-email.svg?url";
import PasswordIcon from "@/public/icon-password.svg?url";

export const FORM_DATA = [
  {
    id: 0,
    name: "email",
    label: "Email address",
    type: "email",
    placeholder: "e.g alex@email.com",
    icon: EmailIcon,
  },
  {
    id: 1,
    name: "password",
    label: "Create password",
    type: "password",
    placeholder: "At least 8 characters",
    icon: PasswordIcon,
  },
  {
    id: 2,
    name: "rePassword",
    label: "Confirm password",
    type: "password",
    placeholder: "At least 8 characters",
    icon: PasswordIcon,
  },
];
