import styled from 'styled-components';

const Container = styled.div`
	background-color: var(--light-seafoam-green);
	padding: 20px;
	margin: 0 auto;
	/* margin-bottom: 20px; */
	border-radius: 30px;
	width: 90%;
	align-items: center;
`;

const Username = styled.div`
	background-color: white;
	border-radius: 10px;
	padding: .25em;
	margin-right: 5px;
	font-weight: bold;
`;

export { Container, Username };