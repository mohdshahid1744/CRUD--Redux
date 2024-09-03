import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../Utils/Axios";
import '../Style/Signup.css'
const Signup = () => {
 const [signupSuccess,setSignupSuccess]=useState(false)
 const navigate=useNavigate()
 const validationSchema = yup.object({
  name: yup
  .string()
  .required("Name is required")
  .test("no-spaces", "Name should not contain only spaces", (value) => {
    return value && !(/^\s+$/.test(value));
  }),

  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
    phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  
    password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const formik = useFormik({
  initialValues: {
    name: "",
    email: "",
    phone: "",
    password: "",
  },
  validationSchema,
  onSubmit: async (values) => {
    try {
      await axiosInstance.post("/signup", values);
      setSignupSuccess(true);
    } catch (err) {
      console.error("Error during user registration:", err);
    }
  },
 })
 useEffect(()=>{
  if(signupSuccess){
    const timeout=setTimeout(()=>{
      setSignupSuccess(false)
      navigate('/')
    },3000)
    return ()=> clearTimeout(timeout)
  }
 },[signupSuccess,navigate])
    return (
        <div className="signup-container">
          <h2>Sign Up</h2>
          {signupSuccess && (
          <div className="success-message">
            Signup successful! Please login.
          </div>
        )}
          <form className="signup-form" onSubmit={formik.handleSubmit}>
          <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="name" id="name" 
              value={formik.values.name}
              className="form-control"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
               placeholder='Enter Your name' required />
                {formik.touched.name && formik.errors.name && (
            <div className="invalid-feedback">{formik.errors.name}</div>
          )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" 
              value={formik.values.email}
              id="email" className="form-control" 
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder='Enter Your Email' required />
            </div>
            {formik.touched.email && formik.errors.email && (
            <div className="invalid-feedback">{formik.errors.email}</div>
          )}
            <div className="form-group">
              <label htmlFor="phone">Phone:</label>
              <input type="phone"
              value={formik.values.phone}
               id="phone" className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur} 
               placeholder='Enter Your phone' required />
            </div>
            {formik.touched.phone && formik.errors.phone && (
            <div className="invalid-feedback">{formik.errors.phone}</div>
          )}
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input type="password"
              value={formik.values.password}
               id="password" className="form-control"
               onChange={formik.handleChange}
               onBlur={formik.handleBlur} 
               placeholder='Password' required />
            </div>
            {formik.touched.password && formik.errors.password && (
            <div className="invalid-feedback">{formik.errors.password}</div>
          )}
            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
          <span>
            <span className="copyright-message">
              {`Already have an account? `}
              <Link className="linkstyle" to="/">
                Login
              </Link>
            </span>
          </span>
        </div>
      )
}

export default Signup
