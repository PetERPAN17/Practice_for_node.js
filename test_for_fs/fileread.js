const fs = require('fs');
fs.readFile('test_for_fs/sampletext', 'utf-8', (err, data) => {
    if (err) throw err;
    console.log(data);
});