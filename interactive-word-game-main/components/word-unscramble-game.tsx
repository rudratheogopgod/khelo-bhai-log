"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Star, Trophy, HelpCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import LoadingScreen from "@/components/loading-screen"

// Word lists by difficulty
const wordLists = {
  easy: ["apple", "banana", "orange", "grape", "melon", "peach", "lemon", "cherry", "kiwi", "mango"],
  medium: [
    "computer",
    "keyboard",
    "monitor",
    "software",
    "internet",
    "program",
    "website",
    "network",
    "database",
    "algorithm",
  ],
  hard: [
    "extraordinary",
    "sophisticated",
    "revolutionary",
    "phenomenal",
    "magnificent",
    "spectacular",
    "astonishing",
    "remarkable",
    "fascinating",
    "mysterious",
  ],
}

// Hint types
const hintTypes = ["First letter", "Last letter", "Word length", "Word category"]

export default function WordUnscrambleGame() {
  const [loading, setLoading] = useState(true)
  const [gameStarted, setGameStarted] = useState(false)
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard" | null>(null)
  const [currentWord, setCurrentWord] = useState("")
  const [scrambledWord, setScrambledWord] = useState("")
  const [userGuess, setUserGuess] = useState("")
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [hints, setHints] = useState(3)
  const [currentHint, setCurrentHint] = useState<string | null>(null)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "info" } | null>(null)
  const [wordCategories] = useState({
    easy: "Fruits",
    medium: "Technology",
    hard: "Descriptive Words",
  })

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2500)
    return () => clearTimeout(timer)
  }, [])

  // Start game with selected difficulty
  const startGame = (selectedDifficulty: "easy" | "medium" | "hard") => {
    setDifficulty(selectedDifficulty)
    setGameStarted(true)
    generateNewWord(selectedDifficulty)
  }

  // Generate a new scrambled word
  const generateNewWord = (diff: "easy" | "medium" | "hard") => {
    const words = wordLists[diff]
    const randomIndex = Math.floor(Math.random() * words.length)
    const word = words[randomIndex]
    setCurrentWord(word)
    setScrambledWord(scrambleWord(word))
    setUserGuess("")
    setCurrentHint(null)
  }

  // Scramble a word
  const scrambleWord = (word: string) => {
    const wordArray = word.split("")
    let scrambled = word

    // Make sure the scrambled word is different from the original
    while (scrambled === word) {
      for (let i = wordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]]
      }
      scrambled = wordArray.join("")
    }

    return scrambled
  }

  // Check user's guess
  const checkGuess = () => {
    if (userGuess.toLowerCase() === currentWord.toLowerCase()) {
      // Correct guess
      const pointsEarned = calculatePoints()
      setScore(score + pointsEarned)
      setHints(hints + 1)
      setMessage({ text: `Correct! +${pointsEarned} points. You earned a hint!`, type: "success" })

      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null)
        // Move to next level
        setLevel(level + 1)
        if (difficulty) {
          generateNewWord(difficulty)
        }
      }, 3000)
    } else {
      // Incorrect guess
      setMessage({ text: "Try again!", type: "error" })
      setTimeout(() => setMessage(null), 2000)
    }
  }

  // Calculate points based on difficulty and word length
  const calculatePoints = () => {
    const difficultyMultiplier = difficulty === "easy" ? 1 : difficulty === "medium" ? 2 : 3
    return currentWord.length * difficultyMultiplier * 10
  }

  // Get a hint
  const getHint = () => {
    if (hints > 0) {
      let hintText = ""
      const hintType = hintTypes[Math.floor(Math.random() * hintTypes.length)]

      switch (hintType) {
        case "First letter":
          hintText = `The first letter is "${currentWord[0]}"`
          break
        case "Last letter":
          hintText = `The last letter is "${currentWord[currentWord.length - 1]}"`
          break
        case "Word length":
          hintText = `The word has ${currentWord.length} letters`
          break
        case "Word category":
          hintText = `Category: ${wordCategories[difficulty as keyof typeof wordCategories]}`
          break
      }

      setCurrentHint(hintText)
      setHints(hints - 1)
    }
  }

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <AnimatePresence mode="wait">
      {!gameStarted ? (
        <motion.div
          key="difficulty-selection"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple-700">Word Unscramble</CardTitle>
              <CardDescription>Select a difficulty level to start the game</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={() => startGame("easy")}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                size="lg"
              >
                Easy
              </Button>
              <Button
                onClick={() => startGame("medium")}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                size="lg"
              >
                Medium
              </Button>
              <Button
                onClick={() => startGame("hard")}
                className="w-full bg-red-500 hover:bg-red-600 text-white"
                size="lg"
              >
                Hard
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          key="game-screen"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-2 border-purple-200 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="px-3 py-1 text-sm font-medium">
                  Level {level}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">{score}</span>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-purple-700 mt-2">Unscramble the Word</CardTitle>
              <div className="flex justify-center mt-2">
                <Badge
                  variant={difficulty === "easy" ? "success" : difficulty === "medium" ? "warning" : "destructive"}
                >
                  {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="flex gap-1">
                  {scrambledWord.split("").map((letter, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-md border-2 border-purple-300 text-lg font-bold text-purple-800"
                    >
                      {letter.toUpperCase()}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Type your answer..."
                    value={userGuess}
                    onChange={(e) => setUserGuess(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        checkGuess()
                      }
                    }}
                  />
                  <Button onClick={checkGuess}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-2 rounded-md text-center ${
                      message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : message.type === "error"
                          ? "bg-red-100 text-red-700"
                          : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {message.text}
                  </motion.div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4 text-purple-500" />
                  <span className="text-sm font-medium">Hints: {hints}</span>
                </div>
                <Button variant="outline" size="sm" onClick={getHint} disabled={hints <= 0}>
                  Use Hint
                </Button>
              </div>

              {currentHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-700"
                >
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                    <p>{currentHint}</p>
                  </div>
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <div className="w-full">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span className="font-medium">{level}/10</span>
                </div>
                <Progress value={level * 10} className="h-2" />
              </div>
              {level >= 10 && (
                <div className="w-full p-3 bg-yellow-50 border border-yellow-200 rounded-md text-center text-yellow-700">
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <p className="font-medium">Congratulations! You've completed all levels!</p>
                  </div>
                </div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
