import PatientForm from "@/components/forms/PatientForm";
import FullLogo from "@/components/FullLogo";
import PassKeyModal from "@/components/PassKeyModal";
import Link from "next/link";
import { getMetadata } from "./layout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const metadata = getMetadata("Home");

const Home = ({ searchParams }: SearchParamProps) => {
  const isAdmin = searchParams.admin === "true";

  return (
    <div className="flex max-h-screen h-screen">
      {/* OTP modal */}
      {isAdmin && <PassKeyModal />}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <FullLogo />
          <PatientForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              @2025 NextCare
            </p>

            <Link href="/?admin=true" className="text-green-500">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>Admin</TooltipTrigger>
                  <TooltipContent className="m-1 text-lg bg-dark-500">
                    <p>Passcode: 123456</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
