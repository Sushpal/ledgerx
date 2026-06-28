import Navbar from "../components/Navbar";
import ProfileCard from "../components/ProfileCard";
import useAccounts from "../hooks/useAccounts";
import { useEffect } from "react";

const ProfilePage = () => {

  const { accounts, fetchAccounts } = useAccounts();

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Navbar />

      <main className="pt-24 px-6 max-w-lg mx-auto pb-16">

        <div className="mb-8">
          <h1 className="text-xl font-semibold text-cream">Profile</h1>
          <p className="text-sm text-warm-grey mt-1">
            Your account information
          </p>
        </div>

        <ProfileCard accounts={accounts} />
      </main>
    </div>
  );
};

export default ProfilePage;