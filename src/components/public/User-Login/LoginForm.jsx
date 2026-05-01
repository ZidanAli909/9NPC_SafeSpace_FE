import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services/AuthService";

export default function LoginForm() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("")
        try {
            const response = await axios.post(
                "https://safespacebackend.vercel.app/api/auth/sign-in",
                { email, password }
            )

            if (response.data.success) {
                localStorage.setItem("token", data.data.token)
                localStorage.setItem("user", JSON.stringify(data.data.user))
                
                window.location.href = "/"
            }
        } catch (error) {
            setError("Email atau password salah!")
        }
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#ddeef7] px-4">
            <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
                    Login to your account
                </h1>

                <div className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-lg border-slate-200"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="password" className="text-sm font-medium text-slate-700">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-lg border-slate-200 pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-xs text-[#2d6a9f] hover:underline"
                            >
                                Forgot Password ?
                            </Link>
                        </div>
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs">{error}</p>
                    )}

                    {/* Submit */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-[#1e3a5f] hover:bg-[#152d4a] text-white rounded-lg py-5 mt-1"
                    >
                        Login now
                    </Button>

                    {/* Sign up link */}
                    <p className="text-center text-xs text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#1e3a5f] font-semibold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
