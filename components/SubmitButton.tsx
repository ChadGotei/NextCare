import Image from "next/image";
import { Button } from "./ui/button";

interface ButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
  status?: Status;
}

const SubmitButton = ({ isLoading, className, status ,children }: ButtonProps) => {
  return (
    <Button
      type="submit"
      disabled={isLoading || status === 'cancelled'}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            className="animate-spin"
            height={24}
            width={24}
            alt="loader"
          />
          loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
