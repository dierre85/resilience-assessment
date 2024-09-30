import React, { useState } from 'react';
import Questionnaire from './Questionnaire';
import ResultsVisualization from './ResultsVisualization';
import { questionnaireData } from './data';
import { calculateScores } from './weightedScoring';

const App = () => {
  const [step, setStep] = useState('intro');
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({});
  console.log(questionnaireData);
  const handleComplete = (answers) => {
    setAnswers(answers);
    const calculatedScores = calculateScores(answers, questionnaireData);
    setScores(calculatedScores);
    setStep('results');
  };

  return (
    <div className="container mx-auto p-4">
      {step === 'intro' && (
        <div>
          <h1 className="text-2xl font-bold mb-4">Resilience Operational Assessment</h1>
          <p className="mb-4">Welcome to the assessment. This will take approximately 30-40 minutes to complete.</p>
          <button onClick={() => setStep('questionnaire')} className="bg-blue-500 text-white px-4 py-2 rounded">
            Start Assessment
          </button>
        </div>
      )}
      {step === 'questionnaire' && <Questionnaire data={questionnaireData} onComplete={handleComplete} />}
      {step === 'results' && <ResultsVisualization scores={scores} />}
    </div>
  );
};

export default App;
