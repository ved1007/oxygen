const caps = require('../assets/caps');
mob.init(caps);
mob.setTimeout(6000);
mob.open("https://www.wikipedia.org");
const capabilities = mob.getCapabilities();
const capsValid = !!capabilities && !!capabilities.aaa && !!capabilities.bb;
assert.equal(capsValid, true, 'Caps not valid');