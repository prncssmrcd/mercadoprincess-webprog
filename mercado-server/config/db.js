const mongoose = require("mongoose");
const dns = require("dns");

// Force Node.js to use public DNS servers for MongoDB SRV lookup
dns.setServers(["8.8.8.8", "8.8.4.4", "1.1.1.1"]);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error("Missing MONGO_URI in .env file");
  }

  try {
    console.log("Connecting to MongoDB Atlas...");
    console.log("Using forced DNS servers:", dns.getServers());

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000,
      family: 4,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection failed.");
    console.error("Original error:", error.message);

    if (error.message.includes("querySrv")) {
      console.error(`
DNS/SRV lookup failed inside Node.js.

PowerShell can resolve the SRV record, but Node.js is still failing.
This is usually caused by Windows/router/IPv6 DNS behavior.

Next fixes:
1. Restart VS Code / terminal
2. Run: ipconfig /flushdns
3. Disable IPv6 temporarily
4. Try mobile hotspot
`);
    }

    throw error;
  }
};

module.exports = connectDB;