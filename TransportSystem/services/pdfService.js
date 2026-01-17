const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const QRCode = require("qrcode");

async function generateTicketPDF(ticketData) {
    const templatePath = path.join(__dirname, "../templates/ticket.html");
    let html = fs.readFileSync(templatePath, "utf8");

    // Generate QR code that links to the ticket URL
    const ticketUrl = `http://127.0.0.1:4000/ticket/${ticketData.ticket_number}`;
    const qrCodeDataUrl = await QRCode.toDataURL(ticketUrl);

    // Add QR code as ticketData.qr_code
    ticketData.qr_code = qrCodeDataUrl;

    // Replace placeholders in HTML
    Object.keys(ticketData).forEach(key => {
        const placeholder = `{{${key}}}`;
        html = html.replace(new RegExp(placeholder, "g"), ticketData[key] || "");
    });

    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Create tickets folder if not exists
    const ticketsFolder = path.join(__dirname, "../tickets");
    if (!fs.existsSync(ticketsFolder)) fs.mkdirSync(ticketsFolder);

    // Generate unique file name
    const filename = `ticket_${Date.now()}.pdf`;
    const filePath = path.join(ticketsFolder, filename);

    await page.pdf({
        path: filePath,
        format: "A4",
        printBackground: true
    });

    await browser.close();
    return filename;
}

module.exports = { generateTicketPDF };
