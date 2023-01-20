import React from 'react';
import styled from 'styled-components';
import { PageTitle } from '../styled-components/Title';
import github from "../assets/GitHub-logo.png"
import linkedin from "../assets/LI-In-Bug.png"
import instagram from "../assets/Instagram-Logo.png"



const SectionHeader = styled.h2`
color: white;
margin-left: 4rem;
padding-top: 1rem
`
const AuthorContainer = styled.section`
background-color: var(--grey-blue);
padding: 0 0 2rem;
margin: 1rem;
border-radius: 10px
`
const AuthorSection =styled.ul`
display: flex;
flex-direction: row;
justify-content: space-around;
margin-right: 2rem;
list-style: none
`

const AuthorCard = styled.li`
background-color: white;
min-width: 14rem;
border-radius: 10px
`

const AuthorName = styled.h3`
margin-left: 15px
`

const Logos = styled.img`
max-height: 3rem;
padding:
`

const Disclaimer = styled.section`
background-color: var(--burnt-orange);
padding: 0 0 2rem;
margin: 1rem;
border-radius: 10px
`
const DisclaimerContainer =styled.div`
background-color: white;
margin: 0 3rem;
border-radius: 5px;
padding: 1px 1.5rem
`

const DisclaimerText = styled.p`
`

function About(){



return (
    <div>
        <PageTitle>About</PageTitle> 
        <AuthorContainer>
        <SectionHeader>Authors</SectionHeader>
        <AuthorSection >
                <AuthorCard>
                    <AuthorName>Ana Rosario</AuthorName>
                    <a href="https://github.com/avros16" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={github} alt="GitHub Logo" ></Logos>
                    </a>
                    <a href="https://www.linkedin.com/in/ana-rosario-se/" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={linkedin} alt="Linkedin Logo"></Logos>
                    </a>
                </AuthorCard>
                <AuthorCard>
                    <AuthorName>Daniel Clements</AuthorName>
                    <a href="https://github.com/drclements" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={github} alt="GitHub Logo" ></Logos>
                    </a>
                    <a href="https://www.linkedin.com/in/daniel-clements-codes/" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={linkedin} alt="Linkedin Logo"></Logos>
                    </a>
                    <a href="https://www.instagram.com/drclements/" 
                        target="_blank"
                        rel='noreferrer'>
                    <Logos src={instagram} alt="Linkedin Logo"></Logos>
                    </a> 
                </AuthorCard>
                <AuthorCard>
                    <AuthorName>Scott Meadows</AuthorName>
                    <a href="https://github.com/saverton" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={github} alt="GitHub Logo" ></Logos>
                    </a>
                    <a href="https://www.linkedin.com/in/scottmeadows-se/" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={linkedin} alt="Linkedin Logo"></Logos>
                    </a>
                </AuthorCard>
                <AuthorCard>
                    <AuthorName>Timmy Yan</AuthorName>
                    <a href="https://github.com/timmyyan-git" 
                        target="_blank"
                        rel='noreferrer'>
                        <Logos src={github} alt="GitHub Logo"></Logos>
                    </a>
                </AuthorCard>
        </AuthorSection>
        </AuthorContainer>
        <Disclaimer>
            <SectionHeader>Terms of Use</SectionHeader>
            <DisclaimerContainer>
                <DisclaimerText>Thank you for your interest in our app! We hope you have a great experience utilizing our app and find it useful as you track your personal stress busting journey. Please note that this application is a learning project of a group of students (named above) as part of the Flatiron School Software Engineering program. This app is free to use and not built for the purpose of monetary gains.</DisclaimerText>
                <DisclaimerText>Be aware that, as of now, this app is <em>not</em> HIPAA compliant and should not be used in a professional/client relationship bound by HIPAA regulations. If you so choose to use this app, do so knowing that your journal entries may not be housed on a private database. As we continue to build out the app, we intend to add user authentication and client data handling that meet these rigorous standards.</DisclaimerText>
                <DisclaimerText>Lastly, we are grateful for the free use of the logo image <a href="http://www.freepik.com">designed by pikisuperstar / Freepik</a> under their free license agreement.</DisclaimerText>
            </DisclaimerContainer>
        </Disclaimer>
    </div>
)



}

export default About