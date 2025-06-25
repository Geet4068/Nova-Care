const transporter = require("../config/emailConfig");

const sendDoctorFeesScheduleUpdateMail = async (req, doctor) => {
    try {
        const first_name = doctor.first_name;
        const last_name = doctor.last_name;


        await transporter.sendMail({
            from: `"The NovaCare Hospital Team" <${process.env.EMAIL_FROM}>`,
            to: doctor.email,
            subject: " Important Update Regarding Your Fees or Schedules",
            html: `
            <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-left: 6px solid #0077b6; font-family: Arial, sans-serif; color: #333;">
    <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid #0077b6;">
        <h1 style="color: #0077b6; font-size: 24px;">NovaCare Hospital</h1>
    </div>

    <div style="padding: 20px 0; line-height: 1.6;">
        <p>Dear <strong>${doctor.first_name} ${doctor.last_name}</strong>,</p>

        <p>We would like to inform you that there has been an update to your <strong>fees or schedule</strong> at NovaCare Hospital.</p>

        <p>If you were not informed about this change earlier or if you have any concerns regarding the updates, please reach out to us at your earliest convenience.</p>

        <p>To review your updated schedule and fees, please log in to your account.</p>

        <div style="text-align: center; margin: 20px 0;">
            <a href="http://yourhospitalwebsite.com/login" style="background-color: #0077b6; color: white; padding: 12px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px; display: inline-block;">Login to Your Account</a>
        </div>

        <p>If you have any questions or need assistance, feel free to contact our support team at <strong>novacare@yopmail.com</strong>.</p>

        <p>Thank you for your dedication and service to our patients.</p>

        <p>Best Regards,</p>
        <p><strong>The NovaCare Hospital Team</strong></p>
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

module.exports = sendDoctorFeesScheduleUpdateMail;