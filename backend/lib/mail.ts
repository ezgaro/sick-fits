/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
  <div styles = "
  border:1px solid black;
  padding: 20px;
  font-family: sams-serif;
  line-height: 2;
  font-size: 20px;
  ">
    <h2>Hello there!</h2>
    <p>${text}</p>
    <p>💋 , Stefan Petrov</p>


  </div>
  `;
}

export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}
export interface Envelope {
  from: string;
  to?: string[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email the user a token
  const info = (await transport.sendMail({
    to,
    from: 'krisko@gmail.com',
    subject: 'Your password reset token',
    html: makeANiceEmail(`Your password reset token is here!
    <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">CLICK HERE TO RESET</a>

      `),
  })) as unknown as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`📧Message Sent! Preview it at ${getTestMessageUrl(info)}`);
  }
}
