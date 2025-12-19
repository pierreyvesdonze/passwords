import React from "react";
import { motion, wrap } from "framer-motion";

const AnimatedTextComponent = ({ text }) => {
    const words = text.split(" ");

    // Variants pour le conteneur des mots.
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 },
        },
    };

    // Variants pour chaque mot.
    const child = {
        visible: {
            opacity: 1,
            transition: {
                duration: 0.9, // Durée de l'animation en secondes
            },
        },
        hidden: {
            opacity: 0,
        },
    };

    if (words.length === 0) {
        return null; // Renvoyer null si words est vide
    }

    return (
        <motion.div
            style={{ 
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                fontSize: "2.5rem",
                width: '60%',
             }}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ marginRight: "14px" }}
                    key={index}
                    className="animated-text"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default AnimatedTextComponent;