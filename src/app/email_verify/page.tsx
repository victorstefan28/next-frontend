import React, { useEffect } from "react";
import axios from "axios";

const ConfirmationPage: React.FC<{ api: string }> = ({ api }) => {
  useEffect(() => {
    const confirmRegister = async () => {
      try {
        await axios.post(`http://localhost:7225/confirmRegister/${api}`);
        console.log("Registration confirmed successfully!");
      } catch (error) {
        console.error("Error confirming registration:", error);
      }
    };

    confirmRegister();
  }, [api]);

  return (
    <div>
      <h1>Registration Confirmed</h1>
      <p>Your registration has been confirmed.</p>
    </div>
  );
};

export default ConfirmationPage;
