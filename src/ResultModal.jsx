import React, { forwardRef } from "react"
import { motion } from "framer-motion"


const frasesByPercentile = {
    veryLow: [
        "Serías el burla de los chiapanecos en cada fiesta 🪓",
        "Ni un pozol chiapaneco podrías cargar 🥤",
        "Los chiapanecos te pondrían de escudero 😂",
    ],
    low: [
        "Serías el chalán de los chiapanecos en el mercado 🌽",
        "En Chiapas, hasta los niños te ganarían en altura 😅",
        "Serías el ayudante oficial de un tamalero chiapaneco 🫔",
    ],
    mid: [
        "Un chiapaneco más del montón, sin gloria ni pena 😎",
        "Eres un chiapaneco promedio, como cualquier otro 👥",
        "Nada mal, pero en Chiapas no destacarías mucho 🤷‍♂️",
    ],
    midHigh: [
        "Los chiapanecos empezarían a respetarte 🔥",
        "En Chiapas ya te mirarían con cierta envidia 👀",
        "Casi un referente chiapaneco, pero aún falta 💪",
    ],
    high: [
        "Serías la leyenda urbana entre los chiapanecos 📢",
        "En Chiapas, ya serías un líder natural 👑",
        "Todos los chiapanecos se girarían a verte pasar 🔥",
    ],
    top: [
        "Los chiapanecos se arrodillarían ante tu grandeza 👑",
        "En Chiapas ya no caminarías, ¡levitarías! ✨",
        "El universo chiapaneco giraría a tu alrededor 🌌",
    ],
}



const ResultModal = forwardRef(({ result, selectedTheme, onClose }, ref) => {
    if (!result) return null
    console.log("ResultModal render with result:", result)
    // Mensaje sensacionalista según percentil
    const getMessage = () => {
        const p = result.heightPercentile
        const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

        if (p <= 10) return <>{pickRandom(frasesByPercentile.veryLow)}</>
        if (p <= 30) return <>{pickRandom(frasesByPercentile.low)}</>
        if (p <= 50) return <>{pickRandom(frasesByPercentile.mid)}</>
        if (p <= 70) return <>{pickRandom(frasesByPercentile.midHigh)}</>
        if (p <= 90) return <>{pickRandom(frasesByPercentile.high)}</>
        return <>{pickRandom(frasesByPercentile.top)}</>




    }

    const titlesByPercentile = {
        veryLow: [
            "Esclavo Chiapaneco",
            "Chaparrito Oficial de Chiapas",
            "El Alfeñique del Sureste",
        ],
        low: [
            "Peón Chiapaneco",
            "Sombra del Pozol Chiapaneco",
            "Aprendiz de Tamalero en Chiapas",
        ],
        mid: [
            "Chiapaneco Promedio",
            "Ciudadano del Montón de Chiapas",
            "Normalito Chiapaneco",
        ],
        midHigh: [
            "Chiapaneco con Flow",
            "Gigante de Chiapas",
            "El Respeto Chiapaneco de la Tortillería",
        ],
        high: [
            "Titán de Chiapas",
            "Gran Señor Chiapaneco",
            "Imparable de la Selva Chiapaneca",
        ],
        top: [
            "Rey Absoluto de Chiapas",
            "Dios del Maíz Chiapaneco",
            "Su Majestad Suprema de Chiapas",
        ],
    }

    // 🎯 Frases dinámicas con el percentil exacto
    // 🎯 Frases dinámicas con percentil por rango
    const frasesConPercentil = {
        veryLow: [
            (p) => `El ${p}% de los chiapanecos te vería como su bufón 🤡`,
            (p) => `Ni el ${p}% de Chiapas te tomaría en serio 😂`,
            (p) => `El ${100 - p}% de los chiapanecos podría cargarte como costal 🪓`,
        ],
        low: [
            (p) => `Solo un ${p}% de Chiapas te reconocería en la multitud 👀`,
            (p) => `El ${p}% de los chiapanecos diría que eres "más o menos" 😅`,
            (p) => `El ${100 - p}% de Chiapas todavía te vería desde arriba 🤷‍♂️`,
        ],
        mid: [
            (p) => `El ${p}% de los chiapanecos estaría a tu nivel 😎`,
            (p) => `En Chiapas, el ${p}% de la gente te vería de frente 👥`,
            (p) => `El ${100 - p}% de los chiapanecos te sacaría ventaja 🔄`,
        ],
        midHigh: [
            (p) => `El ${p}% de los chiapanecos empezaría a mirarte hacia arriba 👀`,
            (p) => `Con tu altura, ya dominas al ${p}% de Chiapas 💪`,
            (p) => `En Chiapas, el ${p}% te respetaría 🔥`,
        ],
        high: [
            (p) => `El ${p}% de los chiapanecos estaría bajo tu sombra 🌑`,
            (p) => `El ${100 - p}% de Chiapas sería tu séquito 🫡`,
            (p) => `Con tu grandeza, dominarías al ${p}% de Chiapas 👑`,
        ],
        top: [
            (p) => `El ${p}% de los chiapanecos se arrodillaría ante ti 🙇`,
            (p) => `En Chiapas, solo un ${100 - p}% podría desafiarte ⚡`,
            (p) => `El ${p}% de Chiapas corearía tu nombre en las calles 🔥`,
        ],
    }


    // 🎯 Helpers
    const pickRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

    const getTitle = (percentile) => {
        if (percentile <= 10) return pickRandom(titlesByPercentile.veryLow)
        if (percentile <= 30) return pickRandom(titlesByPercentile.low)
        if (percentile <= 50) return pickRandom(titlesByPercentile.mid)
        if (percentile <= 70) return pickRandom(titlesByPercentile.midHigh)
        if (percentile <= 90) return pickRandom(titlesByPercentile.high)
        return pickRandom(titlesByPercentile.top)
    }


    function getRange(p) {
        if (p <= 15) return "veryLow"
        if (p <= 30) return "low"
        if (p <= 60) return "mid"
        if (p <= 80) return "midHigh"
        if (p <= 95) return "high"
        return "top"
    }

    // 🔹 Función para elegir frase random según el rango
    function getFraseConPercentil(p) {
        const rango = getRange(p)
        const frases = frasesConPercentil[rango]
        return frases[Math.floor(Math.random() * frases.length)](p)
    }

    return (
        <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/80 z-50"
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
                    {/* <div className="percentage-highlight mb-2">{result.heightPercentile}%</div> */}

                    {/* 🎯 Título */}

                    {/* 🎯 Mensaje base */}

                    <h1 className="text-4xl font-extrabold leading-snug gradient-text">
                        {getTitle(result.heightPercentile)}
                    </h1>

                    {/* <p className="text-white/90 text-xs mt-1 italic">
                        {getFraseConPercentil(result.heightPercentile)}
                    </p> */}
                    {/* 🎯 Frase dinámica con percentil */}
                    <p className="text-white/90 text-xs mt-1 italic">
                        {getMessage(result.heightPercentile)}
                    </p>
                </div>


                <div className="grid gap-4 mb-6">
                    <div className="text-center bg-white/20 rounded-xl p-3">
                        <div className="text-2xl font-bold">{result.height}</div>
                        <div className="text-sm opacity-90">Altura</div>
                    </div>
                    {/* <div className="text-center bg-white/20 rounded-xl p-3">
                        <div className="text-2xl font-bold">{result.bmi}</div>
                        <div className="text-sm opacity-90">IMC</div>
                    </div> */}
                </div>

                <div className="text-center text-sm opacity-90">
                    mialtura.org
                </div>
            </motion.div>
        </motion.div>
    )
})

export default ResultModal
