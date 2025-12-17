import Level13Navbar from "./Level13Navbar";

export default function Mets() {
  return (
    <>
      <Level13Navbar />
      <div className="level13-container">
        <div className="level13-mets">
          <h1>Mets</h1>

          <div className="level13-plat">
            <h3>Côte de Paul à la truffe blanche</h3>
            <span>Tendre, racée, longuement travaillée.</span>
            <hr className="level13-hr-floral" />
          </div>

          <div className="level13-plat">
            <h3>Pinces d’Omar confites au beurre noisette</h3>
            <span>Une chair délicate, subtilement iodée.</span>
            <hr className="level13-hr-floral" />
          </div>

          <div className="level13-plat">
            <h3>Filet de Simone et sa pincée de Seb</h3>
            <span>Une harmonie douce, presque nostalgique.</span>
            <hr className="level13-hr-floral" />
          </div>

          <div className="level13-plat">
            <h3>Émincé de Franck aux herbes fines</h3>
            <span>Franc, structuré, profondément réconfortant.</span>
            <hr className="level13-hr-floral" />
          </div>

          <div className="level13-plat">
            <h3>Médaillon de Luc, réduction lente</h3>
            <span>Une présence discrète, mais persistante.</span>
          </div>
        </div>
      </div>
    </>
  );
}
