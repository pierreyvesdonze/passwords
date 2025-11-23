import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hook pour protéger un niveau selon la progression stockée dans sessionStorage.
 * @param {number} levelNumber - Numéro du niveau courant
 */
export function useLevelProtection(levelNumber) {
  const navigate = useNavigate();

  useEffect(() => {
    const currentLevel = parseInt(sessionStorage.getItem("currentLevel") || "1");
    if (currentLevel < levelNumber) {
      // renvoie au dernier niveau validé
      navigate(`/level${currentLevel}`);
    }
  }, [levelNumber, navigate]);
}
