type LogLevel =
   'Error' |
   'Info' |
   'Warning'

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

function log(logLevel: LogLevel, message: string) {
   switch (logLevel) {
      case 'Error':
         return 'Error: ' + message;
      case 'Info':
         return 'Info: ' + message;
      // case 'Warning':
      //    return 'Warning: ' + message;
      default: return assertNever(logLevel); // error here if there are missing cases
   }
}

console.log(log('Warning', 'Low on Cameronium.'));
