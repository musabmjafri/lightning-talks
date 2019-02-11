import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import * as constants from '../constants';

export const sendEmail = async (receivers: string, subject: string, message: string): Promise<string> => {

    try {
        // Transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            host: functions.config().email.smtp,
            port: functions.config().email.port, // or 587
            secure: false, // true for 465, false for other ports
            auth: {
                user: functions.config().email.id,
                pass: functions.config().email.password
            }
        });

        // Email data with unicode symbols
        const mailOptions = {
            from: constants.emailSenderLightningTalks,
            to: receivers, // list of receivers
            subject: subject,
            //text: // plain text body
            html: message // html body
        };

        const info = await transporter.sendMail(mailOptions)
        return info.messageId;
    }
    catch (err) {
        return err;
    }
}