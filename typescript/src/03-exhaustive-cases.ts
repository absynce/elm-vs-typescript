type LogLevel =
   'Error' |
   'Info'

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function log(logLevel: LogLevel, message: string) {
   switch (logLevel) {
      case 'Error':
         return 'Error: ' + message;
      case 'Info':
         return 'Info: ' + message;
      default: return assertNever(logLevel); // error here if there are missing cases
   }
}

console.log(log('Error', 'Failed to stop Dr. Kronish!'));
