export const MAX_QUESTIONS_PER_GAME = 20;
export const ROPE_LIMIT = 100;

export const getWinnerForRopePosition = (ropePosition) => {
  if (ropePosition < 0) return 'win_red';
  if (ropePosition > 0) return 'win_blue';
  return 'draw';
};

export const resolveGamePhaseAfterRound = ({ nextQuestionsAsked, ropePosition }) => {
  if (ropePosition <= -ROPE_LIMIT) return 'win_red';
  if (ropePosition >= ROPE_LIMIT) return 'win_blue';
  if (nextQuestionsAsked >= MAX_QUESTIONS_PER_GAME) {
    return getWinnerForRopePosition(ropePosition);
  }
  return 'playing';
};
