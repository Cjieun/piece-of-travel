import {PlanNumBox, PlanNumContainer, PlanNumText, PlanNumTime} from './styles';

export default function PlanNum({num}) {
  return (
    <PlanNumContainer>
      <PlanNumBox>
        <PlanNumText>{num}</PlanNumText>
      </PlanNumBox>
      <PlanNumTime>오후 1:00</PlanNumTime>
    </PlanNumContainer>
  );
}
