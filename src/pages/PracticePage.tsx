import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { modules } from '@/data/modules';
import { practiceQuestions } from '@/data/practice';

type QuizState = 'select' | 'quiz' | 'results';

interface Answer {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}

export default function PracticePage() {
  const [state, setState] = useState<QuizState>('select');
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);

  const moduleQuestions = practiceQuestions.filter(
    (q) => q.moduleId === selectedModule
  );
  const currentQuestion = moduleQuestions[currentQuestionIndex];

  const startQuiz = () => {
    if (selectedModule && moduleQuestions.length > 0) {
      setState('quiz');
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setCurrentAnswer('');
      setShowExplanation(false);
    }
  };

  const submitAnswer = () => {
    if (!currentAnswer || !currentQuestion) return;

    const isCorrect =
      currentAnswer.toLowerCase().trim() ===
      currentQuestion.correctAnswer.toLowerCase().trim();

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        answer: currentAnswer,
        isCorrect,
      },
    ]);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < moduleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentAnswer('');
      setShowExplanation(false);
    } else {
      setState('results');
    }
  };

  const resetQuiz = () => {
    setState('select');
    setSelectedModule('');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setCurrentAnswer('');
    setShowExplanation(false);
  };

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const percentage = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;

  if (state === 'select') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <Brain className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-3xl font-bold text-foreground mb-2">Practice Hub</h1>
          <p className="text-muted-foreground">
            Test your knowledge with quiz questions from your modules
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Start a Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="module-select" className="mb-2 block">
                Select a Module
              </Label>
              <Select value={selectedModule} onValueChange={setSelectedModule}>
                <SelectTrigger id="module-select">
                  <SelectValue placeholder="Choose a module..." />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {modules.map((m) => {
                    const qCount = practiceQuestions.filter(
                      (q) => q.moduleId === m.id
                    ).length;
                    return (
                      <SelectItem key={m.id} value={m.id} disabled={qCount === 0}>
                        {m.title} ({qCount} questions)
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {selectedModule && (
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>{moduleQuestions.length}</strong> questions available
                </p>
              </div>
            )}

            <Button
              className="w-full"
              size="lg"
              onClick={startQuiz}
              disabled={!selectedModule || moduleQuestions.length === 0}
            >
              Start Quiz
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (state === 'results') {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="mb-6">
              {percentage >= 70 ? (
                <CheckCircle className="h-16 w-16 mx-auto text-success mb-4" />
              ) : (
                <XCircle className="h-16 w-16 mx-auto text-destructive mb-4" />
              )}
              <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-muted-foreground">
                You scored {correctCount} out of {answers.length}
              </p>
            </div>

            <div className="text-6xl font-bold text-primary mb-6">{percentage}%</div>

            <div className="space-y-4 mb-8">
              {answers.map((answer, idx) => {
                const question = practiceQuestions.find(
                  (q) => q.id === answer.questionId
                );
                return (
                  <div
                    key={answer.questionId}
                    className={`p-4 rounded-lg text-left ${
                      answer.isCorrect ? 'bg-success/10' : 'bg-destructive/10'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {answer.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium text-sm">
                          Q{idx + 1}: {question?.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your answer: {answer.answer}
                        </p>
                        {!answer.isCorrect && (
                          <p className="text-xs text-success mt-1">
                            Correct: {question?.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={resetQuiz} variant="outline">
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button asChild>
                <Link to="/modules">Back to Modules</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Quiz state
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">
            Question {currentQuestionIndex + 1} of {moduleQuestions.length}
          </Badge>
          <Button variant="ghost" size="sm" onClick={resetQuiz}>
            Exit Quiz
          </Button>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestionIndex + 1) / moduleQuestions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Badge variant="outline" className="mb-4">
            {currentQuestion?.topic}
          </Badge>
          <h2 className="text-xl font-semibold mb-6">{currentQuestion?.question}</h2>

          {currentQuestion?.type === 'mcq' && currentQuestion.options && (
            <RadioGroup
              value={currentAnswer}
              onValueChange={setCurrentAnswer}
              disabled={showExplanation}
              className="space-y-3"
            >
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    showExplanation
                      ? option === currentQuestion.correctAnswer
                        ? 'border-success bg-success/10'
                        : option === currentAnswer
                        ? 'border-destructive bg-destructive/10'
                        : 'border-border'
                      : currentAnswer === option
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <RadioGroupItem value={option} id={`option-${idx}`} />
                  <Label htmlFor={`option-${idx}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion?.type === 'short' && (
            <Input
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              placeholder="Type your answer..."
              disabled={showExplanation}
              className="text-lg"
            />
          )}

          {showExplanation && (
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {answers[answers.length - 1]?.isCorrect ? (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Correct!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <span className="font-semibold text-destructive">Incorrect</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{currentQuestion?.explanation}</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            {!showExplanation ? (
              <Button onClick={submitAnswer} disabled={!currentAnswer}>
                Submit Answer
              </Button>
            ) : (
              <Button onClick={nextQuestion}>
                {currentQuestionIndex < moduleQuestions.length - 1
                  ? 'Next Question'
                  : 'See Results'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
