import { useDoctorLoginMutation } from "@/CustomHooks/doctorAuth.query";
import { DoctorLoginPayload } from "@/Interface/doctorAuth.interface";
import { Box, Button, TextField, Paper, Grid } from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function DoctorLogin() {
    const { register, handleSubmit, formState: { errors } } = useForm<DoctorLoginPayload>();
    const { mutate, isPending } = useDoctorLoginMutation();

    const onSubmit = (data: DoctorLoginPayload) => {
        mutate(data);
    };

    return (
        <>
            <section className="page-title bg-1">
                <div className="overlay"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="block text-center">
                                <span className="text-white">Welcome Back</span>
                                <h1 className="text-capitalize mb-5 text-lg">Doctor Login</h1>
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
                                    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            autoComplete="email"
                                            autoFocus
                                            variant="filled"
                                            sx={{
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
                                            }}
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
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            variant="filled"
                                            sx={{
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
                                            }}
                                            {...register("password", {
                                                required: "Password is required"
                                            })}
                                            error={!!errors.password}
                                            helperText={errors.password?.message}
                                        />
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{
                                                mt: 3,
                                                mb: 2,
                                                backgroundColor: '#e12454',
                                                '&:hover': {
                                                    backgroundColor: '#223a66'
                                                }
                                            }}
                                            disabled={isPending}
                                        >
                                            {isPending ? "Signing in..." : "Sign In"}
                                        </Button>
                                        <Grid container spacing={2}>
                                            <Grid item xs>
                                                <Link 
                                                    href="/forgot-password" 
                                                    className="text-decoration-none"
                                                    style={{
                                                        color: '#e12454',
                                                    }}
                                                >
                                                    Forgot password?
                                                </Link>
                                            </Grid>
                                            <Grid item>
                                                <Link 
                                                    href="/doctor-register"
                                                    className="text-decoration-none"
                                                    style={{
                                                        color: '#223a66',
                                                    }}
                                                >
                                                    Don&apos;t have an account? Register Now
                                                </Link>
                                            </Grid>
                                        </Grid>
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