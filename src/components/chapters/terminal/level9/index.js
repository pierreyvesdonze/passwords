import ProtectedLevel from "../../ProtectedLevel";
import { motion } from "framer-motion";

export default function Level9() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ display: "none" }}>PASSWORD: devi4nce-secret-h4ck</div>
      <ProtectedLevel levelNumber={9} nextLevel={10} />
    </motion.div>
  );
}
