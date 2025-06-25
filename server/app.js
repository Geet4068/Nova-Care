const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

//create static file
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use('/uploads', express.static('uploads'))
app.use('/uploads/doctors', express.static('uploads/doctors'))
app.use('/public', express.static('public'));

const dotenv = require('dotenv');
dotenv.config();

const connectDb = require('./app/config/db');
connectDb();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const session = require('express-session');
app.use(session({
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    },
    secret: 'NovaCare secret',
    resave: false,
    saveUninitialized: true
}));

const cors = require('cors');
app.use(cors());

app.set ('view engine', 'ejs');
app.set('views', 'views');

const flash = require('connect-flash');
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success');
    res.locals.errorMessage = req.flash('error');
    next();
});

const userRouter = require('./app/router/UserRouter');
app.use('/api', userRouter);

const adminRouter = require('./app/router/AdminRouter');
app.use('/api', adminRouter);

const doctorRouter = require('./app/router/DoctorRouter');
app.use('/api', doctorRouter);

const appointmentRouter = require('./app/router/AppointmentRouter');
app.use('/api', appointmentRouter);

const confirmationRouter = require('./app/router/ConfirmationRouter');
app.use('/', confirmationRouter);

const webAdminRouter = require('./app/router/WebAdminRouter');
app.use('/', webAdminRouter);

const specialityRouter = require('./app/router/SpecialityRouter');
app.use('/api', specialityRouter);

const port = process.env.PORT || 2018;
app.listen(port, () => {
    console.log(`server is running on port http://localhost:${port}`);
    console.log(`Admin Page - http://localhost:${port}/admin`);
})