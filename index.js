const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline')

 // Replace 'COM1' with your serial port path
const SERIAL_PORT = 'COM1';
const BAUD_RATE = 9600;
const DATA_BITS = 8;
const STOP_BITS = 1;

const port = new SerialPort({ 
  path: SERIAL_PORT,
  baudRate: BAUD_RATE,
  dataBits: DATA_BITS,
  stopBits: STOP_BITS,
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => {
  console.log('Serial port is open');

  parser.on('data', (data) => {
    console.log('Received data:', data);
  });

  // Send data to the serial port
  port.write('Hello, Serial Port!');
});

port.on('error', (err) => {
  console.error('Error:', err.message);
});
