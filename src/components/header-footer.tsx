import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const HeaderTitle = styled.header`
    font-weight: 600;
`;

export const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        <HeaderTitle>Grid MC | Punishment Table</HeaderTitle>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </header>
    );
};

export const Footer = () => {
    return <footer></footer>;
};
