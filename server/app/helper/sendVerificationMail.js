const transporter = require("../config/emailConfig");

const sendEmailVerificationOTP = async (req, patient) => {
    try {

        const first_name = patient.first_name;
        const last_name = patient.last_name;
        const password = patient.password;

        await transporter.sendMail({
            from: `"NovaCare Hospital" <${process.env.EMAIL_FROM}>`,
            to: patient.email,
            subject: "Welcome to NovaCare Hospital – Your Health, Our Priority",
            html: `
            <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); border-left: 6px solid #0077b6; font-family: Arial, sans-serif; color: #333;">
                
                <div style="text-align: center; padding-bottom: 10px; border-bottom: 2px solid #0077b6;">
                    <h1 style="color: #0077b6; font-size: 24px;">Welcome to NovaCare Hospital</h1>
                </div>
        
                <div style="padding: 20px 0; line-height: 1.6;">
                    <p>Dear <strong>${first_name} ${last_name}</strong>,</p>
        
                    <p>Thank you for registering with <strong>NovaCare Hospital</strong>. We are committed to providing you with the best medical care and support to help you on your journey to better health. Our team of dedicated doctors and healthcare professionals is here to assist you in every possible way.</p>
        
                    <p>We are pleased to inform you that your registration has been successfully completed. Here are your login details:</p>
        
                    <div style="background: #f2f2f2; padding: 10px 15px; border-radius: 5px; margin: 10px 0;">
                        <p><strong>Password:</strong> ${password}</p>
                    </div> 
        
                    <p>You can now log in to your account and access our services with ease.</p>
        
                    <p>At <strong>NovaCare Hospital</strong>, your well-being is our top priority. While we sincerely hope that you enjoy a long and healthy life without the need for medical attention, please rest assured that whenever you do need us, we will be here with compassionate care and expert medical solutions.</p>
        
                    <p>If you have any questions or concerns, please don't hesitate to reach out to our dedicated support team. We are here to assist you in any way we can.</p>
        
                    <br>
                    <p>Wishing you good health and happiness always!</p>
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

module.exports = sendEmailVerificationOTP;