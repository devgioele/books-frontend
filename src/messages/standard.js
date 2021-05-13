const StdMessages = {
  UNEXPECTED: (operation = '') => `Something went wrong${
    operation === '' ? '' : ` while ${operation}`
  }. Please contact the support for help if the
   problem persists.`,
  NETWORK_ERROR: (operation = '') =>
    `The communication with the server failed${
      operation === '' ? '' : ` while ${operation}`
    }. Check your internet connection.`,
};
export default StdMessages;
