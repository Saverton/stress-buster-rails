import stressBuster from "../assets/stress-busters.png";
import styled from 'styled-components';
import { Button } from '../styled-components/Buttons';
import { useLongPress } from "use-long-press";
import {useState, useRef} from "react"

const ResourceButton = styled(Button)`
  font: inherit;
  color: white;
  padding: 0.3rem;
  border-radius: 10px;
  min-width: 70%;

  &:hover {
    background-color: white;
    color: #0FF;
    box-shadow: 0px 0px 2px 2px rgb(255, 255, 255);
  }
`;

const ResourceSection = styled.section`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  min-width: 25%;
  max-width: 25%;
  padding-top: 1rem 0;
  color: white;
  background-color: var(--grey-blue);
`;

const ResourceImage = styled.img`
  max-width: 85%;
  margin-top: 2rem;
  border-radius: 10px;
`;

function Resources() {
  const timer = useRef(undefined)
  const [samhsaCount, setSamhsaCount] = useState(undefined)
  const [crisisCount, setCrisisCount] = useState(undefined)

  const resetTimer = () => {
    setSamhsaCount(undefined);
    setCrisisCount(undefined);
    clearInterval(timer.current)
  }

  const longPressCallback = () => {
    resetTimer();
    console.log("finished")
  }



  const bind1 = useLongPress(longPressCallback, {
    onStart: _ => {
      setSamhsaCount(3);
			timer.current = setInterval(() => {
				setSamhsaCount(samhsaCount => samhsaCount - 1);
			}, 1000);
		},
		onFinish: resetTimer,
		onCancel: resetTimer,
		threshold: 3000,
		captureEvent: true,
		cancelOnMovement: false,
		detect: 'both',
  })

  const bind2 = useLongPress(longPressCallback, {
    onStart: _ => {
      setCrisisCount(3);
			timer.current = setInterval(() => {
				setCrisisCount(crisisCount => crisisCount - 1);
			}, 1000);
		},
		onFinish: resetTimer,
		onCancel: resetTimer,
		threshold: 3000,
		captureEvent: true,
		cancelOnMovement: false,
		detect: 'both',
  })


  return (
    <ResourceSection className="center flex column">
      <h4><b><em>Resources</em></b></h4>
      <a 
        href="https://www.acesaware.org/wp-content/uploads/2020/12/Roadmap-For-Resilience_CA-Surgeon-Generals-Report-on-ACEs-Toxic-Stress-and-Health.pdf" 
        target="_blank"
        rel='noreferrer'
      >
        <ResourceImage 
          src={stressBuster} 
          alt="Stress Busters" 
          id="resource-image"
        />
      </a>
      <p><em>Professional or Community Resources</em></p>
      <p>Get Local Referrals: </p>
      <a {...bind1()}  href="tel:+1-800-662-4357">
        <ResourceButton  style={{backgroundColor: 'var(--dark-green)'}}>{samhsaCount ? `Calling in ${samhsaCount}` : "SAMHSA's National Helpline"}</ResourceButton>    
      </a>
      <p>Help is Always Available:</p>
      <a href="tel:988">
        <ResourceButton {...bind2()} style={{backgroundColor: 'var(--wine-purple)'}}>{crisisCount ? `Calling in ${crisisCount}` : "988 Suicide & Crisis Lifeline"}</ResourceButton>
      </a>
    </ResourceSection>
  );
}

export default Resources;

//SAMSHA "tel:+1-800-662-4357"
//CRISIS "tel:988"