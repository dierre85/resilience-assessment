import React from 'react';
import { Radar } from 'react-chartjs-2';
import { getMaturityLevel } from './weightedScoring';
//import { Card, CardHeader, CardContent, Typography, Button } from '@/components/ui/card';
import { Card, CardHeader, CardContent, Typography, Button } from '@mui/material';

const ResultsVisualization = ({ scores }) => {
  const data = {
    labels: Object.keys(scores),
    datasets: [{
      label: 'Resilience Scores',
      data: Object.values(scores),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
    }]
  };

  const options = {
    scale: {
      ticks: { beginAtZero: true, max: 5 }
    }
  };

  const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length;
  const maturityLevel = getMaturityLevel(overallScore);

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <Typography variant="h5" className="text-center">Your Resilience Assessment Results</Typography>
      </CardHeader>
      <CardContent>
        <Radar data={data} options={options} />
        <Typography variant="h6" className="mt-4">Overall Maturity Level: {maturityLevel}</Typography>
        <Typography variant="subtitle1" className="mt-2">
          Strengths: {Object.entries(scores).filter(([_, score]) => score > 3.5).map(([dim]) => dim).join(', ')}
        </Typography>
        <Typography variant="subtitle1" className="mt-2">
          Areas for Improvement: {Object.entries(scores).filter(([_, score]) => score <= 3.5).map(([dim]) => dim).join(', ')}
        </Typography>
        <Button className="mt-4" variant="contained" color="primary">
          Get Detailed Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResultsVisualization;
