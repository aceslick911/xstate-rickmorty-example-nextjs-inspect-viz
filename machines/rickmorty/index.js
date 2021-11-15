import { Machine, assign } from "xstate";

// form with one input and one button
// enter character name and get a bunch of chars
// states: ready, enteringName, searching, displayResults, noResults, error
// transistions are UPPERCASE and will the events we send to the machine to make states change
const config = {
  id: "charSearch",
  context: {
    name: "",
    results: [],
    msg: "ready",
    info: {},
  },
  initial: "ready",
  states: {
    ready: {
      on: {
        INPUT_NAME: {
          actions: assign((ctx, evt) => ({
            name: evt.name,
            msg: "got name",
          })),
        },
        SUBMIT: {
          target: "searching",
        },
      },
    },
    // 400 status from service
    error: {
      on: {
        // if in error state, and the input name transistion is triggered, machine will go to ready state
        INPUT_NAME: {
          target: "ready",
        },
        // if in error state and submit transistion triggered, machine will go to searching state
        SUBMIT: {
          target: "searching",
        },
      },
      // sub state for errors that can occur
      states: {
        tooManyRequests: {},
        notWorking: {},
        invalidCharName: {},
      },
    },
    // 200 status but no chars returned
    noResults: {},
    // waiting for response
    searching: {
      // allows us to declare a promise and then transition to different states depending on promise response
      invoke: {
        id: "getChar",
        // name of service
        src: "getCharacter",
        onDone: {
          target: "success",
          actions: assign({
            results: (ctx, evt) => {
              console.log(ctx, evt);
              return evt.data.results;
            },
            info: (ctx, evt) => evt.data.info,
            msg: "searching",
          }),
        },
        onError: {
          target: "error",
          actions: assign({ msg: "error" }),
        },
        // guards and targets for all errors
        // onError: [
        //   {
        //     // name of guard
        //     cond: 'isServiceErr',
        //     target: 'error'
        //   },
        //   {
        //     // not sure how to do this guard since its a 200
        //     cond: 'isNoResults',
        //     target: 'noResults'
        //   }
        // ]
      },
    },
    // 200 and results from service
    success: {
      // final state
      // type: 'final',
      actions: assign({ msg: "done" }),
    },
  },
};

// where all your functions are held, the names will correspond to cond and actions in the config
const options = {
  guards: {},
  actions: {
    showResults: (ctx, evt) => console.log("done", ctx),
  },
  services: {
    getCharacter: (ctx, evt) =>
      fetch(`https://rickandmortyapi.com/api/character/?name=${ctx.name}`).then(
        (res) => res.json()
      ),
  },
  devTools: true,
};

export default { config, options };
