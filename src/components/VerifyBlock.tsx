'use client';

import { MiniKit, VerificationLevel, ISuccessResult } from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

const verifyPayload = {
  action: "play_bungo",
  signal: "", 
  verification_level: VerificationLevel.Orb,
};

interface VerifyBlockProps {
  onVerificationSuccess: () => void;
}

export function VerifyBlock({ onVerificationSuccess }: VerifyBlockProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      setVerifyError("Please open this app in World App");
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === "error") {
        setVerifyError("Verification failed");
        return;
      }

      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult,
          action: verifyPayload.action,
          signal: verifyPayload.signal,
        }),
      });

      const verifyResponseJson = await verifyResponse.json();

      if (verifyResponseJson.success) {
        setIsVerified(true);
        setVerifyError(null);
        onVerificationSuccess();
      } else {
        setVerifyError("Verification failed. Have you already played today?");
      }
    } catch (error) {
      setVerifyError("Verification failed. Please try again.");
      console.error(error);
    }
  }, [onVerificationSuccess]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold">World ID Verification</h2>
      {!isVerified ? (
        <>
          <p className="text-center text-gray-600">
            Verify your humanity to play Bungo
          </p>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleVerify}
          >
            Verify with World ID
          </button>
          {verifyError && (
            <p className="text-red-500 text-sm">{verifyError}</p>
          )}
        </>
      ) : (
        <div className="text-center text-green-500">
          ✓ Verified - You can now play
        </div>
      )}
    </div>
  );
} 