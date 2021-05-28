const StdMessages = {
  CONTACT_SUPPORT:
    'Please contact the support for help if the problem persists.',
  UNEXPECTED: (operation = '') =>
    `Something went wrong${operation === '' ? '' : ` while ${operation}`}. ${
      StdMessages.CONTACT_SUPPORT
    }`,
  NETWORK_ERROR: (operation = '') =>
    `The communication with the server failed${
      operation === '' ? '' : ` while ${operation}`
    }. Check your internet connection.`,
  IMPORT_ERROR: (filename, reason = undefined) =>
    `Could not import file '${filename}'!${reason ? ` ${reason}` : ''}`,
};
export default StdMessages;
