import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen vibrant-bg flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl p-8 max-w-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        <p className="mb-4">
          En Mi Altura México, respetamos tu privacidad. Esta aplicación no almacena ni comparte 
          información personal identificable. Los cálculos se realizan localmente en tu dispositivo.
        </p>
        <p className="mb-4">
          Los datos utilizados son estadísticas generales de altura y peso para Chiapas, 
          proporcionados con fines informativos y de comparación.
        </p>
      </div>
    </motion.div>
  );
}
