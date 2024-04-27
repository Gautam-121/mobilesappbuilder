require("@shopify/shopify-api/adapters/node");
const setupCheck = require("./utils/setupCheck.js");
const applyAuthMiddleware = require("./middleware/auth.middleware.js");
const webhookRegistrar = require("./webhooks/index.js");
const payloadConnection = require("./db/index.js")
const app = require("./app.js")

require("events").EventEmitter.prototype._maxListeners = 70;
const PORT = parseInt(process.env.PORT, 10) || 8081;

// Run a check to ensure everything is setup properly
setupCheck();

// Register all webhook handlers
webhookRegistrar();

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

payloadConnection(app).then(()=>{

    applyAuthMiddleware(app)

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });

    // Unhandled Promise Rejection
    process.on("unhandledRejection", (err) => {
      console.log(`Error: ${err.message}`);
      console.log(`Shutting down the server due to Unhandled Promise Rejection`);
      
      server.close(() => {
        process.exit(1);
      });
    });

}).catch((err)=>{
  console.log("PAYLOAD CONNECTION FAILED" , err)
  process.exit(1)
})

