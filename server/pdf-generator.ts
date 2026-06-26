import { PDFDocument, PDFPage, rgb } from "pdf-lib";
import { Shipment } from "../drizzle/schema";

export async function generateInvoice(shipment: Shipment): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();

  const fontSize = 12;
  const margin = 40;
  const lineHeight = 20;
  let yPosition = height - margin;

  // Helper function to draw text
  const drawText = (text: string, x: number, y: number, size: number = fontSize, color = rgb(0, 0, 0)) => {
    page.drawText(text, {
      x,
      y,
      size,
      color,
    });
  };

  // Header
  drawText("INVOICE", margin, yPosition, 24, rgb(0, 212, 255));
  yPosition -= lineHeight * 2;

  drawText("Midwest Logistics Company", margin, yPosition, 14);
  yPosition -= lineHeight;
  drawText("123 Logistics Ave, City, State 12345", margin, yPosition, 10);
  yPosition -= lineHeight;
  drawText("Phone: +1-800-LOGISTICS | Email: info@midwestlogistics.com", margin, yPosition, 10);
  yPosition -= lineHeight * 2;

  // Invoice Details
  drawText(`Invoice #: ${shipment.trackingCode}`, margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(`Status: ${shipment.status.toUpperCase()}`, margin, yPosition, 12);
  yPosition -= lineHeight * 2;

  // Sender Info
  drawText("FROM:", margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(shipment.senderDetails.name, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(shipment.senderDetails.address, margin + 10, yPosition, 10);
  yPosition -= lineHeight;
  drawText(`${shipment.senderDetails.city}, ${shipment.senderDetails.country}`, margin + 10, yPosition, 10);
  yPosition -= lineHeight;
  drawText(shipment.senderDetails.email, margin + 10, yPosition, 10);
  yPosition -= lineHeight * 2;

  // Receiver Info
  drawText("TO:", margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(shipment.receiverDetails.name, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(shipment.receiverDetails.address, margin + 10, yPosition, 10);
  yPosition -= lineHeight;
  drawText(`${shipment.receiverDetails.city}, ${shipment.receiverDetails.country}`, margin + 10, yPosition, 10);
  yPosition -= lineHeight;
  drawText(shipment.receiverDetails.email, margin + 10, yPosition, 10);
  yPosition -= lineHeight * 2;

  // Package Info
  drawText("PACKAGE DETAILS:", margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(`Description: ${shipment.packageInfo.description}`, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(`Weight: ${shipment.packageInfo.weight} kg`, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(`Dimensions: ${shipment.packageInfo.dimensions}`, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(`Value: $${shipment.packageInfo.value}`, margin + 10, yPosition, 11);
  yPosition -= lineHeight * 2;

  // Footer
  drawText("Thank you for your business!", margin, margin + lineHeight, 11);
  drawText("© 2026 Midwest Logistics Company. All rights reserved.", margin, margin, 9);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

export async function generateReceipt(shipment: Shipment): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // Letter size
  const { width, height } = page.getSize();

  const fontSize = 12;
  const margin = 40;
  const lineHeight = 20;
  let yPosition = height - margin;

  // Helper function to draw text
  const drawText = (text: string, x: number, y: number, size: number = fontSize, color = rgb(0, 0, 0)) => {
    page.drawText(text, {
      x,
      y,
      size,
      color,
    });
  };

  // Header
  drawText("SHIPMENT RECEIPT", margin, yPosition, 24, rgb(0, 212, 255));
  yPosition -= lineHeight * 2;

  drawText("Midwest Logistics Company", margin, yPosition, 14);
  yPosition -= lineHeight;
  drawText("123 Logistics Ave, City, State 12345", margin, yPosition, 10);
  yPosition -= lineHeight * 2;

  // Receipt Details
  drawText(`Tracking Code: ${shipment.trackingCode}`, margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(`Date: ${new Date().toLocaleDateString()}`, margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(`Status: ${shipment.status.toUpperCase()}`, margin, yPosition, 12);
  yPosition -= lineHeight * 2;

  // Shipment Summary
  drawText("SHIPMENT SUMMARY:", margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText(`From: ${shipment.senderDetails.name}`, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(`To: ${shipment.receiverDetails.name}`, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(`Package: ${shipment.packageInfo.description}`, margin + 10, yPosition, 11);
  yPosition -= lineHeight;
  drawText(`Weight: ${shipment.packageInfo.weight} kg`, margin + 10, yPosition, 11);
  yPosition -= lineHeight * 2;

  // Important Notice
  drawText("IMPORTANT:", margin, yPosition, 12);
  yPosition -= lineHeight;
  drawText("Please keep this receipt for your records.", margin + 10, yPosition, 10);
  yPosition -= lineHeight;
  drawText("Track your shipment using the tracking code above.", margin + 10, yPosition, 10);
  yPosition -= lineHeight * 2;

  // Footer
  drawText("Thank you for choosing Midwest Logistics!", margin, margin + lineHeight, 11);
  drawText("© 2026 Midwest Logistics Company. All rights reserved.", margin, margin, 9);

  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}
