import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function EmailVerificationPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const statusParam = searchParams.get("status");
    const messageParam = searchParams.get("message");

    if (statusParam) {
      if (statusParam === "success") {
        setStatus("success");
        toast.success(messageParam || "Email verified successfully.");
      } else {
        setStatus("failure");
        toast.error(messageParam || "Email verification failed.");
      }
    } else {
      setStatus("failure");
      toast.error("Invalid verification link.");
    }
  }, [searchParams]);

  const handleLoginRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      {status === "loading" ? (
        <p>Verifying email...</p>
      ) : status === "success" ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Email Verified Successfully!</h2>
          <button
            onClick={handleLoginRedirect}
            className="text-blue-600 hover:underline"
          >
            Go to Login
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-600">
            Email Verification Failed
          </h2>
          <button
            onClick={handleLoginRedirect}
            className="text-blue-600 hover:underline"
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
}

export default EmailVerificationPage;
