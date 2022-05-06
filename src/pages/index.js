import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------------------

function InitialPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  }, [navigate]);
}

export default InitialPage;
