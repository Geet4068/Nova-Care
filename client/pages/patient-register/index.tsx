import { Box, Button, Container, TextField, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Stepper, Step, StepLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { usePatientRegisterMutation } from "@/CustomHooks/patientAuth.query";
import { PatientRegisterPayload } from "@/Interface/patientAuth.interface";
import Link from "next/link";


const steps = ['Email Verification', 'Personal Information'];

// Move this outside of renderStepContent
const commonInputStyles = {
    '& .MuiFilledInput-root': {
        backgroundColor: 'transparent',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&.Mui-focused': {
            backgroundColor: 'transparent',
        },
        '&:before': {
            borderBottom: 'none'
        },
        '&:after': {
            borderBottom: 'none'
        },
        '&:hover:before': {
            borderBottom: 'none'
        }
    }
};

export default function PatientRegister() {
    const [activeStep, setActiveStep] = useState(0);
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<PatientRegisterPayload>();
    const { mutate, isPending } = usePatientRegisterMutation();

    const handleNext = () => {
        const values = getValues();
        if (values.email) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const onSubmit = (data: PatientRegisterPayload) => {
        const payload = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            phone: data.phone,
            gender: data.gender,
            blood_grp: data.blood_grp,
            dob: data.dob,
            role: 'patient'
        };
        console.log("Final payload being sent:", payload);
        mutate(payload);
    };


    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        variant="filled"
                        sx={commonInputStyles}
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                );
            case 1:
                return (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="filled"
                            sx={commonInputStyles}
                            id="first_name"
                            label="First Name"
                            {...register("first_name", {
                                required: "First name is required",
                                minLength: {
                                    value: 2,
                                    message: "First name must be at least 2 characters"
                                }
                            })}
                            error={!!errors.first_name}
                            helperText={errors.first_name?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="filled"
                            sx={commonInputStyles}
                            id="last_name"
                            label="Last Name"
                            {...register("last_name", {
                                required: "Last name is required",
                                minLength: {
                                    value: 2,
                                    message: "Last name must be at least 2 characters"
                                }
                            })}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            variant="filled"
                            sx={commonInputStyles}
                            id="phone"
                            label="Phone Number"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: "Please enter a valid 10-digit phone number"
                                }
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel id="gender-label">Gender</InputLabel>
                            <Select
                                labelId="gender-label"
                                id="gender"
                                label="Gender"
                                variant="filled"
                                sx={commonInputStyles}
                                defaultValue=""
                                {...register("gender", {
                                    required: "Gender is required"
                                })}
                                error={!!errors.gender}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            margin="normal"
                            fullWidth
                            variant="filled"
                            sx={commonInputStyles}
                            id="dob"
                            label="Date of Birth"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            {...register("dob")}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="blood-group-label">Blood Group</InputLabel>
                            <Select
                                labelId="blood-group-label"
                                id="blood_grp"
                                label="Blood Group"
                                variant="filled"
                                sx={commonInputStyles}
                                defaultValue=""
                                {...register("blood_grp")}
                            >
                                <MenuItem value="A+">A+</MenuItem>
                                <MenuItem value="A-">A-</MenuItem>
                                <MenuItem value="B+">B+</MenuItem>
                                <MenuItem value="B-">B-</MenuItem>
                                <MenuItem value="O+">O+</MenuItem>
                                <MenuItem value="O-">O-</MenuItem>
                                <MenuItem value="AB+">AB+</MenuItem>
                                <MenuItem value="AB-">AB-</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Create Account</span>
                                <h1 className="text-capitalize mb-5 text-lg">Patient Registration</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="appointment-wrap mt-5 mt-lg-0">
                                <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                        {renderStepContent(activeStep)}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                            <Button
                                                onClick={handleBack}
                                                sx={{
                                                    mr: 1,
                                                    color: '#223a66',
                                                    '&:hover': {
                                                        backgroundColor: '#223a66',
                                                        color: '#fff'
                                                    }
                                                }}
                                                disabled={activeStep === 0}
                                            >
                                                Back
                                            </Button>
                                            <Box sx={{ flex: '1 1 auto' }} />
                                            {activeStep === steps.length - 1 ? (
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    disabled={isPending}
                                                    sx={{
                                                        backgroundColor: '#e12454',
                                                        '&:hover': {
                                                            backgroundColor: '#223a66'
                                                        }
                                                    }}
                                                >
                                                    {isPending ? "Registering..." : "Register"}
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    onClick={handleNext}
                                                    sx={{
                                                        backgroundColor: '#e12454',
                                                        '&:hover': {
                                                            backgroundColor: '#223a66'
                                                        }
                                                    }}
                                                >
                                                    Next
                                                </Button>
                                            )}
                                        </Box>
                                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                                            <Typography variant="body2" color="text.secondary">
                                                Are you a Doctor? Join Us and{' '}
                                                <Link href="/doctor-register" style={{ color: '#e12454', textDecoration: 'none' }}>
                                                    register as a doctor
                                                </Link>
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}