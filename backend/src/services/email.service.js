require('dotenv').config();
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await resend.emails.send({
      from: "LEDGERX Support <onboarding@resend.dev>",
      replyTo: "ledgerxsupport@gmail.com",
      to,
      subject,
      text,
      html,
    });

    if (info.error) {
      console.error("Error sending email:", info.error);
    } else {
      console.log("Email sent successfully:", info.data?.id);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to LEDGERX!";
  const text = `Hi ${name},\n\nWelcome to LEDGERX! We're excited to have you on board.\n\nBest regards,\nThe LEDGERX Team`;
  const html = `
        <p>Hi ${name},</p>
        <p>Welcome to LEDGERX! We're excited to have you on board.</p>
        <p>Best regards,<br>The LEDGERX Team</p>
    `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful!";
  const text = `Hello ${name},\n\nYour transaction of ${amount} to account ${toAccount} was successful.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>Your transaction of ${amount} to account ${toAccount} was successful.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed";
  const text = `Hello ${name},\n\nWe regret to inform you that your transaction of ${amount} to account ${toAccount} has failed. Please try again later.\n\nBest regards,\nThe Backend Ledger Team`;
  const html = `<p>Hello ${name},</p><p>We regret to inform you that your transaction of ${amount} to account ${toAccount} has failed. Please try again later.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail,
};