import React, { Component } from 'react';
import styled from 'styled-components';

import ContentEditable from '../../../components/content-editable';

const Container = styled.div`
  position: relative;
  min-height: 5rem;
  outline: none;
  border: none;
  font-size: 1.125rem;
  color: #312b38;
  line-height: 2rem;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;

  & p {
    margin: 0;
    padding: 0;
  }
`;

const P = styled(ContentEditable)`
  position: relative;
  min-height: 200px;
  outline: none;
  border: none;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  color: #908d94;
  pointer-events: none;
  user-select: none;
`;

export default class Section extends Component {
  render() {
    const { 
      placeHolder = '',
      document = {},
    } = this.props;

    const { introduction, litreview, section } = document;

    const input = section === 1 ? introduction : litreview;

    return (
      <Container>
        <P 
          html={input}
          onChange={this.emitChange}
        />
        { 
          input ? null
            : <Placeholder>{placeHolder}</Placeholder>
        }
      </Container>
    );
  }

  emitChange = e => {
    const section = this.props.document.section;

    if(section === 1) {
      this.props.inputDocumentIntro(e.target.value);
    } else if(section === 2) {
      this.props.inputDocumentLitreview(e.target.value);
    }
  }
}
