import { Box, Button, Container, TextField, Typography, Paper, FormControl, InputLabel, Select, MenuItem, Stepper, Step, StepLabel, Chip } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useDoctorRegisterMutation } from "@/CustomHooks/doctorAuth.query";
import { DoctorRegistrationPayload } from "@/Interface/doctorAuth.interface";
import { useSpecialityListQuery } from "@/CustomHooks/specialization.query";
import { Speciality } from "@/Interface/specialityList.interface";
import { styled } from '@mui/material/styles';

const steps = ['Basic Information', 'Professional Details', 'Education & Expertise'];

export default function DoctorRegister() {
    const [activeStep, setActiveStep] = useState(0);
    const [profilePic, setProfilePic] = useState<File | null>(null);
    const [expertiseList, setExpertiseList] = useState<string[]>(['']);
    const [defaultEducation, setDefaultEducation] = useState({
        year: "",
        degree: "",
        university: "",
        info: ""
    });

    const { register, handleSubmit, formState: { errors }, getValues, control } = useForm<DoctorRegistrationPayload>();

    const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
        control,
        name: "education"
    });

    const addExpertise = () => {
        setExpertiseList([...expertiseList, '']);
    };

    const removeExpertise = (index: number) => {
        if (expertiseList.length > 1) {
            const newList = expertiseList.filter((_, i) => i !== index);
            setExpertiseList(newList);
        }
    };

    const { mutate, isPending } = useDoctorRegisterMutation();

    const { data: speciality } = useSpecialityListQuery();


    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        const values = getValues();
        if (activeStep < steps.length - 1) {
            if ((activeStep === 0 && values.first_name && values.last_name && values.email && values.password && values.phone && values.gender) ||
                (activeStep === 1 && values.specialization_id && values.about && values.experience) ||
                (activeStep === 2 && defaultEducation.degree && defaultEducation.university && expertiseList.some(exp => exp.trim() !== ''))) {
                setActiveStep((prevStep) => prevStep + 1);
            }
        }
    };

    // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files[0]) {
    //         // setProfilePic(e.target.files[0]);
    //         const file = (e.target.files[0] as File);
    //         setProfilePic(file);
    //         console.log("Selected file:", file);
    //     }
    // };


    // Modify the onSubmit function
    const onSubmit = async (data: DoctorRegistrationPayload) => {
        if (activeStep !== steps.length - 1) {
            handleNext();
            return;
        }

        const formData = new FormData();


        if (data.specialization_id) {
            formData.append('specialization_id', data.specialization_id);
        }


        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'education' && key !== 'expertise' && key !== 'specialization_id' && value) {
                formData.append(key, value as string);
            }
        });

        formData.append('education[0][year]', defaultEducation.year);
        formData.append('education[0][degree]', defaultEducation.degree);
        formData.append('education[0][university]', defaultEducation.university);
        formData.append('education[0][info]', defaultEducation.info);


        if (data.education) {
            data.education.forEach((edu, index) => {
                const actualIndex = index + 1;
                Object.entries(edu).forEach(([key, value]) => {
                    formData.append(`education[${actualIndex}][${key}]`, value as string);
                });
            });
        }

        expertiseList.forEach((expertise, index) => {
            if (expertise.trim()) {
                formData.append(`expertise[${index}]`, expertise);
            }
        });

        if (profilePic && profilePic instanceof File) {
            // formData.append('profile_pic', URL.createObjectURL(profilePic) as string);
            formData.append('profile_pic', profilePic);
            console.log("Profile pic:", profilePic);
        }

        // console.log("Final payload being sent(doc register):", Object.fromEntries(formData));
        mutate(formData);

    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
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
                            id="last_name"
                            label="Last Name"
                            {...register("last_name", {
                                required: "Last name is required"
                            })}
                            error={!!errors.last_name}
                            helperText={errors.last_name?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone Number"
                            type="tel"
                            inputProps={{
                                pattern: '[0-9]*',
                                maxLength: 10,
                                inputMode: 'numeric'
                            }}
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
                            <InputLabel>Gender</InputLabel>
                            <Select
                                label="Gender"
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

                        {/* <Box sx={{ textAlign: 'center', mb: 3, mt: 4 }}>
                            <input
                                accept="image/*"
                                id="profile_pic"
                                type="file"
                                style={{ display: "none" }}
                                 {...register("profile_pic")}
                                // onChange={(e) => e.target.files && setProfilePic(e.target.files[0])}
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        setProfilePic(file);
                                        console.log("Selected file:", file);
                                    }
                                }}
                                // onChange={handleImageChange}
                            />
                            <label htmlFor="profile_pic">
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        backgroundColor: "#223a66",
                                        "&:hover": {
                                            backgroundColor: "#e12454",
                                        },
                                    }}
                                >
                                    Upload Profile Photo
                                </Button>
                            </label>
                            {profilePic ? (
                                <Box mt={2}>
                                    <img
                                        style={{
                                            height: "180px",
                                            width: "180px",
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                        }}
                                        src={URL.createObjectURL(profilePic) || profilePic}
                                        alt="Profile preview"
                                    />
                                </Box>
                            ) : (
                                <Box mt={2}>
                                    <Typography color="textSecondary">
                                        Upload your profile photo
                                    </Typography>
                                </Box>
                            )}
                        </Box> */}
                        <Box sx={{ textAlign: 'center', mb: 3, mt: 4 }}>
                            <input
                                accept="image/*"
                                id="profile_pic"
                                type="file"
                                style={{ display: "none" }}
                                {...register("profile_pic")}
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        setProfilePic(file); // Save the selected file in state
                                        console.log("Selected file:", file);
                                    }
                                }}
                            />
                            <label htmlFor="profile_pic">
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{
                                        backgroundColor: "#223a66",
                                        "&:hover": {
                                            backgroundColor: "#e12454",
                                        },
                                    }}
                                >
                                    Upload Profile Photo
                                </Button>
                            </label>
                            {profilePic ? (
                                <Box mt={2}>
                                    <img
                                        style={{
                                            height: "180px",
                                            width: "180px",
                                            borderRadius: "50%",
                                            objectFit: "cover"
                                        }}
                                        src={URL.createObjectURL(profilePic)} // Use ObjectURL to preview the image
                                        alt="Profile preview"
                                    />
                                </Box>
                            ) : (
                                <Box mt={2}>
                                    <Typography color="textSecondary">
                                        Upload your profile photo
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                    </>
                );
            case 1:
                return (
                    <>
                        <FormControl fullWidth margin="normal" required>
                            <InputLabel>Specialization</InputLabel>
                            <Select
                                label="Specialization"
                                defaultValue=""
                                {...register("specialization_id", {
                                    required: "Specialization is required"
                                })}
                                error={!!errors.specialization_id}
                            >
                                {speciality?.data?.map((spec: Speciality) => (
                                    <MenuItem key={spec._id} value={spec._id}>
                                        {spec.department}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            multiline
                            rows={4}
                            id="about"
                            label="About"
                            {...register("about", {
                                required: "About section is required"
                            })}
                            error={!!errors.about}
                            helperText={errors.about?.message}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="experience"
                            label="Years of Experience"
                            type="number"
                            inputProps={{ min: 0, max: 99 }}
                            {...register("experience", {
                                required: "Experience is required",
                                min: {
                                    value: 0,
                                    message: "Experience cannot be negative"
                                },
                                max: {
                                    value: 99,
                                    message: "Please enter a valid experience"
                                }
                            })}
                            error={!!errors.experience}
                            helperText={errors.experience?.message}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6">Education</Typography>
                            <TextField
                                label="Year"
                                fullWidth
                                margin="normal"
                                value={defaultEducation.year}
                                onChange={(e) => setDefaultEducation({ ...defaultEducation, year: e.target.value })}
                            />
                            <TextField
                                label="Degree"
                                fullWidth
                                margin="normal"
                                value={defaultEducation.degree}
                                onChange={(e) => setDefaultEducation({ ...defaultEducation, degree: e.target.value })}
                            />
                            <TextField
                                label="University"
                                fullWidth
                                margin="normal"
                                value={defaultEducation.university}
                                onChange={(e) => setDefaultEducation({ ...defaultEducation, university: e.target.value })}
                            />
                            <TextField
                                label="Additional Information"
                                fullWidth
                                margin="normal"
                                value={defaultEducation.info}
                                onChange={(e) => setDefaultEducation({ ...defaultEducation, info: e.target.value })}
                            />
                        </Box>

                        {educationFields.map((field, index) => (
                            <Box key={field.id} sx={{ mb: 2 }}>
                                <Typography variant="h6">Education {index + 1}</Typography>
                                <TextField
                                    {...register(`education.${index}.year`)}
                                    label="Year"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    {...register(`education.${index}.degree`)}
                                    label="Degree"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    {...register(`education.${index}.university`)}
                                    label="University"
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    {...register(`education.${index}.info`)}
                                    label="Additional Information"
                                    fullWidth
                                    margin="normal"
                                />
                                <Button onClick={() => removeEducation(index)}>Remove</Button>
                            </Box>
                        ))}

                        <Button onClick={() => appendEducation({
                            year: "",
                            degree: "",
                            university: "",
                            info: ""
                        })}>
                            Add More Education
                        </Button>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h6">Expertise</Typography>
                            {expertiseList.map((expertise, index) => (
                                <Box key={index} sx={{ mb: 2 }}>

                                    <TextField
                                        value={expertise}
                                        onChange={(e) => {
                                            const newList = [...expertiseList];
                                            newList[index] = e.target.value;
                                            setExpertiseList(newList);
                                        }}
                                        label="Expertise"
                                        fullWidth
                                        margin="normal"
                                    />
                                    <Button onClick={() => removeExpertise(index)}>Remove</Button>
                                </Box>
                            ))}
                            <Button onClick={addExpertise}>
                                Add Expertise
                            </Button>
                        </Box>
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
                                <span className="text-white">Join Our Medical Team</span>
                                <h1 className="text-capitalize mb-5 text-lg">Doctor Registration</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="appointment-wrap mt-5 mt-lg-0">
                                <Paper elevation={3} sx={{ p: 4, backgroundColor: '#fff', borderRadius: '15px' }}>
                                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    <Box
                                        component="form"
                                        onSubmit={handleSubmit(onSubmit)}
                                        noValidate
                                        sx={{ mt: 1 }}
                                    >
                                        {renderStepContent(activeStep)}
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                                            <Button
                                                type="button"
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
                                                    sx={{
                                                        backgroundColor: '#e12454',
                                                        '&:hover': {
                                                            backgroundColor: '#223a66'
                                                        }
                                                    }}
                                                    disabled={isPending}
                                                >
                                                    {isPending ? "Registering..." : "Register"}
                                                </Button>
                                            ) : (

                                                <Button
                                                    type="button"
                                                    variant="contained"
                                                    onClick={(e) => handleNext(e)}
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