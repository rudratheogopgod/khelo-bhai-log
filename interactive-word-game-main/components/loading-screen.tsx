"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-purple-100 to-blue-100 flex flex-col items-center justify-center">
      <motion.div
        className="relative w-64 h-64"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      >
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-purple-500 rounded-full"
          animate={{
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-blue-500 rounded-full"
          animate={{
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />

        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-pink-500 rounded-full"
          animate={{
            x: [0, 100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-green-500 rounded-full"
          animate={{
            x: [0, -100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </motion.div>

      <div className="mt-8 relative">
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-purple-700">Word Unscramble</h1>
        </motion.div>

        <motion.div
          className="mt-4 flex justify-center"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="h-2 bg-purple-300 rounded-full w-48">
            <motion.div
              className="h-full bg-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>

        <motion.p
          className="mt-4 text-center text-purple-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          Loading fun...
        </motion.p>
      </div>
    </div>
  )
}
