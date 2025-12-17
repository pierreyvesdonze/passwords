import Level13Navbar from "./Level13Navbar";

export default function Produits() {
  return (
    <>
      <Level13Navbar />

      <div className="level13-container">
        <div className="level13-produits">
          <h1>Produits</h1>
          <hr />
          <br />

          <div className="level13-heart"></div>
          <h2>Coeur</h2>
          <p>
            Commençons par la partie la plus savoureuse. Celle où les émotions
            débutent et se terminent. Le cœur est tendre, mais solide. Il
            absorbe les maux pour en faire des phrases, à son insu. Rien n'est
            plus sensible, que l'aorte.
          </p>
          <p>
            Il bat comme un métronome secret, orchestrant chaque pensée, chaque
            souvenir, chaque soupir. Ses ventricules sont des salles closes, où
            se murmurent des confidences que nul ne peut entendre.
          </p>

          <br />
          <br />

          <div className="level13-foie"></div>
          <h2>Foie</h2>
          <p>
            Le foie filtre, trie, décide. Il conserve ce qui peut l’être et
            rejette ce qui doit disparaître. Mémoire chimique du corps, il garde
            les traces longtemps après que l’esprit ait oublié.
          </p>

          <br />
          <br />

          <div className="level13-poumon"></div>
          <h2>Poumons</h2>
          <p>
            Les poumons accueillent l’air comme une promesse. Ils se gonflent,
            se vident, encore et encore, jusqu’à ce que le souffle devienne une
            habitude. Ils savent quand retenir, quand relâcher.
          </p>

          <br />
          <br />

          <div style={{ color: "black", opacity: 0, height: "0" }}>
            Aucun mot de passe ici
          </div>
          <div className="level13-skull"></div>
          <h2>Mort</h2>
          <p></p>
        </div>
      </div>
    </>
  );
}
