"use client";

import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      // row.orignal grabs from the accessrorKey of data

      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    // accessorKey = the object from data
    // header = name of the heading of col
    // cell =function to modify the cols except heading sort of
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[150x]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: () => "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );

      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image}
            alt={doctor?.name || "Doctor xyz"}
            height={100}
            width={100}
            className="size-8"
          />

          <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row: { original: data } }) => {
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            // title="Schedule Appointment"
            // description="Please confirm the following details to schedule"
          />

          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userid}
            appointment={data}
            // title="Cancel Appointment"
            // description="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];
