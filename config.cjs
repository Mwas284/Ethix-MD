// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0kxNEFOS2hDdWRxU2wvRm9oMVNLMWpySmZIRzlhWjJ0UjBKYUhabVNFZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZk9CaWtCeEhITy82SVp1cno0V25wUDZIczdUNWxkeGRaSEJEd25QRUEyRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDSVBiaHFTdVc0dEdSMmRZVGp6dVFzMGc4Vks0RnFsLytzN251S1JWMkd3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ2bi8xUXZ6MURoMzl6bHBWd2VHTHBjQk5jUUMvTlh6UUQxNW1zQ0RpajF3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IitLQWtuTlJZeVdJV0thM0QybXk2MlBhNE1EeVZyZ2F5MTFFSlN0Q0F4VWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNiMVJCNlEwT094TldHdVNOYnJsR0dtdVNXN1ZMeUYzcElNYUhFbS95VHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRUw5VTg3WGFXQWlsNVhocGNUMlF2bmYzeGg4c2wrYlJsYjJ2bGdIRGYzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVzQvTXJXRTZFQ3AwTVl6VkZaenY0YVlKalppcjJGVTArVGZoYWx1amhuQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFIY1ZjTnpXSDNKb3FIQ3IrOTJkb3F6VUlBQ1ZBRGVRa25PMmMwWU5UUE00TWw2dUxSdHN5SlJUU3pIdVpQT0MwUFRqSzJiUEhOaHZaWGw2blRvZGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDcsImFkdlNlY3JldEtleSI6IkhCRU52d2FubFJIQ3AzYXpYV3BiUFU5b3hacXBuQ2RFbmxuazQzSy9ZdWM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Imd6cmR2T1pKUS1HUXdkSUl1ZzV1X0EiLCJwaG9uZUlkIjoiMGVkYmIzYTQtMWM0Yi00OTkyLTllMDQtMGM2ZjFiN2ViYjIyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVNUm5ZWUJzQktRTncrb2pHaWxrTW9jd1loZz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJabzJMbnozazVCWDMzUXNGMTdjOUhSOFM3Um89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiODlCQlhSMUYiLCJtZSI6eyJpZCI6IjI1NDc5NDQ1MTQ3MTo0NEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUERRbmQ0REVQcmdwYlFHR0F3Z0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMFZSZ3hCU04vTEI4WHhZN0tXOXgzUFBvL2g5NUZTbHgwWlhxS2Jka1JWND0iLCJhY2NvdW50U2lnbmF0dXJlIjoiMUIvdkgxQTJXMlJzWXduY2h2aTd3Z0pzRHV5d044dmFWSFl5Kys1WlR5VlFRSGZEMDZIbUFzMVArU3JDVjdCemVVa2NtVUlydmk3SHVJbkJFYnUzQmc9PSIsImRldmljZVNpZ25hdHVyZSI6ImtVOFVaWGZjU0hSTy9EbW1oWTlBTGlod0kwaEp3YkdSRVdkc1U5cC90Yndtd0VVTWh3c1EzeWw0SkU5WFFHNjhINlk4VDhpTEdhc0ZXVEI4RS9vZ2hRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0Nzk0NDUxNDcxOjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmRGVVlNUVVqZnl3ZkY4V095bHZjZHp6NlA0ZmVSVXBjZEdWNmltM1pFVmUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAyODMyNzEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQWdnIn0=",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || 'public',
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤͟͞★⃝ꪶ‎𝞢𝙏𝞖𝞘𝞦-𝞛𝘿𖥘✪͜͡➺",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "919142294671",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
};


module.exports = config;
