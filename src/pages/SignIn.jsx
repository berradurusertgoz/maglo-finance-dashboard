import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css"
import Image from "../assets/Image.png";
import GoogleIcon from "../assets/Google.png"
import Logo from "../components/Logo";
import Vector from "../assets/Vector.png"

function SignIn() {
  const navigate = useNavigate();
  const { login, token } = useAuth();


  const api = axios.create({
    baseURL: "https://case.nodelabs.dev/api",
  })
  const [formData, setFormData] = useState({
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
      toast.info("Signing you in...");

      const response = await api.post("/users/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log("LOGIN RESPONSE:", response.data);  // ✅ Burada olacak!
      const userData = response.data?.data?.user;
      const token = response.data?.data?.accessToken;

      login(userData, token)

      toast.success("Login successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setFormData({ email: "", password: "" });
      
    } catch (err) {
      toast.error("Something went wrong. Please try again",err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-1/2 h-full bg-white flex flex-col md:px-20 md:py-10">
        <Logo />
        <form noValidate
          onSubmit={handleSubmit}
          className="w-full md:1/2 mt-6 h-auto md:h-full md:mt-[15vh] max-w-[404px]">
          <div className="w-full flex flex-col mb-10 gap-2">
            <h1 className={styles.authHead}>Sign In</h1>
            <p className={styles.authTitle}>Welcome back! Please enter your details</p>
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
    </div>: "Sign In"}
            </button>
            <div className={styles.buttonGoogle}>
              <img src={GoogleIcon}
                className="h-6 mr-1" alt="google" />
              Sign in with google
            </div>
          </div>
          <div className="w-full flex items-center justify-center">
            <p className="text-[#78778B] text-[14px]">Don't have an account?</p>
            <div className="flex-col items-center mt-2 ml-2">
              <Link to="/signup" className="text-[#1B212D]">Sign up</Link>
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

export default SignIn
