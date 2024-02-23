const { SerialPort } = require('serialport');
const Readline = require('@serialport/parser-readline');

 // Replace 'COM1' with your serial port path
const SERIAL_PORT = 'COM1';
const BAUD_RATE = 9600;

const port = new SerialPort(
        SERIAL_PORT, 
        { baudRate: BAUD_RATE }
    );

const parser = port.pipe(new Readline({ delimiter: '\n' }));

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
