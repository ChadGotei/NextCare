"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { userFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import {
  createUser,
  getPatient,
  getPatientViaEmail,
} from "@/lib/actions/patient.actions";
import { toastError, toastSuccess } from "@/lib/customToast";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });


 // 2. Define a submit handler.
async function onSubmit({
  name,
  email,
  phone,
}: z.infer<typeof userFormValidation>) {
  setIsLoading(true);
  try {
    const existingPatient = await getPatientViaEmail(email);
    console.log("Existing Patient:", existingPatient);

    if (existingPatient) {
      const patient = await getPatient(existingPatient.$id);
      if (!patient) {
        toastError("User exists but failed to retrieve info!");
        router.push(`/patients/${existingPatient.$id}/register`);
        return;
      }

      if (!patient.isNew) {
        router.push(`/patients/${existingPatient.$id}/new-appointment`);
        toastSuccess("User already exists. Redirecting to appointments.");
        return;
      }
    }

    // If user does not exist, create a new one
    const userData = { name, email, phone };
    const newUser = await createUser(userData);

    if (newUser) {
      router.push(`/patients/${newUser.$id}/register`);
    }
  } catch (error) {
    console.error("Error in form submission:", error);
  } finally {
    setIsLoading(false);
  }
}


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section>
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Pintu@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="7011001900"
        />

        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
