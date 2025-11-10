import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Auth.module.css";
import Image from "../assets/Image.png";
import GoogleIcon from "../assets/Google.png";
import Logo from "../components/Logo";
import Vector from "../assets/Vector.png";
import { useAuth } from "../hooks/useAuth";

function SignUp() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "https://case.nodelabs.dev/api",
  })
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if(token){
        navigate("/")
      }
    }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please check the highligted fields");
      return;
    }
    try {
      setLoading(true);
      toast.info("Creating your account...");

      const response = await api.post("/users/register", {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      console.log("register yapıldı", response.data)
      toast.success("Account created succesfully!");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      setFormData({ fullName: "", email: "", password: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 h-full bg-white flex flex-col md:px-20 md:py-10">
        <Logo />
        <form noValidate
          onSubmit={handleSubmit}
          className="w-full md:1/2 mt-6 h-auto md:h-full md:mt-[15vh] max-w-[404px]">
          <div className="w-full flex flex-col mb-10 gap-2">
            <h1 className={styles.authHead}>Create new account</h1>
            <p className={styles.authTitle}>Welcome back! Please enter your details</p>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className={styles.formLabel}>Full Name</label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Berra D. Sertgoz"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`${styles.form} ${errors.fullName ? "border-red-500!" : ""}`}
              disabled={loading}
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className={styles.formLabel}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`${styles.form} ${errors.email ? "border-red-500!" : ""}`}
              disabled={loading}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="password" className={styles.formLabel}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="• • • • • •"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`${styles.form} ${errors.password ? "border-red-500!" : ""}`}
              disabled={loading}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="w-full flex flex-col my-4">
            <button
              type="submit"
              className={`${styles.buttonCreate} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.15s]"></div>
      <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.3s]"></div>
    </div>: "Create Account"}
            </button>
            <div className={styles.buttonGoogle}>
              <img src={GoogleIcon}
                className="h-6 mr-1" alt="google" />
              Sign up with google
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-[#78778B] text-[14px]">Already have an account?</p>
            <div className="flex-col items-center mt-2 ml-2">
              <Link to="/signin" className="text-[#1B212D]">Sign in</Link>
              <img src={Vector} alt="underline" />
            </div>
          </div>
        </form>
      </div>
      <div className="w-full md:w-1/2 h-64 md:h-screen mt-10 md:mt-0 overflow-hidden">
        <img src={Image}
          className="w-full h-full object-cover" alt="side" />
      </div>

    </div>
  )
}

export default SignUp
