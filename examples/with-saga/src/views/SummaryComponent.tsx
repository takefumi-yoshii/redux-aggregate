import * as React from 'react'
import { MapState } from './SummaryContainer'
import styled from 'styled-components'

// ______________________________________________________
//
// @ Types

type Props = MapState & { className?: string }

// ______________________________________________________
//
// @ View

const View = (props: Props) => (
  <div className={props.className}>
    <h1>{props.name}</h1>
    <p>{props.timeLabel}</p>
    <p>{props.sumLabel}</p>
  </div>
)

// ______________________________________________________
//
// @ StyledView

export default styled(View)`
  flex: 1 0 auto;
  margin: 10px 20px;
  padding: 20px;
  border-radius: 5px;
  border: 2px solid;
  background-color: ${props => props.styled.bg};
  > h1 {
    margin-bottom: 10px;
    font-size: 2rem;
    font-weight: bolder;
  }
  > p {
    margin-bottom: 10px;
  }
`
