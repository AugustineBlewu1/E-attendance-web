import { createColumnHelper } from "@tanstack/react-table";
import { User, UserStudent } from "../User";

export const columnUsersHelper = createColumnHelper<User>()
export const columnStudentHelper = createColumnHelper<UserStudent>()


export function validateIndexNumber(indexNumber: string): boolean {
    // Define the pattern for the index number
    // PH/PHA/XX/XXXX where XX is a two-digit number and XXXX is a random number
    const pattern = /^PH\/PHA\/\d{2}\/\d{4}$/;

    // Check if the index number matches the pattern
    if (pattern.test(indexNumber)) {
        // Extract the two-digit section from the index number
        // const twoDigitSection = indexNumber.slice(8, 10);

       return true;
    } else {
        return false;
    }
}