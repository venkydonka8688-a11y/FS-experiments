const os = require("os");
const path = require("path");
const dns = require("dns");
const net = require("net");
const readline = require("readline");

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// -------- OS MODULE --------

console.log("===== SYSTEM INFORMATION =====");

console.log("Operating System:", os.platform());
console.log("CPU Architecture:", os.arch());
console.log("CPU Information:", os.cpus());
console.log("Total Memory:", os.totalmem());
console.log("Free Memory:", os.freemem());


// -------- PATH MODULE --------

rl.question("\nEnter a file path: ", function(filePath) {

    console.log("\n===== PATH INFORMATION =====");

    console.log("Directory Name:", path.dirname(filePath));
    console.log("File Name:", path.basename(filePath));
    console.log("Extension:", path.extname(filePath));
    console.log("Normalized Path:", path.normalize(filePath));


    // -------- DNS MODULE --------

    rl.question("\nEnter a domain name: ", function(domain) {

        console.log("\n===== DNS INFORMATION =====");

        dns.lookup(domain, function(error, address) {

            if (error) {
                console.log("DNS Error:", error.message);
            }
            else {
                console.log("Domain:", domain);
                console.log("IP Address:", address);
            }


            // -------- NET MODULE --------

            console.log("\n===== TCP SERVER =====");

            const server = net.createServer(function(socket) {

                console.log("Client connected!");

                socket.write("Welcome to the Node.js TCP Server!");

                socket.on("end", function() {
                    console.log("Client disconnected.");
                });
            });

            server.listen(3000, function() {
                console.log("TCP Server is running on port 3000");
            });

        });
    });
});