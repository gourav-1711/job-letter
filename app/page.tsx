"use client";

import { useState } from "react";
import JobLetterForm from "./components/JobLetterForm";
import LetterPreview from "./components/LetterPreview";
import BillCreator from "./components/BillCreator";
import { JobLetterData, defaultFormData, BillData, defaultBillData } from "./types";
import { generateJobLetterPDF, generateBillPDF } from "./utils/generatePDF";

export default function Home() {
  const [activeSection, setActiveSection] = useState<"job" | "bill">("job");
  const [formData, setFormData] = useState<JobLetterData>(defaultFormData);
  const [billData, setBillData] = useState<BillData>(defaultBillData);
  const [activeTab, setActiveTab] = useState<"form" | "preview">("form");

  const handleGeneratePDF = () => {
    if (!formData.employeeName || !formData.position) {
      alert("Please fill in Employee Name and Position");
      return;
    }
    generateJobLetterPDF(formData);
  };

  const handleGenerateBillPDF = () => {
    generateBillPDF(billData);
  };

  const handleReset = () => {
    setFormData(defaultFormData);
  };

  return (
    <div className="app-container">
      {/* Header with Navigation */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📄</span>
            <h1>{activeSection === "job" ? "Job Letter Creator" : "Bill Creator"}</h1>
          </div>
          <nav className="main-nav" style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              className={`btn ${activeSection === "job" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveSection("job")}
            >
              💼 Job Letter
            </button>
            <button 
              className={`btn ${activeSection === "bill" ? "btn-primary" : "btn-secondary"}`}
              onClick={() => setActiveSection("bill")}
            >
              🧾 Bill Creator
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {activeSection === "job" ? (
          <>
            <div className="tab-switcher">
              <button
                className={`tab-btn ${activeTab === "form" ? "active" : ""}`}
                onClick={() => setActiveTab("form")}
              >
                <span>📝</span> Form
              </button>
              <button
                className={`tab-btn ${activeTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                <span>👁️</span> Preview
              </button>
            </div>

            <div className="content-grid">
              <div className={`form-wrapper ${activeTab === "form" ? "active" : ""}`}>
                <div className="section-header">
                  <h2>📝 Fill Details</h2>
                </div>
                <JobLetterForm formData={formData} onChange={setFormData} />
                <div className="action-buttons">
                  <button className="btn btn-secondary" onClick={handleReset}>
                    <span>🔄</span> Reset Form
                  </button>
                  <button className="btn btn-primary" onClick={handleGeneratePDF}>
                    <span>📥</span> Download PDF
                  </button>
                </div>
              </div>

              <div className={`preview-wrapper ${activeTab === "preview" ? "active" : ""}`}>
                <div className="section-header">
                  <h2>👁️ Live Preview</h2>
                </div>
                <LetterPreview data={formData} />
                <div className="mobile-download">
                  <button className="btn btn-primary" onClick={handleGeneratePDF}>
                    <span>📥</span> Download PDF
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <BillCreator 
            data={billData} 
            onChange={setBillData} 
            onDownload={handleGenerateBillPDF} 
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Jewellery Wala Tools - Professional Solutions</p>
      </footer>
    </div>
  );
}
