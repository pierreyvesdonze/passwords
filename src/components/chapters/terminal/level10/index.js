import ProtectedLevel from "../../ProtectedLevel";

export default function Level10() {
  return (
    <>
      {/* 🛑 FRAGMENT A: Trouvable uniquement dans l'inspecteur du navigateur. */}
      <div id="fragment-A" style={{ color: "black", opacity: 0 }}>
        CLE_FRAGMENT_A: COd3-
      </div>
      <ProtectedLevel levelNumber={10} nextLevel={11} />
    </>
  );
}