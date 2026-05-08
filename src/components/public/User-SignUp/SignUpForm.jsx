import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthService } from "@/services/AuthService";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Password dan Confirm Password tidak sama!")
            return
        }

        try {
            const data = await AuthService.register(email, password, confirmPassword);
            if (data.success) {
                alert("Registrasi berhasil! Cek email kamu untuk verifikasi.");
                navigate("/login");
            }
        } catch (error) {
            setError("Pendaftaran gagal. Email mungkin sudah terdaftar!");
        }
    }

    function handleGoogleSignUp() {
        // TODO: handle Google OAuth
        console.log("Continue with Google");
    }

    return (
        <div className="flex items-center justify-center px-8 py-16 bg-[#FEFAF5]">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-semibold text-[#1e3a5f] mb-6">
                    Create an account
                </h2>

                <div className="flex flex-col gap-5">
                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-lg border-slate-300 bg-white"
                        />
                    </div>

                    {/* Create Password */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                            Create Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="rounded-lg border-slate-300 bg-white pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Create Account Button */}
                    <Button
                        onClick={handleSubmit}
                        className="w-full bg-[#4E7489] hover:bg-[#1e3a5f] text-white rounded-lg py-5 mt-1"
                    >
                        Create account
                    </Button>

                    {/* Continue with Google */}
                    <Button
                        variant="outline"
                        onClick={handleGoogleSignUp}
                        className="w-full border-slate-300 text-slate-700 rounded-lg py-5 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                    </Button>

                    {/* Log in link */}
                    <p className="text-center text-xs text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#1e3a5f] font-semibold hover:underline">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
