const QRCode = require("qrcode");
const { generateTicketPDF } = require('../services/pdfService');

async function generateTicketPDFandQR(data) {
  const { ticket_number } = data;

  // Generate QR code AFTER ticket number exists
  const qr_code = await QRCode.toDataURL(
    `http://127.0.0.1:4000/ticket/${ticket_number}`
  );

  const pdfFile = await generateTicketPDF({
    ...data,
    qr_code
  });

  return pdfFile;
}

module.exports = { generateTicketPDFandQR };
