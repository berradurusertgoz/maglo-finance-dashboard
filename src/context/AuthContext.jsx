import { createContext, useState, useEffect } from "react"
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        try{
        const storedUser = localStorage.getItem("user")
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken !== undefined && storedToken){
            setUser(JSON.parse(storedUser))
            setToken(storedToken);
        } else{
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        }}
        catch(err){
            console.log("Local storage error", err)
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        }
        }, []);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token)
    }

    const logout = async() => {
        try{
            if(token) {
                await axios.post(
                    "https://case.nodelabs.dev/api/users/logout",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    }
                );
            }
        } catch(error){
            console.error("Logout Error", error);

        }finally{
            setUser(null)
            setToken(null)
            localStorage.removeItem("user");
            localStorage.removeItem("token")
        }
    }
    return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
