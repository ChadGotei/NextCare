import Image from "next/image";
import { getMetadata } from "@/app/layout";
import RegisterForm from "@/components/forms/RegisterForm";
import FullLogo from "@/components/FullLogo";
import { getUser } from "@/lib/actions/patient.actions";

export const metadata = getMetadata("Register User");

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);

  return (
    <div className="flex max-h-screen h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
         
         <FullLogo />
          {/* <PatientForm /> */}
          <RegisterForm user={user} />

          <p className="copyright py-12 ">@2025 NextCare</p>
        </div>
      </section>

      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Register;
