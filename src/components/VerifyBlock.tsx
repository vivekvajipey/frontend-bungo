'use client';

import { MiniKit, VerificationLevel } from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";

interface VerifyBlockProps {
  onVerificationSuccess: () => void;
  show: boolean;
}

interface WorldIDCredentials {
  nullifier_hash: string;
  merkle_root: string;
  proof: string;
  verification_level: string;
}

export function VerifyBlock({ onVerificationSuccess, show }: VerifyBlockProps) {
  const [isVerified, setIsVerified] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      setVerifyError("Please open this app in World App");
      return;
    }

    try {
      // Generate a random session ID as our signal
      const signal = crypto.randomUUID();

      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: "enter",
        signal,
        verification_level: VerificationLevel.Orb
      });

      if (finalPayload.status === "error") {
        setVerifyError("Verification failed");
        return;
      }

      // Format verification data for backend
      const verificationData = {
        merkle_root: finalPayload.merkle_root,
        nullifier_hash: finalPayload.nullifier_hash,
        proof: finalPayload.proof,
        verification_level: finalPayload.verification_level,
        action: "enter",
        signal: signal  // Send signal to our backend
      };

      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationData),
      });

      const verifyResponseJson = await verifyResponse.json();

      if (verifyResponseJson.success) {
        // Store credentials for future API calls
        const credentials: WorldIDCredentials = {
          nullifier_hash: finalPayload.nullifier_hash,
          merkle_root: finalPayload.merkle_root,
          proof: finalPayload.proof,
          verification_level: finalPayload.verification_level
        };
        localStorage.setItem('worldid_credentials', JSON.stringify(credentials));
        
        setIsVerified(true);
        setVerifyError(null);
        onVerificationSuccess();
      } else {
        setVerifyError(verifyResponseJson.detail || "Verification failed. Have you already played today?");
      }
    } catch (error) {
      setVerifyError("Verification failed. Please try again.");
      console.error(error);
    }
  }, [onVerificationSuccess]);

  if (!show) return null;

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