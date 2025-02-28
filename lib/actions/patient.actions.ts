/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
//! Server actions


import { ID, Query } from "node-appwrite"
import { DATABASE_ID, databases, PATIENT_COLLECTION_ID, users } from "../appwrite.config"
import { parseStringify } from "../utils";

// sign up, post user data?
export const createUser = async (user: CreateUserParams) => {
    try {
        const newUser = await users.create(
            ID.unique(), 
            user.email,
            user.phone,
            undefined,  // password
            user.name
        ) 
        
        console.log({newUser});

        return parseStringify(newUser)
    } catch(error: any) {
        if(error && error?.code === 409) {
            // 409 means user already exists.
            const documents = await users.list([
                Query.equal('email', [user.email])
            ])

            return documents?.users[0];
        }
    }
}

// get user details by id
export const getUser = async (userId: string) => {
    try {
        const user = await users.get(userId)

        return parseStringify(user);
    } catch(error) {
        console.log(error);
    }
}

// post requesting to the user sort of
export const registerPatient = async({...patient}: RegisterUserParams) => {
    try {
        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {...patient},
        )

        return parseStringify(newPatient);
    } catch(error) {
        console.log(error);
    }
}

// get patient 
export const getPatient = async (userId: string) => {
    try {
        const patients = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [Query.equal('userid', userId)],
        )

        // since its a document we are returning so [0] for error free purposes
        return parseStringify(patients.documents[0]);
    } catch(error) {
        console.log(error);
    }
}

export const getPatientViaEmail = async (email: string) => {
    try {
      const patients = await users.list([
        Query.equal("email", email),
      ]);
  
      if (!patients?.users?.length) return false;
  
      return parseStringify(patients.users[0]);
    } catch (error) {
      console.error("Error fetching patient:", error);
      return null;
    }
  };
  