import nodemailer from "nodemailer";
import { config } from "../config/config";

export const sendReferralEmail = async (
  recipientEmail: string,
  referrerName: string,
  refereeName: string
) => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.senderEmail, // Replace with your Gmail
        pass: config.senderPass, // Use the App Password from Google
      },
    });

    // Email options
    const mailOptions = {
      from: config.senderEmail,
      to: recipientEmail,
      subject: "Referral Invitation",
      text: `Congratulations! ${refereeName}, You have been reffered by ${referrerName}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
