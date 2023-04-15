import React from 'react'
import {
  Box,
  Container,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

function Footer(){
  return (
    <Box>
      <h1 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "-50px",
                   marginLeft: "0px",
                   width: "90%",
                   padding: "10px"
                   }}>
        Project Zephyrus
      </h1>
      <Container>
        {/* <Row> */}
          <Column>
            <Heading>GitHub Repo Link</Heading>
            <FooterLink href="https://github.com/tarmacjupiter/zephyrus">
              https://github.com/tarmacjupiter/zephyrus
            </FooterLink>
          </Column>
        {/* </Row> */}
      </Container>
    </Box>
  );
}

export default Footer;
