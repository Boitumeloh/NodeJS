//require messagesmodule (we can access the array)
const messageModule = require("./messages");
messageModule.messages.forEach(m => 
    console.log(m)
);