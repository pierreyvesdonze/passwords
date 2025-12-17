import { motion } from "framer-motion";
import Level13Navbar from "./Level13Navbar";

export default function Maison() {
  return (
    <>
      <Level13Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="level13-container">
          <h1>Maison</h1>

          <div className="level13-container-maison">
            <div className="level13-kichen-bg"></div>

            <div id="fragment-A" style={{ color: "black", opacity: 0 }}>
              Rien à voir ici
            </div>

            <p>
              La Maison vous ouvre ses portes à qui saura décrypter les subtilités
              d’une cuisine pensée pour éveiller tous les sens. Ici, chaque plat
              est une expérience unique, chaque ingrédient sélectionné avec une
              précision presque obsessionnelle.
            </p>

            <p>
              Les saveurs s’entrelacent comme une symphonie délicate, des textures
              surprenantes aux arômes profonds et complexes. On vous invite à
              savourer des pièces rares, des mets minutieusement travaillés,
              dont la perfection dépasse parfois l’entendement.
            </p>

            <p>
              Les connaisseurs remarqueront des touches exquises, des petites
              nuances qui échappent au palais inattentif. Certains murmures de
              goût, presque imperceptibles, évoquent un soin... particulier dans
              le choix des ingrédients.
            </p>

            <p>
              Entrez, goûtez, laissez vos sens vous guider, et découvrez que
              chaque plat raconte une histoire que l’on savoure sans jamais en
              percevoir tous les mystères.
            </p>

            <p>
              L'ordre des choses est notre priorité.
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
