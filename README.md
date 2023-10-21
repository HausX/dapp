# before running locally
Creating a .env file with:

```
LIGHTHOUSE_API_KEY=<key>
```

To get this key, use the lighthouse cli (docs: https://docs.lighthouse.storage/lighthouse-1/)
Then install lighthouse-web3 globally to run the commands below 
```
lighthouse-web3 create-wallet    
```

```
lighthouse-web3 api-key --new   
```

We're just using testnet in the `file-watcher/watcher.ts` but still worth keeping api keys secure.

# running locally

```docker-compose up --build```


## validate ipfs
you can grab the hash from the console log and replace `insert_cid` in the following command to see that we're actually uploading to lighthouse ipfs.

```
curl https://api.lighthouse.storage/api/lighthouse/get_proof\?cid\=<insert_cid>\&network\=testnet
```

## API
To assign a wallet owner to the chunk id, use the following request. You can replace `mystream-2.ts` with the actual chunk id and `your_wallet_address` with the owner

```
curl -X POST http://localhost:4000/assignWallet \
-H "Content-Type: application/json" \
-d '{"chunkId": "mystream-2.ts", "wallet": "your_wallet_address"}'
```


To retrive all chunks that belong to a wallet address, use the following request

```
curl "http://localhost:4000/getHash?wallet=your_wallet_address"
```

Note this is not a secure implementation yet. Just a proof of concept


## other useful testing commands

You'll see a `db/vidoes.db` file created when running `docker-compose up --build`. To inspect it, use the sqlite3 cli:

```
sqlite3 videos.db
```

Then 

```
.tables
```

```
SELECT * FROM videos;
```

And you'll see the stored video chunks, the cid, and the assigned wallet if one exists. It's useful for debugging if you add new api/sotrage features but hopefully you just need the API.

## OBS setup

Under settings -> stream:

Server: `rtmp://localhost:1935/live`

Stream Key: `mystream` (note this can and should be changed down the line to id different streams, each stream should be unique for database purposes but since it's only a proof-of-concept, we keep it simple with mystream hardcoded throughout)

## nginx/hls

You'll see the chunks appear in this folder for validation

# Deployment

I would deploy this using a docker VM. Digital Ocean has them for cheap and then you could just clone this repo and run the command `docker-compose up --build`, then expose the ports in the settings. There might be a CORS issue that we could easily resolve with the API. 

# Future work

- Add security and potentially ownership and encryption to ipfs storage from the onset (not needed for proof-of-concept imo)