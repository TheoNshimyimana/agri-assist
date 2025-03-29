import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: (string | undefined | null | boolean)[]) => {
  return twMerge(clsx(inputs));
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
}

const buttonVariants = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
  ghost: "text-gray-700 hover:bg-gray-200",
};

const Button: React.FC<ButtonProps> = ({ variant = "default", className, ...props }) => {
  return (
    <button
      className={cn(
        "rounded-md px-4 py-2 font-medium transition duration-200",
        buttonVariants[variant],
        className
      )}
      {...props}
    />
  );
};

export { Button };
