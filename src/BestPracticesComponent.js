import React, { useState } from 'react';
import { Card, CardContent, Typography, RadioGroup, FormControlLabel, Radio, Button } from '@/components/ui/card';

const Questionnaire = ({ data, onComplete }) => {
  const [answers, setAnswers] = useState({});
  const [currentDimension, setCurrentDimension] = useState(0);
  const [currentCapability, setCurrentCapability] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [data[currentDimension].capabilities[currentCapability].questions[currentQuestion].id]: value
    });
  };

  const nextQuestion = () => {
    const currentDim = data[currentDimension];
    const currentCap = currentDim.capabilities[currentCapability];

    if (currentQuestion < currentCap.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (currentCapability < currentDim.capabilities.length - 1) {
      setCurrentCapability(currentCapability + 1);
      setCurrentQuestion(0);
    } else if (currentDimension < data.length - 1) {
      setCurrentDimension(currentDimension + 1);
      setCurrentCapability(0);
      setCurrentQuestion(0);
    } else {
      onComplete(answers);
    }
  };

  const currentQ = data[currentDimension].capabilities[currentCapability].questions[currentQuestion];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{data[currentDimension].dimension}</Typography>
        <Typography variant="subtitle1">{data[currentDimension].capabilities[currentCapability].name}</Typography>
        <Typography>{currentQ.text}</Typography>
        <RadioGroup onChange={(e) => handleAnswer(parseInt(e.target.value))}>
          {[1, 2, 3, 4, 5].map((value) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={value.toString()} />
          ))}
        </RadioGroup>
        <Button onClick={nextQuestion}>Next</Button>
      </CardContent>
    </Card>
  );
};

export default Questionnaire;
