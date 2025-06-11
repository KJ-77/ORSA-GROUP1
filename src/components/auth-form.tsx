import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useAuth, SignupData } from "@/context/AuthContext";

interface LoginFormProps extends React.ComponentProps<"form"> {
  onToggleMode?: () => void;
  isSignup?: boolean;
}

export default function LoginForm({
  className,
  onToggleMode,
  isSignup = false,
  ...props
}: LoginFormProps) {
  const {
    login,
    signup,
    confirmSignup,
    resendConfirmationCode,
    loading,
    error,
  } = useAuth();

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Signup form state
  const [email, setEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");

  // Verification state
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [signupUsername, setSignupUsername] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupPassword !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    const signupData: SignupData = {
      email,
      password: signupPassword,
      phoneNumber,
      givenName,
      familyName,
    };

    try {
      const username = await signup(signupData);
      setSignupUsername(username);
      setShowVerification(true);
      alert(
        `Account created! Please check your email for a verification code.`
      );
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await confirmSignup(signupUsername, verificationCode);
      alert("Account verified successfully! You can now log in.");
      setShowVerification(false);
      onToggleMode?.(); // Switch back to login mode
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendConfirmationCode(signupUsername);
      alert("Verification code resent to your email");
    } catch (err) {
      console.error("Failed to resend code:", err);
    }
  };

  if (isSignup && showVerification) {
    return (
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleVerification}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Verify Your Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            We've sent a verification code to {email}
          </p>
        </div>
        <div className="grid gap-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}{" "}
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Verifying..." : "Verify Account"}
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
              onClick={() => setShowVerification(false)}
              className="underline underline-offset-4 hover:text-primary"
            >
              Back to signup
            </button>
          </div>
        </div>
      </form>
    );
  }

  if (isSignup) {
    return (
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSignup}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your information to create an account
          </p>
        </div>
        <div className="grid gap-6">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-3">
              <Label htmlFor="givenName">First Name</Label>
              <Input
                id="givenName"
                type="text"
                placeholder="John"
                value={givenName}
                onChange={(e) => setGivenName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="familyName">Last Name</Label>
              <Input
                id="familyName"
                type="text"
                placeholder="Doe"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="+1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="signupPassword">Password</Label>
            <Input
              id="signupPassword"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Password must contain at least 1 uppercase, 1 lowercase, 1 number,
              and 1 special character
            </p>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onToggleMode}
              className="underline underline-offset-4 hover:text-primary"
            >
              Sign in
            </button>
          </div>
        </div>
      </form>
    );
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleLogin}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your username below to login to your account
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
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={onToggleMode}
            className="underline underline-offset-4 hover:text-primary"
          >
            Sign up
          </button>
        </div>
      </div>
    </form>
  );
}
