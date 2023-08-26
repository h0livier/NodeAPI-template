import Application from "./application";
import * as http from 'http';

const application = new Application();

const PORT = process.env.PORT || 3000;
const server = http.createServer(application.instance);

server.listen(PORT, () => {
    console.log("Successfully started Server")
    console.log("\tListening on port: "+ PORT);
});