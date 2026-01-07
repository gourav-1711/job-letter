"use client";

import { JobLetterData } from "../types";
import { numberToWords, formatCurrency } from "../utils/numberToWords";

interface LetterPreviewProps {
  data: JobLetterData;
}

export default function LetterPreview({ data }: LetterPreviewProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "_________";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "_________";
    return timeString;
  };

  return (
    <div className="letter-preview">
      <div className="letter-border">
        <div className="letter-content" style={{ padding: '40px', color: '#000', fontFamily: 'serif' }}>
          {/* Header */}
          <div className="letter-header" style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #b8860b', paddingBottom: '20px' }}>
            <h1 className="company-name" style={{ fontSize: '36px', color: '#8b7a2b', margin: 0, fontWeight: 'bold' }}>
              {data.companyName || "Company Name"}
            </h1>
            <p className="company-address" style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
              {data.companyAddress || "Company Address"}
            </p>
            <p className="company-email" style={{ fontSize: '14px', color: '#666', margin: '5px 0' }}>
              Email: {data.companyEmail || "company@email.com"}
            </p>
          </div>

          {/* To Section */}
          <div className="letter-to" style={{ marginBottom: '30px', fontSize: '16px' }}>
            <p style={{ margin: '5px 0' }}>To,</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
              Name of Employee: {data.employeeName || "_____________________"}
            </p>
            <p style={{ margin: '5px 0' }}>
              Address: {data.employeeAddress || "_____________________________"}
            </p>
          </div>

          {/* Subject */}
          <h2 className="letter-subject" style={{ fontSize: '18px', color: '#8b7a2b', fontWeight: 'bold', textDecoration: 'underline', marginBottom: '30px' }}>
            Subject: Appointment & Joining Confirmation Letter
          </h2>

          {/* Body */}
          <div className="letter-body" style={{ fontSize: '15px', lineHeight: '1.8', textAlign: 'justify' }}>
            <p style={{ marginBottom: '20px' }}>Dear Mr/Ms: {data.employeeName || "_______________"}</p>

            <p style={{ marginBottom: '15px' }}>
              We are pleased to offer the position of{" "}
              <span style={{ fontWeight: 'bold' }}>{data.position || "____________"}</span> at {data.companyName}. You are
              required to join on <span style={{ fontWeight: 'bold' }}>{formatDate(data.joiningDate)}</span>.
            </p>

            {data.additionalTasks && (
              <p style={{ marginBottom: '15px' }}>Any additional tasks: {data.additionalTasks}</p>
            )}

            <p style={{ marginBottom: '15px' }}>
              Your monthly salary will be Rs.{" "}
              <span style={{ fontWeight: 'bold' }}>{data.monthlySalary > 0
                ? formatCurrency(data.monthlySalary)
                : "________"}</span>{" "}
              (in words:{" "}
              <span style={{ fontWeight: 'bold' }}>{data.monthlySalary > 0
                ? numberToWords(data.monthlySalary)
                : "____________"}</span>
              )
            </p>

            {data.workingHoursDescription && (
              <p style={{ marginBottom: '15px' }}>
                Your working hours will (in words:{" "}
                {data.workingHoursDescription}).
              </p>
            )}

            <p style={{ marginBottom: '15px' }}>
              Your working hours will: From: {formatTime(data.workingHoursFrom)}{" "}
              to {formatTime(data.workingHoursTo)}
            </p>

            <p style={{ marginBottom: '15px' }}>
              Weekly Off: {data.weeklyOff1 || "____________"}
              {data.weeklyOff2 && ` | Weekly Off: ${data.weeklyOff2}`}
            </p>

            <p style={{ marginBottom: '30px' }}>
              You will be under your probation period of{" "}
              <span style={{ fontWeight: 'bold' }}>{data.probationMonths || "_"}</span> months from date of joining.
            </p>
          </div>

          {/* Closing */}
          <div className="letter-closing" style={{ marginTop: '50px' }}>
            <p style={{ margin: '5px 0' }}>Sincerely,</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>Authorized Signatory</p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>{data.companyName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
