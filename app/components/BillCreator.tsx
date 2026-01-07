"use client";

import { useState } from "react";
import { BillData, defaultBillData } from "../types";

interface BillCreatorProps {
  data: BillData;
  onChange: (data: BillData) => void;
  onDownload: () => void;
}

export default function BillCreator({ data, onChange, onDownload }: BillCreatorProps) {
  const handleChange = (field: keyof BillData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    onChange({ ...data, items: [...data.items, { description: "", quantity: 1, price: 0 }] });
  };

  return (
    <div className="content-grid">
      <div className="form-wrapper active">
        <div className="section-header">
          <h2>📝 Bill Details</h2>
        </div>
        <div className="form-container">
          <section className="form-section">
            <div className="form-grid">
              <div className="form-group">
                <label>Bill No</label>
                <input type="text" value={data.billNo} onChange={(e) => handleChange("billNo", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={data.date} onChange={(e) => handleChange("date", e.target.value)} />
              </div>
              <div className="form-group full-width">
                <label>Customer Name</label>
                <input type="text" value={data.customerName} onChange={(e) => handleChange("customerName", e.target.value)} placeholder="Mr./Ms." />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <input type="text" value={data.customerAddress} onChange={(e) => handleChange("customerAddress", e.target.value)} />
              </div>
            </div>
          </section>

          <section className="form-section">
            <h3 className="section-title">Items</h3>
            {data.items.map((item, index) => (
              <div key={index} className="form-grid" style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                <div className="form-group" style={{ flex: 2 }}>
                  <label>Description</label>
                  <input type="text" value={item.description} onChange={(e) => handleItemChange(index, "description", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Qty</label>
                  <input type="number" value={item.quantity} onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)} />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="number" value={item.price} onChange={(e) => handleItemChange(index, "price", parseInt(e.target.value) || 0)} />
                </div>
              </div>
            ))}
            <button className="btn btn-secondary" onClick={addItem} style={{ marginTop: '10px' }}>+ Add Item</button>
          </section>
        </div>
        <div className="action-buttons">
          <button className="btn btn-primary" onClick={onDownload}>
            <span>📥</span> Download Bill PDF
          </button>
        </div>
      </div>

      <div className="preview-wrapper active">
        <div className="section-header">
          <h2>👁️ Bill Preview</h2>
        </div>
        <div className="bill-preview-card" style={{ 
          background: 'white', 
          padding: '20px', 
          border: '2px solid #c00',
          position: 'relative',
          minHeight: '600px',
          fontFamily: 'serif'
        }}>
          <div style={{ color: '#c00', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span>Mo. {data.shopDetails.phones[0]}</span>
            <span>Mo. {data.shopDetails.phones[1]}</span>
          </div>
          <div style={{ textAlign: 'center', color: '#c00' }}>
            <div style={{ fontSize: '10px' }}>JAI SHREE SHYAM</div>
            <h1 style={{ margin: '5px 0', fontSize: '32px', fontWeight: 'bold' }}>{data.shopDetails.name}</h1>
            <div style={{ background: '#c00', color: 'white', padding: '2px 10px', display: 'inline-block', fontSize: '12px', borderRadius: '4px' }}>
              All Type Gold & Silver Jewellery Seller
            </div>
            <div style={{ marginTop: '5px', fontSize: '14px' }}>Add: {data.shopDetails.address}</div>
            <hr style={{ borderColor: '#c00', margin: '10px 0' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c00', margin: '10px 0', fontSize: '16px' }}>
            <span>Bill No. {data.billNo}</span>
            <span>Date: {data.date}</span>
          </div>

          <div style={{ color: '#c00', fontSize: '16px', lineHeight: '2' }}>
            <div>Mr./Ms. <span style={{ borderBottom: '1px dotted #c00', flex: 1, display: 'inline-block', minWidth: '200px' }}>{data.customerName}</span></div>
            <div>Add. <span style={{ borderBottom: '1px dotted #c00', flex: 1, display: 'inline-block', minWidth: '200px' }}>{data.customerAddress}</span></div>
          </div>

          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)', 
            fontSize: '150px', 
            color: 'rgba(200, 0, 0, 0.05)',
            zIndex: 0,
            pointerEvents: 'none'
          }}>
            JW
          </div>

          <div style={{ marginTop: 'auto', position: 'absolute', bottom: '40px', right: '40px', textAlign: 'center', color: '#c00' }}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Jewellery Wala</div>
            <div style={{ fontSize: '14px' }}>Signature</div>
          </div>
        </div>
      </div>
    </div>
  );
}
