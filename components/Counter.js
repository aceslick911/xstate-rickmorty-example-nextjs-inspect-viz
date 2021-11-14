import { Machine, assign } from "xstate";
import { useMachine } from "@xstate/react";
import { Box } from "rebass/styled-components";

import Button from "./Button";

import { inspect } from "@xstate/inspect";

const increment = (context) => context.count + 1;
const decrement = (context) => context.count - 1;

const counter = {
  initial: "active",
  context: {
    count: 0,
  },
  states: {
    active: {
      on: {
        INC: { actions: assign({ count: increment }) },
        DEC: { actions: assign({ count: decrement }) },
      },
    },
  },
};

const CounterMachine = (props) => {
  const counterMachine = Machine(counter);
  const [current, send] = useMachine(counterMachine, { devTools: true });
  return (
    <Box>
      {current.context.count}
      <Button variant="grey" onClick={() => send("INC")}>
        +
      </Button>
      <Button variant="grey" onClick={() => send("DEC")}>
        -
      </Button>
    </Box>
  );
};

export default CounterMachine;
