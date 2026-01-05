import { useEffect, useRef } from "react";
import { COIN_PACKAGES } from "../../constants";
import { useNavigate, useSearchParams } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BuyerPurchaseCoin({ currentUser, onUserUpdate }) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const processingRef = useRef(false);

  const confirmPayment = async (sessionId) => {
    try {
      const res = await fetch(`${API_BASE}/api/payments/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Payment confirmation failed.");
        return;
      }

      if (data.updatedBuyer) {
        onUserUpdate(data.updatedBuyer);
        alert("Payment successful! Coins added.");
      }

      navigate("/dashboard/purchase-coin", { replace: true });
    } catch (err) {
      console.error(err);
      alert("Error confirming payment.");
    }
  };

  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");

    if (success === "1" && sessionId) {
      if (processingRef.current) return;
      processingRef.current = true;
      confirmPayment(sessionId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleBuy = async (pkg) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            buyerId: currentUser.id,
            buyerEmail: currentUser.email,
            coins: pkg.coins,
            priceUsd: pkg.priceUsd,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to start checkout");
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No checkout URL returned");
      }
    } catch (err) {
      console.error(err);
      alert("Network error while starting checkout.");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-2">Purchase Coins</h2>
      <p className="text-sm text-base-content/70">
        Current balance: <strong>{currentUser.coins}</strong> coins
      </p>

      {/* Canceled message */}
      {searchParams.get("canceled") && (
        <div className="alert alert-error text-sm">
          Payment was canceled. You have not been charged.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {COIN_PACKAGES.map((pkg) => (
          <div key={pkg.coins} className="card bg-base-100 shadow-md p-4">
            <h3 className="text-xl font-bold mb-2">{pkg.coins} Coins</h3>
            <p className="text-lg mb-2">${pkg.priceUsd}</p>
            <p className="text-xs text-base-content/60 mb-4">
              Ideal for quick top-ups and micro-task campaigns.
            </p>
            <button
              className="btn btn-primary w-full"
              onClick={() => handleBuy(pkg)}
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyerPurchaseCoin;
