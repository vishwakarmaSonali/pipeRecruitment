import { toast } from "react-toastify";
import { parse, formatISO } from "date-fns";
import { parsePhoneNumberFromString } from "libphonenumber-js";

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
    position: "top-center",
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
