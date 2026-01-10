import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Activity, Check } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PrakritiChart } from "@/components/prakriti/PrakritiChart";

interface Question {
  id: number;
  question: string;
  category: string;
  options: {
    text: string;
    vata: number;
    pitta: number;
    kapha: number;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "What best describes your body frame?",
    category: "Physical Constitution",
    options: [
      { text: "Thin, light, difficulty gaining weight", vata: 3, pitta: 0, kapha: 0 },
      { text: "Medium build, muscular", vata: 0, pitta: 3, kapha: 0 },
      { text: "Large frame, gains weight easily", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 2,
    question: "How would you describe your skin?",
    category: "Physical Constitution",
    options: [
      { text: "Dry, rough, cool to touch", vata: 3, pitta: 0, kapha: 0 },
      { text: "Warm, oily, prone to rashes", vata: 0, pitta: 3, kapha: 0 },
      { text: "Smooth, moist, cool", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 3,
    question: "What is your appetite like?",
    category: "Digestion",
    options: [
      { text: "Variable, sometimes forget to eat", vata: 3, pitta: 0, kapha: 0 },
      { text: "Strong, irritable when hungry", vata: 0, pitta: 3, kapha: 0 },
      { text: "Steady, can skip meals easily", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 4,
    question: "How is your digestion?",
    category: "Digestion",
    options: [
      { text: "Irregular, prone to gas and bloating", vata: 3, pitta: 0, kapha: 0 },
      { text: "Quick, strong, prone to acidity", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow but steady", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 5,
    question: "How would you describe your sleep?",
    category: "Sleep Patterns",
    options: [
      { text: "Light, often interrupted, difficulty falling asleep", vata: 3, pitta: 0, kapha: 0 },
      { text: "Moderate, wake up feeling alert", vata: 0, pitta: 3, kapha: 0 },
      { text: "Deep and long, hard to wake up", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 6,
    question: "What is your mental nature?",
    category: "Mental Characteristics",
    options: [
      { text: "Quick thinking, creative, restless", vata: 3, pitta: 0, kapha: 0 },
      { text: "Sharp, focused, competitive", vata: 0, pitta: 3, kapha: 0 },
      { text: "Calm, steady, methodical", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 7,
    question: "How do you respond to stress?",
    category: "Mental Characteristics",
    options: [
      { text: "Anxiety, worry, fear", vata: 3, pitta: 0, kapha: 0 },
      { text: "Anger, irritability, frustration", vata: 0, pitta: 3, kapha: 0 },
      { text: "Withdrawal, depression, attachment", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 8,
    question: "What is your speaking style?",
    category: "Communication",
    options: [
      { text: "Fast, talkative, jumping between topics", vata: 3, pitta: 0, kapha: 0 },
      { text: "Sharp, clear, convincing", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow, steady, thoughtful", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 9,
    question: "How is your memory?",
    category: "Mental Characteristics",
    options: [
      { text: "Quick to learn, quick to forget", vata: 3, pitta: 0, kapha: 0 },
      { text: "Sharp, selective", vata: 0, pitta: 3, kapha: 0 },
      { text: "Slow to learn, never forgets", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
  {
    id: 10,
    question: "What climate do you prefer?",
    category: "Environmental Preference",
    options: [
      { text: "Warm and moist", vata: 3, pitta: 0, kapha: 0 },
      { text: "Cool and well-ventilated", vata: 0, pitta: 3, kapha: 0 },
      { text: "Warm and dry", vata: 0, pitta: 0, kapha: 3 },
    ],
  },
];

export default function Prakriti() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let vata = 0, pitta = 0, kapha = 0;

    answers.forEach((answerIndex, questionIndex) => {
      if (answerIndex !== null) {
        const option = questions[questionIndex].options[answerIndex];
        vata += option.vata;
        pitta += option.pitta;
        kapha += option.kapha;
      }
    });

    const total = vata + pitta + kapha;
    setScores({
      vata: Math.round((vata / total) * 100),
      pitta: Math.round((pitta / total) * 100),
      kapha: Math.round((kapha / total) * 100),
    });
    setShowResults(true);
  };

  const resetAssessment = () => {
    setCurrentQuestion(0);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setScores({ vata: 0, pitta: 0, kapha: 0 });
  };

  const getDominantDosha = () => {
    const { vata, pitta, kapha } = scores;
    if (vata >= pitta && vata >= kapha) return "Vata";
    if (pitta >= vata && pitta >= kapha) return "Pitta";
    return "Kapha";
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl font-semibold text-foreground">
            Prakriti Assessment
          </h1>
          <p className="text-muted-foreground mt-2">
            Determine the patient's unique mind-body constitution
          </p>
        </motion.div>

        {!showResults ? (
          <>
            {/* Progress */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-card rounded-2xl border border-border p-8 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {questions[currentQuestion].category}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-semibold mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleAnswer(index)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        answers[currentQuestion] === index
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            answers[currentQuestion] === index
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          }`}
                        >
                          {answers[currentQuestion] === index && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                        <span className="font-medium">{option.text}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="rounded-xl"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={answers.includes(null)}
                  className="rounded-xl bg-primary text-primary-foreground"
                >
                  Complete Assessment
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={answers[currentQuestion] === null}
                  className="rounded-xl bg-primary text-primary-foreground"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl border border-border p-8 shadow-sm text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-display text-2xl font-semibold mb-2">
                Assessment Complete
              </h2>
              <p className="text-muted-foreground">
                Dominant Constitution: <span className="text-primary font-semibold">{getDominantDosha()}</span>
              </p>
            </div>

            <PrakritiChart scores={scores} />

            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Vata", score: scores.vata, color: "bg-accent" },
                { name: "Pitta", score: scores.pitta, color: "bg-destructive" },
                { name: "Kapha", score: scores.kapha, color: "bg-primary" },
              ].map((dosha) => (
                <motion.div
                  key={dosha.name}
                  whileHover={{ y: -4 }}
                  className="bg-card rounded-2xl border border-border p-6 text-center"
                >
                  <div className={`w-4 h-4 rounded-full ${dosha.color} mx-auto mb-3`} />
                  <h3 className="font-display text-lg font-semibold">{dosha.name}</h3>
                  <p className="text-3xl font-bold text-foreground mt-2">{dosha.score}%</p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={resetAssessment}
                className="rounded-xl"
              >
                New Assessment
              </Button>
              <Button className="rounded-xl bg-primary text-primary-foreground">
                Save to Patient Profile
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
}
