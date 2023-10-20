import chokidar from "chokidar";
import lighthouse from "@lighthouse-web3/sdk";
import { DealParameters } from "@lighthouse-web3/sdk/dist/types";
import sqlite3 from "sqlite3";
import express from "express";

const folderToWatch: string = "/hls";
const apiPort = 4000;

// Set up SQLite
const db = new sqlite3.Database("/usr/src/app/db/videos.db");

db.run(
    "CREATE TABLE IF NOT EXISTS videos (chunk_id TEXT, cid TEXT, wallet TEXT)"
);

// Set up Express
const app = express();
app.use(express.json());

app.post("/assignWallet", (req, res) => {
    console.log("Incoming request body:", req.body);
    const { chunkId, wallet } = req.body;
    db.run(
        `UPDATE videos SET wallet = ? WHERE chunk_id = ?`,
        [wallet, chunkId],
        function (err) {
            if (err) {
                console.error("Database error:", err.message); // Log the error
                return res.status(500).json({ error: err.message });
            }

            // Check if any rows were updated
            if (this.changes === 0) {
                console.warn(
                    `No rows updated. chunk_id: ${chunkId} might not exist.`
                );
                return res.status(404).json({
                    message: "No matching video found for provided chunk_id.",
                });
            }

            res.json({ message: "Wallet address assigned successfully!" });
        }
    );
});

app.get("/getHash", (req, res) => {
    const wallet = req.query.wallet;
    if (!wallet) {
        return res
            .status(400)
            .json({ error: "Wallet ID is required as a query parameter." });
    }

    db.all(
        `SELECT chunk_id, cid FROM videos WHERE wallet = ?`,
        [wallet],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (rows.length === 0) {
                return res.status(404).json({
                    error: "No CIDs found for the provided wallet ID.",
                });
            }
            res.json(rows);
        }
    );
});

app.listen(apiPort, () => {
    console.log(`API is listening on port ${apiPort}`);
});
// Initialize the file watcher.
const watcher = chokidar.watch(folderToWatch, {
    ignored: [/(^|[\/\\])\../, /\.bak$/], // ignore dotfiles and .bak files
    persistent: true,
});
console.log("Watching folder:", folderToWatch);
const apiKey: string | undefined = process.env.LIGHTHOUSE_API_KEY;
if (apiKey === undefined) {
    throw new Error("LIGHTHOUSE_API_KEY environment variable not set");
}

watcher.on("add", async (path: string) => {
    console.log(`File ${path} has been added`);

    // Upload the file to IPFS.
    try {
        const dealParam_default: DealParameters = {
            num_copies: 2,
            repair_threshold: 28800,
            renew_threshold: 240,
            miner: ["t017840"],
            network: "calibration",
            deal_duration: 2880,
            // add_mock_data: 2,
        };

        const uploadResponse = await lighthouse.upload(
            path,
            apiKey, // this is a test api key that I do not use for anything but testing, this is not secure
            false,
            dealParam_default
        );
        console.log(uploadResponse);

        // Insert into SQLite
        const stmt = db.prepare(
            "INSERT INTO videos (chunk_id, cid, wallet) VALUES (?, ?, ?)"
        );
        stmt.run(
            [path.split("/").pop(), uploadResponse.data.Hash, null],
            function (err) {
                if (err) {
                    return console.error(
                        "Error inserting into database:",
                        err.message
                    );
                }
                console.log(
                    `Inserted ${this.changes} row(s) into the videos table`
                );
            }
        );
        stmt.finalize();
    } catch (err) {
        console.error("Error reading the file:", err);
    }
});