const transporter = require("../config/emailConfig");
const TokenModel = require("../model/token");

const adminVerificationEmail = async (req, admin, token) => {
    try {
        const first_name = admin.first_name;
        const last_name = admin.last_name;

        
        // Construct verification link
        const verificationLink = `http://${req.headers.host}/verification/${token}`;

        await transporter.sendMail({
            from: `"The NovaCare Hospital Team" <${process.env.EMAIL_FROM}>`,
            to: admin.email,
            subject: "Welcome to NovaCare Hospital – Your Health, Our Priority",
            html: `
            <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-left: 6px solid #0077b6; font-family: Arial, sans-serif; color: #333;">
                <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid #0077b6;">
                    <h1 style="color: #0077b6; font-size: 24px;">Welcome to NovaCare Hospital</h1>
                </div>

                <div style="padding: 20px 0; line-height: 1.6;">
                    <p>Dear <strong>${first_name} ${last_name}</strong>,</p>
                    
                    <p>We are pleased to inform you that your registration with <strong>NovaCare Hospital</strong> has been successfully completed.</p>

                    <p>As an <strong>Admin</strong>, you will have access to the <strong>Admin Dashboard</strong>, where you can:</p>
                    <ul>
                        <li>Approve or decline doctor appointments</li>
                        <li>Add, remove, or manage doctors</li>
                        <li>Modify doctors' schedules</li>
                        <li>Monitor website statistics</li>
                        <li>Ensure smooth operation of hospital services</li>
                    </ul>

                    <p>To complete your registration, please verify your email address by clicking the button below:</p>

                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${verificationLink}" style="background-color: #0077b6; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block;">Verify Email</a>
                    </div>

                    <p><strong>Note:</strong> This verification link will expire in <strong>2 hours</strong>. Please complete the process as soon as possible.</p>

                    <p>Once your email is verified, you can log in and start managing hospital operations.</p>

                    <p>We are excited to have you on board and trust that you will handle your responsibilities with diligence. The <strong>NovaCare Team</strong> is here to support you in every possible way.</p>

                    <p>Wishing you a great experience with us!</p>
                </div>

                <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #ddd; text-align: center; font-size: 14px; color: #666;">
                    <p><strong>NovaCare Hospital</strong></p>
                    <p>Your Health, Our Priority</p>
                </div>
            </div>
            `
        });

        return { message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending verification email:", error);
        throw error;
    }
};

module.exports = adminVerificationEmail;