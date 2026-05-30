import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  MAX_QUESTIONS_PER_GAME,
  getWinnerForRopePosition,
  resolveGamePhaseAfterRound,
} from './gameRules.js';

describe('tug of war game rules', () => {
  it('uses 20 questions as the game limit', () => {
    assert.equal(MAX_QUESTIONS_PER_GAME, 20);
  });

  it('does not end by score before the question limit', () => {
    assert.equal(
      resolveGamePhaseAfterRound({
        nextQuestionsAsked: 5,
        ropePosition: -40,
      }),
      'playing',
    );
  });

  it('decides the winner by rope position after 20 questions', () => {
    assert.equal(
      resolveGamePhaseAfterRound({
        nextQuestionsAsked: 20,
        ropePosition: -1,
      }),
      'win_red',
    );
    assert.equal(
      resolveGamePhaseAfterRound({
        nextQuestionsAsked: 20,
        ropePosition: 1,
      }),
      'win_blue',
    );
  });

  it('can finish immediately if the rope reaches a boundary', () => {
    assert.equal(
      resolveGamePhaseAfterRound({
        nextQuestionsAsked: 7,
        ropePosition: -100,
      }),
      'win_red',
    );
    assert.equal(
      resolveGamePhaseAfterRound({
        nextQuestionsAsked: 7,
        ropePosition: 100,
      }),
      'win_blue',
    );
  });

  it('returns draw when the final rope position is centered', () => {
    assert.equal(getWinnerForRopePosition(0), 'draw');
    assert.equal(
      resolveGamePhaseAfterRound({
        nextQuestionsAsked: 20,
        ropePosition: 0,
      }),
      'draw',
    );
  });
});
