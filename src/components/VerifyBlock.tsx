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
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: "enter",
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
        action: "enter"
      };

      const verifyResponse = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(verificationData),
      });

      const verifyResponseJson = await verifyResponse.json();

      // Handle both success and max_verifications_reached as success cases
      if (verifyResponseJson.success || verifyResponseJson.code === 'max_verifications_reached') {
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
        setVerifyError(verifyResponseJson.detail || "Verification failed");
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerifyError("Verification failed. Please try again.");
    }
  }, [onVerificationSuccess]);

  if (!show) return null;

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h2 className="text-xl font-bold text-red-500">World ID Verification</h2>
      {!isVerified ? (
        <>
          <p className="text-center text-red-400/70">
            Verify your humanity to play Bungo
          </p>
          <button
            className="group relative px-10 py-4 bg-red-950/40 border-2 border-red-800/70 text-red-400 rounded-md
              overflow-hidden transition-all duration-300 font-bold tracking-[0.2em] text-base hover:bg-red-900/40
              hover:border-red-700 hover:text-red-300 hover:scale-[1.02] transform"
            onClick={handleVerify}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/30 to-red-950/0
              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            {/* Border glow effect */}
            <div className="absolute inset-0 border-2 border-red-800/50 rounded-md opacity-0
              group-hover:opacity-100 transition-opacity duration-300
              animate-pulse" />
            
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500/80 to-transparent" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-red-500/80 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8">
              <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-red-500/80 to-transparent" />
              <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-red-500/80 to-transparent" />
            </div>
            
            <span className="relative z-10">PROVE HUMANITY</span>
          </button>
          {verifyError && (
            <p className="text-red-500 text-sm">{verifyError}</p>
          )}
        </>
      ) : (
        <div className="text-center text-red-500">
          ✓ Verified - You can now play
        </div>
      )}
    </div>
  );
} 