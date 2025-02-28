import Image from "next/image";
import Link from "next/link";
import { Doctors } from "@/constants";
import { getMetadata } from "@/app/layout";
import { Button } from "@/components/ui/button";

import { formatDateTime } from "@/lib/utils";
import { getAppointment } from "@/lib/actions/appointment.action";

export const metadata = getMetadata("Appointment Created");

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const appointment = await getAppointment(appointmentId);

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <section className="flex flex-col items-center">
          <Image
            unoptimized={true}
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={280}
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We will be in touch shortly to connfirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>

          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "/assets/images/dr-green.png"}
              alt={doctor?.name || "doctor"}
              height={100}
              width={100}
              className="size-6"
            />

            <p className="whitespace-nowrap">Dr {doctor?.name}</p>
          </div>

          <div className="flex gap-2">
            <Image
              src={"/assets/icons/calendar.svg"}
              alt="Calendar"
              height={24}
              width={24}
            />

            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <section className="flex gap-10">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patients/${userId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>

          <Button variant="outline" className="shad-grey-btn" asChild>
            <Link href={`/`}>Go Home</Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Success;
