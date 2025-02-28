import Image from "next/image";
import FullLogo from "@/components/FullLogo";
import { getPatient } from "@/lib/actions/patient.actions";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getMetadata } from "@/app/layout";

export const metadata = getMetadata("New Appointment");

const NewAppointment = async ({ params: { userId } }: SearchParamProps) => {
  const patient = await getPatient(userId);

  return (
    <div className="flex max-h-screen h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px]">

          <FullLogo />

          {/* userId == patientId unless we are going into admin mode that is also the reason of using type="create/delete" */}
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />

          <p className="copyright mt-8 py-8">@2025 NextCare</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
