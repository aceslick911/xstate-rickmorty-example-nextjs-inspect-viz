import { Box } from "rebass/styled-components";
import { Label, Input } from "@rebass/forms";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import { useState } from "react";

import Flex from "../components/Flex";
import Button from "../components/Button";
import { options, loginMachineConfig } from "../machines/login/machine";

const Index = () => {
  const loginMachine = Machine(loginMachineConfig);
  const [current, send] = useMachine(loginMachine, options);
  return (
    <Flex center height="100vh">
      <Box py={3}>
        <Flex mx={-2} mb={3}>
          <Box width={1 / 2} px={2}>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              defaultValue=""
              onChange={(e) =>
                send({ type: "INPUT_EMAIL", email: e.target.value })
              }
            />
          </Box>
          <Box width={1 / 2} px={2}>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              defaultValue=""
              onChange={(e) =>
                send({ type: "INPUT_PASSWORD", password: e.target.value })
              }
            />
          </Box>
        </Flex>
        <Flex mx={-2} flexWrap="wrap">
          <Box px={2} ml="auto">
            <Button
              variant="grey"
              onClick={() => send({ type: "SUBMIT", msg: "sending name" })}
            >
              Log In
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Index;
