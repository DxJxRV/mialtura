import React from "react"
import { motion } from "framer-motion"

export default function AvisoLegal() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen vibrant-bg flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl p-8 max-w-2xl shadow-lg text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Aviso Legal y Contacto</h1>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Titular del Sitio</h2>
          <p>
            Este sitio web es administrado por <span className="font-medium">Mr Altura</span>.
            <br />
            Correo de contacto:{" "}
            <a
              href="mailto:mraltura@mialtura.org"
              className="text-blue-600 underline"
            >
              mraltura@mialtura.org
            </a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Propósito del Sitio</h2>
          <p>
            El propósito de este sitio es ofrecer contenido informativo y de
            entretenimiento. No nos hacemos responsables del uso indebido que los
            usuarios puedan dar a la información publicada.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Propiedad Intelectual</h2>
          <p>
            Todos los contenidos de este sitio, salvo que se indique lo contrario,
            son propiedad de su titular. Queda prohibida la reproducción total o
            parcial sin autorización previa.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Limitación de Responsabilidad</h2>
          <p>
            No garantizamos que el contenido del sitio esté libre de errores o que
            esté siempre disponible. El uso del sitio es responsabilidad exclusiva
            del usuario.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Contacto</h2>
          <p>
            Para cualquier consulta o notificación legal, por favor escribe a:{" "}
            <a
              href="mailto:mraltura@mialtura.org"
              className="text-blue-600 underline"
            >
              mraltura@mialtura.org
            </a>
          </p>
        </section>
      </div>
    </motion.div>
  )
}