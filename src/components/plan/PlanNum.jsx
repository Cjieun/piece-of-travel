import {PlanNumBox, PlanNumContainer, PlanNumText, PlanNumTime} from './styles';

export default function PlanNum({children}) {
  return (
    <PlanNumContainer>
      <PlanNumBox>
        <PlanNumText>{children}</PlanNumText>
      </PlanNumBox>
    </PlanNumContainer>
  );
}
