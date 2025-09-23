import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GalleryVerticalEnd, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPassword() {
  const { forgotPassword, confirmPasswordReset, loading, error } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<"request" | "confirm">("request");
  const [username, setUsername] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await forgotPassword(username);
      setStep("confirm");
      alert("Password reset code sent to your email. Please check your inbox.");
    } catch (err) {
      console.error("Forgot password error:", err);
    }
  };

  const handleConfirmReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    try {
      await confirmPasswordReset(username, verificationCode, newPassword);
      alert(
        "Password reset successful! You can now login with your new password."
      );
      navigate("/auth");
    } catch (err) {
      console.error("Password reset confirmation error:", err);
    }
  };

  const handleResendCode = async () => {
    try {
      await forgotPassword(username);
      alert("Password reset code resent to your email");
    } catch (err) {
      console.error("Failed to resend code:", err);
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            ORSA GROUP
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {step === "request" ? (
              <form
                className={cn("flex flex-col gap-6")}
                onSubmit={handleRequestReset}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Reset your password</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter your username to receive a password reset code
                  </p>
                </div>
                <div className="grid gap-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sending..." : "Send Reset Code"}
                  </Button>
                  <div className="text-center text-sm">
                    <Link
                      to="/auth"
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Back to login
                    </Link>
                  </div>
                </div>
              </form>
            ) : (
              <form
                className={cn("flex flex-col gap-6")}
                onSubmit={handleConfirmReset}
              >
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Enter new password</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    Enter the verification code sent to your email and your new
                    password
                  </p>
                </div>
                <div className="grid gap-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                      {error}
                    </div>
                  )}
                  <div className="grid gap-3">
                    <Label htmlFor="verificationCode">Verification Code</Label>
                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={verificationCode}
                        onChange={(value) => setVerificationCode(value)}
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password must contain at least 1 uppercase, 1 lowercase, 1
                      number, and 1 special character
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleResendCode}
                    disabled={loading}
                  >
                    Resend Code
                  </Button>
                  <div className="text-center text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("request")}
                      className="underline underline-offset-4 hover:text-primary"
                    >
                      Back to username entry
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/INTROO.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
