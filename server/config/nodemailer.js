import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "vietphamdinhvan@gmail.com",
    pass: "obat hsap txof fdxk",
  },
});

export default transporter