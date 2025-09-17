import React, { forwardRef } from "react"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"

const ResultModal = forwardRef(({ result, selectedTheme, onClose }, ref) => {
  if (!result) return null

  const downloadResult = async () => {
    if (!ref.current) return
    const canvas = await html2canvas(ref.current, { backgroundColor: "#ffffff", scale: 2 })
    const link = document.createElement("a")
    link.download = "mi-altura-en-mexico.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        ref={ref}
        className={`result-card relative w-full max-w-md mx-4 p-6 text-white rounded-xl shadow-2xl ${selectedTheme}`}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white text-lg bg-white/20 rounded-full px-2 hover:bg-white/40"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="percentage-highlight mb-2">{result.heightPercentile}%</div>
          <h2 className="text-xl font-bold leading-snug">
            Eres {result.heightPercentile}% más alto que un{" "}
            <span className="gradient-text font-extrabold">chiapaneco</span>
          </h2>
          <p className="text-white/90 text-sm mt-2">
            Comparación basada en datos de{" "}
            <span className="gradient-text font-bold">Chiapas 🇲🇽</span>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{result.heightPercentile}%</div>
            <div className="text-sm opacity-90">Altura</div>
          </div>
          <div className="text-center bg-white/20 rounded-xl p-3">
            <div className="text-2xl font-bold">{result.bmi}</div>
            <div className="text-sm opacity-90">IMC</div>
          </div>
        </div>

        <div className="text-center text-sm opacity-90 mb-4">
          Tu categoría:{" "}
          <span className="gradient-text font-semibold">{result.bmiCategory}</span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={downloadResult}
            className="w-full border-2 border-white/70 text-white rounded-lg py-2 hover:bg-white/20"
          >
            💾 Descargar imagen
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
})

export default ResultModal
