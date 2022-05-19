import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ---------------------------------------------------------------------------

function InitialPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);
}

export default InitialPage;
