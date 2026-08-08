import { useState, useEffect, useCallback } from 'react';
import { useAudioPlayer } from './hooks/useAudioPlayer';
import { useTimer } from './hooks/useTimer';

const testLoaders = {
  'co-all': () => import('./data/all-unique-co'),
  'ce-all': () => import('./data/all-unique-ce'),
  'co-test-1': () => import('./data/questions'),
  'co-test-2': () => import('./data/questions-test2'),
  'co-test-3': () => import('./data/questions-test3'),
  'co-test-4': () => import('./data/questions-test4'),
  'co-test-5': () => import('./data/questions-test5'),
  'co-test-6': () => import('./data/questions-test6'),
  'co-test-7': () => import('./data/questions-test7'),
  'co-test-8': () => import('./data/questions-test8'),
  'co-test-9': () => import('./data/questions-test9'),
  'co-test-10': () => import('./data/questions-test10'),
  'co-test-11': () => import('./data/questions-test11'),
  'co-test-12': () => import('./data/questions-test12'),
  'co-test-13': () => import('./data/questions-test13'),
  'co-test-14': () => import('./data/questions-test14'),
  'co-test-15': () => import('./data/questions-test15'),
  'co-test-16': () => import('./data/questions-test16'),
  'co-test-17': () => import('./data/questions-test17'),
  'co-test-18': () => import('./data/questions-test18'),
  'co-test-19': () => import('./data/questions-test19'),
  'co-test-20': () => import('./data/questions-test20'),
  'ce-test-1': () => import('./data/questions-ce-test1'),
  'ce-test-2': () => import('./data/questions-ce-test2'),
  'ce-test-3': () => import('./data/questions-ce-test3'),
  'ce-test-4': () => import('./data/questions-ce-test4'),
  'ce-test-5': () => import('./data/questions-ce-test5'),
  'ce-test-6': () => import('./data/questions-ce-test6'),
  'ce-test-7': () => import('./data/questions-ce-test7'),
  'ce-test-8': () => import('./data/questions-ce-test8'),
  'ce-test-9': () => import('./data/questions-ce-test9'),
  'ce-test-10': () => import('./data/questions-ce-test10'),
  'ce-test-11': () => import('./data/questions-ce-test11'),
  'ce-test-12': () => import('./data/questions-ce-test12'),
  'ce-test-13': () => import('./data/questions-ce-test13'),
  'ce-test-14': () => import('./data/questions-ce-test14'),
  'ce-test-15': () => import('./data/questions-ce-test15'),
  'co-test-21': () => import('./data/questions-test21'),
  'co-test-22': () => import('./data/questions-test22'),
  'co-test-23': () => import('./data/questions-test23'),
  'co-test-24': () => import('./data/questions-test24'),
  'co-test-25': () => import('./data/questions-test25'),
  'ce-test-16': () => import('./data/questions-ce-test16'),
  'ce-test-17': () => import('./data/questions-ce-test17'),
  'ce-test-18': () => import('./data/questions-ce-test18'),
  'ce-test-19': () => import('./data/questions-ce-test19'),
  'ce-test-20': () => import('./data/questions-ce-test20'),
  'co-test-26': () => import('./data/questions-test26'),
  'co-test-27': () => import('./data/questions-test27'),
  'co-test-28': () => import('./data/questions-test28'),
  'co-test-29': () => import('./data/questions-test29'),
  'co-test-30': () => import('./data/questions-test30'),
  'ce-test-21': () => import('./data/questions-ce-test21'),
  'ce-test-22': () => import('./data/questions-ce-test22'),
  'ce-test-23': () => import('./data/questions-ce-test23'),
  'ce-test-24': () => import('./data/questions-ce-test24'),
  'ce-test-25': () => import('./data/questions-ce-test25'),
  'co-test-31': () => import('./data/questions-test31'),
  'co-test-32': () => import('./data/questions-test32'),
  'co-test-33': () => import('./data/questions-test33'),
  'co-test-34': () => import('./data/questions-test34'),
  'co-test-35': () => import('./data/questions-test35'),
  'ce-test-26': () => import('./data/questions-ce-test26'),
  'ce-test-27': () => import('./data/questions-ce-test27'),
  'ce-test-28': () => import('./data/questions-ce-test28'),
  'ce-test-29': () => import('./data/questions-ce-test29'),
  'ce-test-30': () => import('./data/questions-ce-test30'),
  'co-test-36': () => import('./data/questions-test36'),
  'co-test-37': () => import('./data/questions-test37'),
  'co-test-38': () => import('./data/questions-test38'),
  'co-test-39': () => import('./data/questions-test39'),
  'co-test-40': () => import('./data/questions-test40'),
  'ce-test-31': () => import('./data/questions-ce-test31'),
  'ce-test-32': () => import('./data/questions-ce-test32'),
  'ce-test-33': () => import('./data/questions-ce-test33'),
  'ce-test-34': () => import('./data/questions-ce-test34'),
  'ce-test-35': () => import('./data/questions-ce-test35'),
  'ce-test-36': () => import('./data/questions-ce-test36'),
  'ce-test-37': () => import('./data/questions-ce-test37'),
  'ce-test-38': () => import('./data/questions-ce-test38'),
  'ce-test-39': () => import('./data/questions-ce-test39'),
  'ce-test-40': () => import('./data/questions-ce-test40'),
};
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import QuestionView from './components/QuestionView';
import ReadingQuestionView from './components/ReadingQuestionView';
import ResultsModal from './components/ResultsModal';
import TestSelection from './components/TestSelection';
import ReviewScreen from './components/ReviewScreen';

export default function App() {
  const [activeTest, setActiveTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [mode, setMode] = useState('training');
  const [showReview, setShowReview] = useState(false);
  const [testData, setTestData] = useState(null);
  const [loadingTest, setLoadingTest] = useState(false);

  const isReadingTest = activeTest?.startsWith('ce-');
  const timerSeconds = isReadingTest ? 60 * 60 : 35 * 60;
  const timer = useTimer(timerSeconds);
  const audio = useAudioPlayer();

  // Load test data dynamically when activeTest changes
  useEffect(() => {
    if (activeTest && testLoaders[activeTest]) {
      setLoadingTest(true);
      testLoaders[activeTest]().then(module => {
        const keys = Object.keys(module);
        const questionsKey = keys.find(k => k.startsWith('questions'));
        const sectionsKey = keys.find(k => k.startsWith('sections'));
        setTestData({ questions: module[questionsKey], sections: module[sectionsKey] });
        setLoadingTest(false);
      });
    } else {
      setTestData(null);
    }
  }, [activeTest]);

  const activeQuestions = testData?.questions || [];
  const activeSections = testData?.sections || [];
  const question = activeQuestions.find((q) => q.id === currentQuestion);

  // Load audio when question changes (listening tests only)
  useEffect(() => {
    if (!isReadingTest && question?.audio) {
      audio.loadSrc(question.audio);
    }
  }, [currentQuestion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-submit when timer expires
  useEffect(() => {
    if (timer.isExpired) {
      setShowResults(true);
    }
  }, [timer.isExpired]);

  const goTo = useCallback((id) => {
    if (id >= 1 && id <= activeQuestions.length) {
      setCurrentQuestion(id);
    }
  }, [activeQuestions.length]);

  const goNext = useCallback(() => goTo(currentQuestion + 1), [currentQuestion, goTo]);
  const goPrev = useCallback(() => goTo(currentQuestion - 1), [currentQuestion, goTo]);

  const selectAnswer = useCallback((optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  }, [currentQuestion]);

  const toggleFlag = useCallback(() => {
    setFlagged((prev) =>
      prev.includes(currentQuestion)
        ? prev.filter((id) => id !== currentQuestion)
        : [...prev, currentQuestion]
    );
  }, [currentQuestion]);

  const handleSubmit = useCallback(() => {
    audio.stop();
    setShowResults(true);
  }, [audio]);

  const handleRestart = useCallback(() => {
    setAnswers({});
    setFlagged([]);
    setCurrentQuestion(1);
    setShowResults(false);
    setShowReview(false);
    setActiveTest(null);
    window.history.pushState(null, '', window.location.pathname);
  }, []);

  const handleGoHome = useCallback(() => {
    if (Object.keys(answers).length > 0) {
      if (!confirm('Quitter le test ? Votre progression sera perdue.')) return;
    }
    audio.stop();
    handleRestart();
  }, [answers, audio, handleRestart]);

  const handleReview = useCallback(() => {
    setShowResults(false);
    setShowReview(true);
  }, []);

  const handleBackFromReview = useCallback(() => {
    setShowReview(false);
  }, []);

  const handleGoToQuestionFromReview = useCallback((qId) => {
    setCurrentQuestion(qId);
    setShowReview(false);
    setShowResults(false);
  }, []);

  const handleStartTest = useCallback((testId, testMode) => {
    setActiveTest(testId);
    setMode(testMode || 'training');
    setCurrentQuestion(1);
    setAnswers({});
    setFlagged([]);
    setShowResults(false);
    setShowReview(false);
    window.history.pushState({ test: testId }, '', window.location.pathname);
  }, []);

  // Browser back button support
  useEffect(() => {
    const handlePopState = () => {
      if (activeTest) {
        audio.stop();
        setAnswers({});
        setFlagged([]);
        setCurrentQuestion(1);
        setShowResults(false);
        setShowReview(false);
        setActiveTest(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [activeTest, audio]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (showResults) return;
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (mode !== 'exam') goPrev();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          e.preventDefault();
          selectAnswer(parseInt(e.key) - 1);
          break;
        case ' ':
          e.preventDefault();
          if (!isReadingTest) audio.toggle();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [showResults, goNext, goPrev, selectAnswer, audio, mode]);

  return (
    <>
      {!activeTest ? (
        <TestSelection onStartTest={handleStartTest} />
      ) : loadingTest ? (
        <div className="app-layout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
            <p>Chargement du test...</p>
          </div>
        </div>
      ) : showReview ? (
        <ReviewScreen
          questions={activeQuestions}
          answers={answers}
          onBack={handleBackFromReview}
          onFinish={handleRestart}
          onGoToQuestion={handleGoToQuestionFromReview}
        />
      ) : (
        <div className="app-layout">
          <Sidebar
            questions={activeQuestions}
            sections={activeSections}
            currentQuestion={currentQuestion}
            answers={answers}
            flagged={flagged}
            onSelect={goTo}
          />

          <div className="main-content">
            <Header timer={timer} onSubmit={handleSubmit} onGoHome={handleGoHome} isReadingTest={isReadingTest} />

            {question && !isReadingTest && (
              <QuestionView
                question={question}
                selectedAnswer={answers[currentQuestion]}
                isFlagged={flagged.includes(currentQuestion)}
                onSelectAnswer={selectAnswer}
                onToggleFlag={toggleFlag}
                onPrev={goPrev}
                onNext={goNext}
                audio={audio}
                totalQuestions={activeQuestions.length}
                mode={mode}
              />
            )}

            {question && isReadingTest && (
              <ReadingQuestionView
                question={question}
                selectedAnswer={answers[currentQuestion]}
                isFlagged={flagged.includes(currentQuestion)}
                onSelectAnswer={selectAnswer}
                onToggleFlag={toggleFlag}
                onPrev={goPrev}
                onNext={goNext}
                totalQuestions={activeQuestions.length}
                mode={mode}
              />
            )}
          </div>

          {showResults && (
            <ResultsModal
              questions={activeQuestions}
              answers={answers}
              totalQuestions={activeQuestions.length}
              onRestart={handleRestart}
              onReview={handleReview}
            />
          )}
        </div>
      )}
    </>
  );
}
