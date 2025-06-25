const transporter = require("../config/emailConfig");

const sendDoctorConfirmationEmail = async (req, doctor) => {
    try {
        const first_name = doctor.first_name;
        const last_name = doctor.last_name;


        await transporter.sendMail({
            from: `"The NovaCare Hospital Team" <${process.env.EMAIL_FROM}>`,
            to: doctor.email,
            subject: "Welcome to NovaCare Hospital – Your Health, Our Priority",
            html: `
            <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-left: 6px solid #0077b6; font-family: Arial, sans-serif; color: #333;">
                
                <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid #0077b6;">
                    <h1 style="color: #0077b6; font-size: 24px;">Welcome to NovaCare Hospital</h1>
                </div>
        
                <div style="padding: 20px 0; line-height: 1.6;">
                    <p>Dear <strong>Dr. ${first_name} ${last_name}</strong>,</p>
        
                    <p>We are pleased to inform you that your registration with <strong>NovaCare Hospital</strong> has been successfully completed.</p>
        
                    <p>Our team is now reviewing your qualifications and credentials, which is expected to take approximately <strong>4-5 working days</strong>. Once verified, you will officially become a part of our esteemed medical team.</p>
        
                    <p>After verification:</p>
                    <ul>
                        <li>Patients will be able to book appointments with you.</li>
                        <li>You will receive notifications about your upcoming schedules.</li>
                        <li>You can log in to your account to check your appointment details and manage your availability.</li>
                    </ul>
        
                    <p>We appreciate your patience during this process, and we look forward to working together to provide the best healthcare services to our patients.</p>
        
                    <p>Together, we strive for the well-being of our community and the continued excellence of <strong>NovaCare Hospital</strong>.</p>
        
                    <br>
                    <p>Wishing you great success and looking forward to collaborating with you.</p>
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

module.exports = sendDoctorConfirmationEmail;