const axios = require('axios');
axios.post('http://localhost:8000/generate_boilerplates', {
    title: 'Two Sum',
    description: 'Find two numbers that add up to target'
}).then(r => {
    console.log('SUCCESS');
    console.log(JSON.stringify(r.data, null, 2));
    process.exit(0);
}).catch(e => {
    console.error('FAILED');
    console.error(e.message);
    process.exit(1);
});
