import { createHash } from 'node:crypto';

const hash = createHash('md5')
  .update(
    '1f93adc87385a5ff112d91f7efb58dc6878e42c1a889227b6195767260aefad02cd884d88'
  )
  .digest('hex')
  .toString();

console.log(hash); // hash
