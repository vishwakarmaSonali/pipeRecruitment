import { toast } from "react-toastify";
import { parse, formatISO } from "date-fns";
import {
  parsePhoneNumberFromString,
  getCountryCallingCode,
} from "libphonenumber-js";

export const notifySuccess = (success) => {
  toast.dismiss();
  toast.success(success, {
    position: "bottom-right",
    autoClose: 2000,
  });
};

export const notifyError = (error) => {
  toast.dismiss();
  toast.error(error, {
    position: "bottom-right",
    autoClose: 2000,
  });
};

export const notifyInfo = (error) => {
  toast.dismiss();
  toast.info(error, {
    position: "top-center",
    autoClose: 2000,
  });
};

export const getRandomColor = () => {
  const colors = [
    "#D34B72",
    "#D4C158",
    "#38658E",
    "#9BCD6A",
    "#6D58D4",
    "#CDA26A",
    "#6AAFCD",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export function formatCustomDate(input) {
  const date = input instanceof Date ? input : new Date(input);

  if (isNaN(date)) return "Invalid Date";

  return date
    .toLocaleString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .replace("at", " •");
}

export function formatTwoDigits(num) {
  return num < 10 ? `0${num}` : `${num}`;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export function convertToISO(dateString) {
  // Parse input format: "January 26, 2025 • 8:14 AM"
  const parsedDate = parse(dateString, "MMMM dd, yyyy • h:mm a", new Date());

  // Convert to ISO format: "2025-02-26T08:14:00+05:30"
  return formatISO(parsedDate, { representation: "complete" });
}

export function formatPhoneNumber(phoneNumber) {
  // Ensure phone number starts with '+'
  if (!phoneNumber.startsWith("+")) {
    phoneNumber = "+" + phoneNumber;
  }

  // Parse the phone number
  const parsedNumber = parsePhoneNumberFromString(phoneNumber);

  if (!parsedNumber) return phoneNumber; // Return as is if invalid

  // Extract country code and national number
  const countryCode = parsedNumber.countryCallingCode;
  const nationalNumber = parsedNumber.nationalNumber;

  // Format the national number with a custom pattern (XXXXX-XXXXX)
  const formattedNational = nationalNumber.replace(/(\d{5})(\d+)/, "$1-$2");

  return `(+${countryCode}) ${formattedNational}`;
}

export const getInitials = (name) => {
  if (!name) return "";

  return name
    .split(" ") // Split by space to get words
    .map((word) => word.charAt(0)) // Get first letter of each word
    .join("") // Join initials
    .toUpperCase(); // Convert to uppercase
};

export function formatDateMonthYear(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
}

export const convertToISODate = (date) => {
  // Create a Date object using the month name and year
  const newDate = new Date(`${date?.month} 1, ${date?.year}`);

  // Format to YYYY-MM-DD
  return `${newDate.getFullYear()}-${(newDate.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-01`;
};

export const getCallingCode = (countryCode) => {
  try {
    return `+${getCountryCallingCode(countryCode.toUpperCase())}`;
  } catch (error) {
    return "undefined";
  }
};

export function getCountryCode(phoneNumber) {
  const phoneNumberObj = parsePhoneNumberFromString(phoneNumber);
  return phoneNumberObj ? phoneNumberObj.country : false;
}

export function toSnakeCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/\s+/g, "_")
    .toLowerCase();
}
