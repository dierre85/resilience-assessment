const calculateScores = (answers, data) => {
    const scores = {};
  
    data.forEach(dimension => {
      let dimensionScore = 0;
      let dimensionWeight = 0;
  
      dimension.capabilities.forEach(capability => {
        capability.questions.forEach(question => {
          if (answers[question.id]) {
            dimensionScore += answers[question.id] * question.weight;
            dimensionWeight += question.weight;
          }
        });
      });
  
      scores[dimension.dimension] = dimensionWeight > 0 ? dimensionScore / dimensionWeight : 0;
    });
  
    return scores;
  };
  
  const getMaturityLevel = (score) => {
    if (score < 1.5) return "Iniziale";
    if (score < 2.5) return "Ripetibile";
    if (score < 3.5) return "Definito";
    if (score < 4.5) return "Gestito";
    return "Ottimizzato";
  };