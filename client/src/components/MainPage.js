import Dashboard from "./Dashboard";
import Resources from "./Resources";
import RandomQuote from "./RandomQuote";
import styled from "styled-components";
import { PageTitle } from "../styled-components/Title";

const DashboardContainer = styled.div`
  border-radius: 5px;
  margin: 20px;
  color: #FFF;

  @media (max-width: 500px) {
    margin: 0.5rem;
  }
`;

const Section = styled.section`
  border: 1px solid #000;
  border-radius: 0 5px 5px 0;
  justify-content: space-between
`;

const QuoteSection = styled.section`
  margin-top: 5%;
  padding: 1rem 0;
  border-top: 1px solid;
  background-color: var(--light-green); 
  border-bottom-right-radius: 5px;
`;

function MainPage ({ randomQuote }){
  return (
    <>
      <PageTitle>Home Page</PageTitle>
      <DashboardContainer className="flex row">
        <Resources />
        <Section className="flex column">
          <Dashboard />
          <QuoteSection className="center">
            <RandomQuote randomQuote={randomQuote} />
          </QuoteSection>
        </Section>         
      </DashboardContainer>
    </>
  );
}

export default MainPage;
