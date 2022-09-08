import React from "react";
import { Container, Header } from "semantic-ui-react";

import Examples from "./Examples";

export default function App() {
  return (
    <Container text>
      <Header content="Examples" />
      <Examples />
    </Container>
  );
}
