import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import html2canvas from "html2canvas"

// Lista de estados de México
const mexicanStates = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche",
  "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima",
  "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo",
  "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
  "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa",
  "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas",
]

// Datos mock para percentiles
const mockPercentileData = {
  height: {
    male: {
      default: { mean: 168, std: 7 },
      "Aguascalientes": { mean: 169, std: 7 },
      "Baja California": { mean: 172, std: 7 },
      "Baja California Sur": { mean: 171, std: 7 },
      "Campeche": { mean: 167, std: 6 },
      "Chiapas": { mean: 165, std: 6 },
      "Chihuahua": { mean: 171, std: 7 },
      "Ciudad de México": { mean: 170, std: 7 },
      "Coahuila": { mean: 171, std: 7 },
      "Colima": { mean: 169, std: 7 },
      "Durango": { mean: 170, std: 7 },
      "Estado de México": { mean: 168, std: 7 },
      "Guanajuato": { mean: 168, std: 7 },
      "Guerrero": { mean: 166, std: 6 },
      "Hidalgo": { mean: 167, std: 6 },
      "Jalisco": { mean: 169, std: 7 },
      "Michoacán": { mean: 168, std: 7 },
      "Morelos": { mean: 167, std: 6 },
      "Nayarit": { mean: 168, std: 7 },
      "Nuevo León": { mean: 172, std: 7 },
      "Oaxaca": { mean: 165, std: 6 },
      "Puebla": { mean: 167, std: 6 },
      "Querétaro": { mean: 169, std: 7 },
      "Quintana Roo": { mean: 168, std: 7 },
      "San Luis Potosí": { mean: 168, std: 7 },
      "Sinaloa": { mean: 170, std: 7 },
      "Sonora": { mean: 172, std: 7 },
      "Tabasco": { mean: 167, std: 6 },
      "Tamaulipas": { mean: 171, std: 7 },
      "Tlaxcala": { mean: 166, std: 6 },
      "Veracruz": { mean: 167, std: 6 },
      "Yucatán": { mean: 165, std: 6 },
      "Zacatecas": { mean: 168, std: 7 },
    },
    female: {
      default: { mean: 155, std: 6 },
      "Aguascalientes": { mean: 156, std: 6 },
      "Baja California": { mean: 158, std: 6 },
      "Baja California Sur": { mean: 157, std: 6 },
      "Campeche": { mean: 154, std: 6 },
      "Chiapas": { mean: 153, std: 5 },
      "Chihuahua": { mean: 157, std: 6 },
      "Ciudad de México": { mean: 156, std: 6 },
      "Coahuila": { mean: 157, std: 6 },
      "Colima": { mean: 156, std: 6 },
      "Durango": { mean: 157, std: 6 },
      "Estado de México": { mean: 155, std: 6 },
      "Guanajuato": { mean: 155, std: 6 },
      "Guerrero": { mean: 153, std: 5 },
      "Hidalgo": { mean: 154, std: 6 },
      "Jalisco": { mean: 156, std: 6 },
      "Michoacán": { mean: 155, std: 6 },
      "Morelos": { mean: 154, std: 6 },
      "Nayarit": { mean: 155, std: 6 },
      "Nuevo León": { mean: 158, std: 6 },
      "Oaxaca": { mean: 153, std: 5 },
      "Puebla": { mean: 154, std: 6 },
      "Querétaro": { mean: 156, std: 6 },
      "Quintana Roo": { mean: 155, std: 6 },
      "San Luis Potosí": { mean: 155, std: 6 },
      "Sinaloa": { mean: 157, std: 6 },
      "Sonora": { mean: 158, std: 6 },
      "Tabasco": { mean: 154, std: 6 },
      "Tamaulipas": { mean: 157, std: 6 },
      "Tlaxcala": { mean: 153, std: 5 },
      "Veracruz": { mean: 154, std: 6 },
      "Yucatán": { mean: 153, std: 5 },
      "Zacatecas": { mean: 155, std: 6 },
    },
  },
  weight: {
    male: {
      default: { mean: 75, std: 12 },
      "Aguascalientes": { mean: 76, std: 12 },
      "Baja California": { mean: 78, std: 12 },
      "Baja California Sur": { mean: 77, std: 12 },
      "Campeche": { mean: 74, std: 11 },
      "Chiapas": { mean: 72, std: 11 },
      "Chihuahua": { mean: 77, std: 12 },
      "Ciudad de México": { mean: 76, std: 12 },
      "Coahuila": { mean: 77, std: 12 },
      "Colima": { mean: 76, std: 12 },
      "Durango": { mean: 76, std: 12 },
      "Estado de México": { mean: 75, std: 12 },
      "Guanajuato": { mean: 75, std: 12 },
      "Guerrero": { mean: 73, std: 11 },
      "Hidalgo": { mean: 74, std: 11 },
      "Jalisco": { mean: 76, std: 12 },
      "Michoacán": { mean: 75, std: 12 },
      "Morelos": { mean: 74, std: 11 },
      "Nayarit": { mean: 75, std: 12 },
      "Nuevo León": { mean: 79, std: 13 },
      "Oaxaca": { mean: 72, std: 11 },
      "Puebla": { mean: 74, std: 11 },
      "Querétaro": { mean: 76, std: 12 },
      "Quintana Roo": { mean: 75, std: 12 },
      "San Luis Potosí": { mean: 75, std: 12 },
      "Sinaloa": { mean: 77, std: 12 },
      "Sonora": { mean: 78, std: 12 },
      "Tabasco": { mean: 74, std: 11 },
      "Tamaulipas": { mean: 77, std: 12 },
      "Tlaxcala": { mean: 73, std: 11 },
      "Veracruz": { mean: 74, std: 11 },
      "Yucatán": { mean: 73, std: 11 },
      "Zacatecas": { mean: 75, std: 12 },
    },
    female: {
      default: { mean: 65, std: 10 },
      "Aguascalientes": { mean: 66, std: 10 },
      "Baja California": { mean: 68, std: 10 },
      "Baja California Sur": { mean: 67, std: 10 },
      "Campeche": { mean: 64, std: 9 },
      "Chiapas": { mean: 62, std: 9 },
      "Chihuahua": { mean: 67, std: 10 },
      "Ciudad de México": { mean: 66, std: 10 },
      "Coahuila": { mean: 67, std: 10 },
      "Colima": { mean: 66, std: 10 },
      "Durango": { mean: 66, std: 10 },
      "Estado de México": { mean: 65, std: 10 },
      "Guanajuato": { mean: 65, std: 10 },
      "Guerrero": { mean: 63, std: 9 },
      "Hidalgo": { mean: 64, std: 9 },
      "Jalisco": { mean: 66, std: 10 },
      "Michoacán": { mean: 65, std: 10 },
      "Morelos": { mean: 64, std: 9 },
      "Nayarit": { mean: 65, std: 10 },
      "Nuevo León": { mean: 69, std: 11 },
      "Oaxaca": { mean: 62, std: 9 },
      "Puebla": { mean: 64, std: 9 },
      "Querétaro": { mean: 66, std: 10 },
      "Quintana Roo": { mean: 65, std: 10 },
      "San Luis Potosí": { mean: 65, std: 10 },
      "Sinaloa": { mean: 67, std: 10 },
      "Sonora": { mean: 68, std: 10 },
      "Tabasco": { mean: 64, std: 9 },
      "Tamaulipas": { mean: 67, std: 10 },
      "Tlaxcala": { mean: 63, std: 9 },
      "Veracruz": { mean: 64, std: 9 },
      "Yucatán": { mean: 63, std: 9 },
      "Zacatecas": { mean: 65, std: 10 },
    },
  },
}

// Temas visuales
const cardThemes = [
  { id: "purple", name: "Morado", class: "theme-purple" },
  { id: "sunset", name: "Atardecer", class: "theme-sunset" },
  { id: "ocean", name: "Océano", class: "theme-ocean" },
  { id: "forest", name: "Bosque", class: "theme-forest" },
  { id: "fire", name: "Fuego", class: "theme-fire" },
  { id: "pink", name: "Rosa", class: "theme-pink" },
]

// Funciones auxiliares
function calculatePercentile(value, mean, std) {
  const z = (value - mean) / std
  return Math.max(1, Math.min(99, Math.round(50 + 50 * Math.tanh(z / 2))))
}
function calculateBMI(weight, height) {
  return weight / Math.pow(height / 100, 2)
}
function getBMICategory(bmi) {
  if (bmi < 18.5) return "Bajo peso"
  if (bmi < 25) return "Peso normal"
  if (bmi < 30) return "Sobrepeso"
  return "Obesidad"
}

export default function App() {
  const [formData, setFormData] = useState({ height: "", weight: "", state: "", gender: "" })
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState("purple")
  const resultRef = useRef(null)

  const handleCalculate = async () => {
    if (!formData.height || !formData.weight || !formData.state || !formData.gender) return
    setIsCalculating(true)
    await new Promise((res) => setTimeout(res, 1000))

    const h = parseFloat(formData.height)
    const w = parseFloat(formData.weight)
    const g = formData.gender === "male" ? "male" : "female"
    const s = formData.state

    // Buscar datos de altura y peso para el estado seleccionado o usar "default"
    const heightStats = mockPercentileData.height[g][s] || mockPercentileData.height[g].default
    const weightStats = mockPercentileData.weight[g][s] || mockPercentileData.weight[g].default

    const heightPercentile = calculatePercentile(h, heightStats.mean, heightStats.std)
    const weightPercentile = calculatePercentile(w, weightStats.mean, weightStats.std)

    const bmi = calculateBMI(w, h)
    const bmiCategory = getBMICategory(bmi)

    setResult({
      heightPercentile,
      weightPercentile,
      bmi: bmi.toFixed(1),
      bmiCategory,
      gender: g === "male" ? "hombres" : "mujeres",
      state: s,
    })
    setIsCalculating(false)
  }


  const downloadResult = async () => {
    if (!resultRef.current) return
    const canvas = await html2canvas(resultRef.current, { backgroundColor: "#ffffff", scale: 2 })
    const link = document.createElement("a")
    link.download = "mi-altura-en-mexico.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="min-h-screen vibrant-bg flex items-center justify-center">
      <div className="container mx-auto px-4 py-6 max-w-md">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-3">¿Qué tan alto eres en México? 📏</h1>
          <p className="text-lg text-white/90">Compara tu altura con el promedio de tu estado</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="form-card p-6 rounded-xl">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium">Altura (cm)</label>
                <input
                  type="number"
                  placeholder="170"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  className="w-full enhanced-input rounded-lg"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Peso (kg)</label>
                <input
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full enhanced-input rounded-lg"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Estado</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full enhanced-select rounded-lg"
              >
                <option value="">Selecciona tu estado</option>
                {mexicanStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Sexo</label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  />
                  Hombre
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  />
                  Mujer
                </label>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full h-12 text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg"
            >
              {isCalculating ? "Calculando..." : "¡Calcular! 🚀"}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`result-card mt-6 p-6 text-white ${cardThemes.find((t) => t.id === selectedTheme)?.class}`}
            >
              <div className="text-center mb-6">
                <div className="percentage-highlight mb-2">{result.heightPercentile}%</div>
                <h2 className="text-xl font-bold">
                  Eres más alto que el {result.heightPercentile}% de los {result.gender}
                </h2>
                <p className="text-white/90 text-sm">en {result.state} 🇲🇽</p>
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

              <div className="text-center text-sm opacity-90 mb-4">Tu categoría: {result.bmiCategory}</div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={downloadResult}
                  className="w-full border-2 border-white/70 text-white rounded-lg py-2 hover:bg-white/20"
                >
                  💾 Descargar imagen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
