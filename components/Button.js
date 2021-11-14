import { Button as Base } from "rebass/styled-components";
import styled from "styled-components";

const Button = styled(Base)`
  ${(props) => (props.cursor ? `cursor: ${props.cursor}` : null)}
`;
const ButtonComp = (props) => <Button {...props}>{props.children}</Button>;

export default ButtonComp;
