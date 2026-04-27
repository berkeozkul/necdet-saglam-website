"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "necdet.saglam@acibadem.com", // Bu e-posta adresine formlar gönderilecek
      subject: `Web Sitesi İletişim Formu: ${subject || 'Belirtilmemiş'}`,
      text: `
        Yeni bir iletişim formu mesajı aldınız:
        
        Ad: ${firstName}
        Soyad: ${lastName}
        Telefon: ${phone}
        Konu: ${subject}
        Mesaj: ${message}
      `,
      html: `
        <h3>Yeni İletişim Formu Mesajı</h3>
        <ul>
          <li><strong>Ad:</strong> ${firstName}</li>
          <li><strong>Soyad:</strong> ${lastName}</li>
          <li><strong>Telefon:</strong> ${phone}</li>
          <li><strong>Konu:</strong> ${subject}</li>
        </ul>
        <p><strong>Mesaj:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "E-posta gönderilemedi. Lütfen ayarlarınızı kontrol edin." };
  }
}
