import React, { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ResultModal from "./ResultModal" // Importar el modal separado
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivacyPolicy from "./PrivacyPolicy"
import Terms from "./Terms"
import AvisoLegal from "./AvisoLegal"

// Datos mock solo para Chiapas
const mockPercentileData = {
  height: {
    male: { mean: 165, std: 6 },
    female: { mean: 153, std: 5 },
  },
  weight: {
    male: { mean: 72, std: 11 },
    female: { mean: 62, std: 9 },
  },
}

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

const themes = [
  "theme-ocean",
  "theme-forest",
  "theme-fire",
  "theme-purple",
]

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<PrivacyPolicy />} />
        <Route path="/terminos" element={<Terms />} />
        <Route path="/aviso" element={<AvisoLegal />} />
      </Routes>
    </Router>
  )
}

function Home() {
  const [formData, setFormData] = useState({ height: "", weight: "", gender: "" })
  const [result, setResult] = useState(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState(
    themes[Math.floor(Math.random() * themes.length)]
  )
  const resultRef = useRef(null)

  const handleCalculate = async () => {
    if (!formData.height || !formData.gender) return
    setIsCalculating(true)
    await new Promise((res) => setTimeout(res, 1000))

    const h = parseFloat(formData.height)
    const w = parseFloat(70)
    const g = formData.gender === "male" ? "male" : "female"

    const heightStats = mockPercentileData.height[g]
    const weightStats = mockPercentileData.weight[g]

    const heightPercentile = calculatePercentile(h, heightStats.mean, heightStats.std)
    const weightPercentile = calculatePercentile(w, weightStats.mean, weightStats.std)

    const bmi = calculateBMI(w, h)
    const bmiCategory = getBMICategory(bmi)

    setResult({
      height: h,
      weight: w,
      heightPercentile,
      weightPercentile,
      bmi: bmi.toFixed(1),
      bmiCategory,
      gender: g === "male" ? "hombres" : "mujeres",
    })
    setIsCalculating(false)
  }

  return (
    <div className="min-h-screen vibrant-bg flex items-center justify-center flex-col">
      <div className="container mx-auto px-4 py-6 max-w-md h-[100vh] flex flex-col justify-center">
        {/* encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-3">
            ¿Qué tan alto eres en México? 📏
          </h1>
          <p className="text-lg text-white/90">
            Compara tu altura con el promedio en Chiapas
          </p>
        </motion.div>

        {/* formulario */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="form-card p-6 rounded-xl">
            <div className="grid gap-4 mb-4">
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
              {/* <div>
                <label className="text-sm font-medium">Peso (kg)</label>
                <input
                  type="number"
                  placeholder="70"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full enhanced-input rounded-lg"
                />
              </div> */}
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

        {/* modal */}
        <AnimatePresence>
          {result && (
            <ResultModal
              ref={resultRef}
              result={result}
              selectedTheme={selectedTheme}
              onClose={() => window.location.reload()}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12 text-white space-y-10">
        <h2 className="text-3xl font-extrabold text-center mb-6">📊 Datos curiosos sobre la altura en México</h2>

        {/* Promedios */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">📏 Altura promedio</h3>
          <p className="leading-relaxed">
            En México, los <span className="font-semibold">hombres miden en promedio 1.70m</span> y las{" "}
            <span className="font-semibold">mujeres 1.58m</span>. Aunque pueda parecer “normal”,
            esto coloca a México en la parte media-baja de los rankings mundiales de estatura.
          </p>
        </div>

        {/* Diferencias regionales */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">🌎 Diferencias regionales</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              En el <span className="font-semibold">norte</span> (Chihuahua, Sonora, Durango), la gente tiende a ser{" "}
              <span className="text-green-300 font-semibold">más alta</span>.
            </li>
            <li>
              En el <span className="font-semibold">sureste</span> (Chiapas, Oaxaca, Yucatán),
              los promedios son <span className="text-red-300 font-semibold">más bajos</span>.
            </li>
            <li>
              En zonas urbanas, la nutrición y el acceso a servicios mejoran la estatura frente a áreas rurales.
            </li>
          </ul>
        </div>

        {/* Genética y mestizaje */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">🧬 Genética y mestizaje</h3>
          <p className="leading-relaxed">
            México es un país de enorme diversidad genética. La mezcla de raíces{" "}
            <span className="font-semibold">indígenas, europeas y africanas</span>
            ha dado lugar a una gran variedad de complexiones y estaturas.
            ¡Cada región tiene su propio “sello” genético!
          </p>
        </div>

        {/* Factores ambientales */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">🥗 Factores ambientales</h3>
          <p className="leading-relaxed">
            La altura no depende solo de la genética.
            Factores como la <span className="font-semibold">nutrición en la infancia</span>,
            la salud prenatal, el acceso a servicios médicos y la calidad de vida
            son determinantes en cuánto puede crecer una persona.
          </p>
        </div>

        {/* Dato histórico */}
        <div className="bg-white/10 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-bold mb-3">📜 Un vistazo al pasado</h3>
          <p className="leading-relaxed">
            Investigaciones muestran que los mexicanos de hace 200 años eran{" "}
            <span className="font-semibold">8 a 10 cm más bajos</span> en promedio que los actuales.
            Esto refleja cómo la nutrición y los cambios sociales influyen en nuestra evolución.
          </p>
        </div>

        {/* Cierre */}
        <div className="text-center pt-4">
          <h3 className="text-2xl font-bold">💡 En conclusión:</h3>
          <p className="mt-2 leading-relaxed">
            Tu altura es el resultado de una mezcla única de <span className="font-semibold">genes, cultura y estilo de vida</span>.
            En México, cada centímetro cuenta una historia diferente. 🇲🇽
          </p>
        </div>
      </div>


      <div className="fixed bottom-0 w-full flex justify-center gap-6 pb-4 z-50">
        <a
          href="/privacidad"
          className="text-white/80 hover:underline text-sm"
        >
          Privacidad
        </a>
        <a
          href="/terminos"
          className="text-white/80 hover:underline text-sm"
        >
          Términos
        </a>
        <a
          href="/aviso"
          className="text-white/80 hover:underline text-sm"
        >
          Aviso legal y contacto
        </a>
      </div>
    </div>
  )
}
