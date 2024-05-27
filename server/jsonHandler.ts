import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'data.json');

interface Data {
  users: any[];
  newsletters: any[];
}

const readData = (): Data => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const writeData = (data: Data): void => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export { readData, writeData };
