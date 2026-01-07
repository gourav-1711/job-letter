import { jsPDF } from "jspdf";
import { JobLetterData, BillData } from "../types";
import { numberToWords, formatCurrency } from "./numberToWords";

export function generateBillPDF(data: BillData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;

  // Main Border (Reddish like image)
  doc.setDrawColor(200, 0, 0);
  doc.setLineWidth(1);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);
  doc.rect(margin + 1, margin + 1, pageWidth - 2 * margin - 2, pageHeight - 2 * margin - 2);

  // Header
  doc.setTextColor(200, 0, 0);
  doc.setFontSize(10);
  doc.text(`Mo. ${data.shopDetails.phones[0]}`, margin + 5, margin + 10);
  doc.text(`Mo. ${data.shopDetails.phones[1]}`, pageWidth - margin - 35, margin + 10);
  
  doc.setFontSize(8);
  doc.text("JAI SHREE SHYAM", pageWidth / 2, margin + 8, { align: "center" });

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text(data.shopDetails.name, pageWidth / 2, margin + 20, { align: "center" });

  doc.setFontSize(10);
  doc.setFillColor(200, 0, 0);
  doc.setTextColor(255, 255, 255);
  doc.rect(pageWidth / 2 - 35, margin + 22, 70, 5, "F");
  doc.text("All Type Gold & Silver Jewellery Seller", pageWidth / 2, margin + 26, { align: "center" });

  doc.setTextColor(200, 0, 0);
  doc.setFontSize(12);
  doc.text(`Add: ${data.shopDetails.address}`, pageWidth / 2, margin + 32, { align: "center" });
  doc.line(margin + 2, margin + 34, pageWidth - margin - 2, margin + 34);

  // Bill Info
  doc.setFontSize(14);
  doc.text(`Bill No. ${data.billNo}`, margin + 5, margin + 42);
  doc.text(`Date: ${data.date}`, pageWidth - margin - 50, margin + 42);

  doc.setFontSize(12);
  doc.text(`Mr./Ms. ${data.customerName || "......................................................................................"}`, margin + 5, margin + 50);
  doc.text(`Add. ${data.customerAddress || "........................................................................................."}`, margin + 5, margin + 58);

  // Watermark
  doc.setTextColor(240, 240, 240);
  doc.setFontSize(100);
  doc.text("JW", pageWidth / 2, pageHeight / 2, { align: "center", angle: 0 });

  // Footer
  doc.setTextColor(200, 0, 0);
  doc.setFontSize(12);
  doc.text("Jewellery Wala", pageWidth - margin - 40, pageHeight - margin - 15);
  doc.text("Signature", pageWidth - margin - 35, pageHeight - margin - 10);

  doc.save(`Bill_${data.billNo}.pdf`);
}

export function generateJobLetterPDF(data: JobLetterData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;

  // Draw decorative border
  drawDecorativeBorder(doc, pageWidth, pageHeight, margin);

  // Company Header
  const headerY = 35;
  doc.setFont("times", "normal");
  doc.setFontSize(28);
  doc.setTextColor(139, 119, 42); // Gold color
  doc.text(data.companyName, pageWidth / 2, headerY, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  doc.text(data.companyAddress, pageWidth / 2, headerY + 8, {
    align: "center",
  });
  doc.text(`Email: ${data.companyEmail}`, pageWidth / 2, headerY + 14, {
    align: "center",
  });

  // Horizontal line under header
  doc.setDrawColor(139, 119, 42);
  doc.setLineWidth(0.5);
  doc.line(margin + 10, headerY + 20, pageWidth - margin - 10, headerY + 20);

  // Letter content
  let currentY = headerY + 40;
  const leftMargin = margin + 15;
  const lineHeight = 7;

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(12);
  doc.setFont("times", "normal");

  // To section
  doc.text("To,", leftMargin, currentY);
  currentY += lineHeight;
  doc.text(
    `Name of Employee: ${data.employeeName || "_____________________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;
  doc.text(
    `Address: ${data.employeeAddress || "_____________________________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 2;

  // Subject
  doc.setFontSize(14);
  doc.setFont("times", "bold");
  doc.setTextColor(139, 119, 42);
  doc.text(
    "Subject: Appointment & Joining Confirmation Letter",
    leftMargin,
    currentY
  );
  currentY += lineHeight * 2;

  // Body
  doc.setFontSize(11);
  doc.setFont("times", "normal");
  doc.setTextColor(40, 40, 40);

  doc.text(
    `Dear Mr/Ms: ${data.employeeName || "_______________"}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 1.5;

  // Position and joining
  const positionText = `We are pleased to offer the position of ${
    data.position || "____________"
  } at`;
  doc.text(positionText, leftMargin, currentY);
  currentY += lineHeight;

  doc.text(
    `at ${data.companyName}. You are required to join on`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;

  const joiningText = data.joiningDate
    ? new Date(data.joiningDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "_________ (Joining Date)";
  doc.text(joiningText + ".", leftMargin, currentY);
  currentY += lineHeight;

  // Additional tasks
  if (data.additionalTasks) {
    doc.text(
      `Any additional tasks: ${data.additionalTasks}`,
      leftMargin,
      currentY
    );
    currentY += lineHeight;
  }

  currentY += lineHeight * 0.5;

  // Salary
  const salaryInWords =
    data.monthlySalary > 0 ? numberToWords(data.monthlySalary) : "____________";
  const salaryFormatted =
    data.monthlySalary > 0 ? formatCurrency(data.monthlySalary) : "________";
  doc.text(
    `Your monthly salary will be Rs. ${salaryFormatted} (in words: ${salaryInWords})`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;

  // Working hours description
  if (data.workingHoursDescription) {
    doc.text(
      `Your working hours will (in words: ${data.workingHoursDescription}).`,
      leftMargin,
      currentY
    );
    currentY += lineHeight;
  }

  // Working hours time
  const fromTime = data.workingHoursFrom || "_________";
  const toTime = data.workingHoursTo || "_________";
  doc.text(
    `Your working hours will: From: ${fromTime} to ${toTime}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight;

  // Weekly off
  const weeklyOff1 = data.weeklyOff1 || "____________";
  const weeklyOff2 = data.weeklyOff2 || "____________";
  doc.text(
    `Weekly Off: ${weeklyOff1}              Weekly Off: ${weeklyOff2}`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 1.5;

  // Probation
  const probationText =
    data.probationMonths > 0 ? data.probationMonths.toString() : "_";
  doc.text(
    `You will be under your probation period of ${probationText} months from date of joining.`,
    leftMargin,
    currentY
  );
  currentY += lineHeight * 2;

  // Closing
  doc.text("Sincerely,", leftMargin, currentY);
  currentY += lineHeight;
  doc.text("Authorized Signatory", leftMargin, currentY);
  currentY += lineHeight;
  doc.text(`${data.companyName} _______________`, leftMargin, currentY);

  // Save PDF
  const fileName = data.employeeName
    ? `Job_Letter_${data.employeeName.replace(/\s+/g, "_")}.pdf`
    : "Job_Letter.pdf";
  doc.save(fileName);
}

function drawDecorativeBorder(
  doc: jsPDF,
  pageWidth: number,
  pageHeight: number,
  margin: number
): void {
  // Outer border
  doc.setDrawColor(180, 160, 100);
  doc.setLineWidth(2);
  doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

  // Inner border
  doc.setDrawColor(200, 180, 120);
  doc.setLineWidth(0.5);
  doc.rect(
    margin + 3,
    margin + 3,
    pageWidth - 2 * margin - 6,
    pageHeight - 2 * margin - 6
  );

  // Decorative corner elements
  const cornerSize = 12;
  doc.setDrawColor(180, 160, 100);
  doc.setLineWidth(1);

  // Top-left corner
  doc.line(margin + 5, margin + cornerSize, margin + 5, margin + 5);
  doc.line(margin + 5, margin + 5, margin + cornerSize, margin + 5);

  // Top-right corner
  doc.line(
    pageWidth - margin - 5,
    margin + cornerSize,
    pageWidth - margin - 5,
    margin + 5
  );
  doc.line(
    pageWidth - margin - cornerSize,
    margin + 5,
    pageWidth - margin - 5,
    margin + 5
  );

  // Bottom-left corner
  doc.line(
    margin + 5,
    pageHeight - margin - cornerSize,
    margin + 5,
    pageHeight - margin - 5
  );
  doc.line(
    margin + 5,
    pageHeight - margin - 5,
    margin + cornerSize,
    pageHeight - margin - 5
  );

  // Bottom-right corner
  doc.line(
    pageWidth - margin - 5,
    pageHeight - margin - cornerSize,
    pageWidth - margin - 5,
    pageHeight - margin - 5
  );
  doc.line(
    pageWidth - margin - cornerSize,
    pageHeight - margin - 5,
    pageWidth - margin - 5,
    pageHeight - margin - 5
  );
}
