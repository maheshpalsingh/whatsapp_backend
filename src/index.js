const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const { getChannels,getChannelsMessage,sendMessage } = require('../handlers/channels')
app.get('/channels', getChannels);
// app.get('/channels/messages', getChannelsMessage);

app.post('/sendmessages',sendMessage );


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server is up on ${port} port`);
});
