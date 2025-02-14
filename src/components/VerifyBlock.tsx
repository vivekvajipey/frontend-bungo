'use client';

import { MiniKit, VerificationLevel } from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";
import { useRouter } from 'next/router';

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
  const router = useRouter();

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
        action: "enter",
        name: localStorage.getItem('user_name') || 'Anonymous User'
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
        
        // Redirect based on admin status
        if (verifyResponseJson.redirect_url) {
          router.push(verifyResponseJson.redirect_url);
        }
      } else {
        setVerifyError(verifyResponseJson.detail || "Verification failed");
      }
    } catch (error) {
      console.error('Verification error:', error);
      setVerifyError("Verification failed. Please try again.");
    }
  }, [onVerificationSuccess, router]);

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
            className="group relative px-8 py-3 bg-red-950/30 border border-red-800/50 text-red-500 rounded
              overflow-hidden transition-all duration-300 font-bold tracking-[0.2em] text-sm hover:bg-red-900/30"
            onClick={handleVerify}
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/0 via-red-900/20 to-red-950/0
              translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            
            {/* Border glow effect */}
            <div className="absolute inset-0 border border-red-800/50 rounded opacity-0
              group-hover:opacity-100 transition-opacity duration-300
              animate-pulse" />
            
            <span className="relative z-10">VERIFY WITH WORLD ID</span>
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