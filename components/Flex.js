import { Flex as Base } from "rebass/styled-components";
import styled from "styled-components";

const Flex = styled(Base)`
  ${(props) => (props.boxShadow ? `box-shadow: ${props.boxShadow};` : null)}
  ${(props) => (props.height ? `height: ${props.height};` : null)}
  ${(props) =>
    props.center ? `justify-content: center; align-items: center;` : null}
  ${(props) => (props.border ? `border: ${props.border};` : null)}
`;

const Flexed = (props) => <Flex {...props}>{props.children}</Flex>;

export default Flexed;
