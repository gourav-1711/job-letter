export interface JobLetterData {
  // Company Information
  companyName: string;
  companyAddress: string;
  companyEmail: string;

  // Employee Information
  employeeName: string;
  employeeAddress: string;
  position: string;

  // Job Details
  joiningDate: string;
  monthlySalary: number;
  workingHoursDescription: string;
  workingHoursFrom: string;
  workingHoursTo: string;
  timeFormat: "AM" | "PM";
  weeklyOff1: string;
  weeklyOff2: string;
  probationMonths: number;
  additionalTasks: string;
}

export interface BillData {
  billNo: string;
  date: string;
  customerName: string;
  customerAddress: string;
  items: Array<{
    description: string;
    quantity: number;
    price: number;
  }>;
  shopDetails: {
    name: string;
    address: string;
    phones: string[];
    email: string;
  };
}

export const defaultFormData: JobLetterData = {
  companyName: "Jewellery Wala",
  companyAddress: "Jhalamand Circle, Jodhpur",
  companyEmail: "jewellerywalaonline@gmail.com",
  employeeName: "",
  employeeAddress: "",
  position: "",
  joiningDate: "",
  monthlySalary: 0,
  workingHoursDescription: "",
  workingHoursFrom: "09:00 AM",
  workingHoursTo: "06:00 PM",
  timeFormat: "AM",
  weeklyOff1: "Sunday",
  weeklyOff2: "",
  probationMonths: 3,
  additionalTasks: "",
};

export const defaultBillData: BillData = {
  billNo: "1900",
  date: new Date().toISOString().split('T')[0],
  customerName: "",
  customerAddress: "",
  items: [{ description: "", quantity: 1, price: 0 }],
  shopDetails: {
    name: "JEWELLERY WALA",
    address: "Jhalamand Circle, Jodhpur",
    phones: ["8094681299", "9460343208"],
    email: "jewellerywalaonline@gmail.com",
  },
};
