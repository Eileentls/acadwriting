import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import shouldUpdate from '../../../../lib/shouldUpdate';
import { LinkButton } from '../../../../components/button';

const Container = styled.div`
  height: calc(100vh - 3rem);
  overflow: auto;
  padding: 1rem;
`;

const MatchGroup = styled.div`
  margin: 1rem 0;
`;

const StyledMatch = styled.div`
  margin: 1rem 0;
`;

const Match = ({ matched, moves, steps, markers }) => {
  const { markerId, stepId, moveId } = matched;
  return (
    <StyledMatch>
      <div>move: {moves[moveId].label}</div>
      <div>step: {steps[stepId].label}</div>
      <div>pattern: {markers[markerId].label}</div>
    </StyledMatch>
  );
};

export default class SentenceAnalysis extends Component {
  shouldComponentUpdate(nextProps) {
    return shouldUpdate([
      'analysisSentenceId', 'analysis', 'sectionId', 'moves', 'steps', 'markers',
    ], this.props, nextProps);
  }

  render() {
    const {
      analysisSentenceId,
      analysis,
      sectionId,
      moves,
      steps,
      markers,
    } = this.props;

    const matches = analysis[sectionId].sentences[analysisSentenceId];

    return (
      <Container>
        <LinkButton onClick={this.back}>Back to overview</LinkButton>
        {
          matches && matches.length ?
            <MatchGroup>
              {matches.map((match, index) => (
                <Match 
                  key={index}
                  matched={match} 
                  moves={moves}
                  steps={steps}
                  markers={markers}
                />
              ))}
            </MatchGroup>
            : <MatchGroup>No matches</MatchGroup>
        }
      </Container>
    );
  }

  back = () => {
    this.props.setAnalysisFlag(1);
  }
}
