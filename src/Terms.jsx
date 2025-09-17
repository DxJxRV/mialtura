import React from 'react';
import { motion } from 'framer-motion';

export default function Terms() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen vibrant-bg flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl p-8 max-w-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Términos de Uso</h1>
        <p className="mb-4">
          Mi Altura México es una herramienta informativa para comparar altura y peso 
          con promedios de Chiapas. Los resultados son solo para fines de entretenimiento 
          y no constituyen un consejo médico profesional.
        </p>
        <p className="mb-4">
          Los usuarios son responsables de consultar a profesionales de la salud 
          para interpretaciones precisas de su salud y bienestar.
        </p>
      </div>
    </motion.div>
  );
}

