const STD_MESSAGES = {
  UNEXPECTED: (operation = '') => `Something went wrong${
    operation === '' ? '' : ` while ${operation}`
  }. Please contact the support for help if the
   problem persists.`,
};
export default STD_MESSAGES;
