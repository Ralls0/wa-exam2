import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import { CardMeme } from '../CardMeme/CardMeme';

function MainContent(props) {
  return (
    <AnimateSharedLayout>
      <motion.ul layout initial={{ borderRadius: 25 }}>
        {props.memes && props.memes.map(item => (
          <CardMeme key={item.id} />
        ))}
      </motion.ul>
    </AnimateSharedLayout>
  );
}

export { MainContent }