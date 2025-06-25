const transporter = require("../config/emailConfig");

const sendDoctorAprovedMail = async (req, doctor) => {
    try {
        const first_name = doctor.first_name;
        const last_name = doctor.last_name;


        await transporter.sendMail({
            from: `"The NovaCare Hospital Team" <${process.env.EMAIL_FROM}>`,
            to: doctor.email,
            subject: `Dr. ${last_name}, Your NovaCare Account is Now Verified!`,
            html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-left: 6px solid #0077b6; font-family: Arial, sans-serif; color: #333;">
        
        <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid #0077b6;">
            <h1 style="color: #0077b6; font-size: 24px;">Congratulations, Dr. ${first_name} ${last_name}!</h1>
        </div>

        <div style="padding: 20px 0; line-height: 1.6;">
            <p>Dear <strong>Dr. ${first_name} ${last_name}</strong>,</p>

            <p>We are delighted to inform you that your registration process at <strong>NovaCare Hospital</strong> has been successfully completed! </p>

            <p>After carefully reviewing your credentials and qualifications, we are confident that you are a perfect fit for our esteemed medical team.</p>

            <p>You are now officially a doctor at <strong>NovaCare Hospital</strong>, and patients can start booking appointments with you.</p>

            <p><strong>What’s next?</strong></p>
            <ul>
                <li>You can now log in to your account and check your assigned schedule and consultation fees.</li>
                <li>Patients will be able to book appointments with you based on your availability.</li>
                <li>Upcoming appointments will be displayed in your account dashboard.</li>
            </ul>

            <p><strong>Need to adjust your schedule?</strong></p>
            <p>If you have any concerns regarding your assigned schedule, feel free to reach out to our support team at <a style="color: #0077b6; text-decoration: underline;" href="mailto:novacare@yopmail.com">novacare@yopmail.com</a>.</p>

            <p>We are thrilled to have you on board, and we look forward to working together for the well-being of our patients and the prestige of <strong>NovaCare Hospital</strong>.</p>

            <br>
            <p>Best of luck, and do your best!</p>
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

module.exports = sendDoctorAprovedMail;