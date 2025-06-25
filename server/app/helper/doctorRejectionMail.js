const transporter = require("../config/emailConfig");

const sendDoctorRejectionMail = async (req, doctor) => {
    try {
        const first_name = doctor.first_name;
        const last_name = doctor.last_name;


        await transporter.sendMail({
            from: `"The NovaCare Hospital Team" <${process.env.EMAIL_FROM}>`,
            to: doctor.email,
            subject: `Update on Your NovaCare Hospital Registration Status`,
            html: `
         <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-left: 6px solid #d9534f; font-family: Arial, sans-serif; color: #333;">
        <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid #d9534f;">
        <h1 style="color: #d9534f; font-size: 24px;">NovaCare Hospital – Registration Update</h1>
    </div>

    <div style="padding: 20px 0; line-height: 1.6;">
        <p>Dear <strong>Dr. ${first_name} ${last_name}</strong>,</p>

        <p>We appreciate your interest in joining <strong>NovaCare Hospital</strong> and sincerely thank you for taking the time to apply.</p>

        <p>After a thorough review of your application, our team has made the difficult decision to not proceed with your registration at this time. Please understand that this decision was made after careful consideration of various factors, and it does not reflect your expertise, skills, or capabilities as a doctor.</p>

        <p>We truly believe that you are a talented medical professional, and we encourage you to apply again in the future if you wish. NovaCare is always looking for exceptional individuals to join our team, and we would be happy to reconsider your application at a later time.</p>

        <p>If you have any questions or would like to apply again in the future, you may do so through our website or contact us at <strong>novacare@yopmail.com</strong>.</p>

        <p>We sincerely wish you the very best in your medical career, and we hope that our paths may cross again in the future.</p>

        <br>
        <p>Best Regards,</p>
        <p>The NovaCare Hospital Team</p>
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

module.exports = sendDoctorRejectionMail;