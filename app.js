const cors = require("cors");
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
// import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://hvzrxrxrmjbjxgksauvf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2enJ4cnhybWpianhna3NhdXZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUzOTE1NjAsImV4cCI6MjAyMDk2NzU2MH0.lzyxFu6BYnx97q7q4NZQNlQ1zqpqXYz_vRczxK9zz8k";

// console.log(createClient)
let app = express();
let port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require("./routes");
app.use("/api", router.user_router);
app.use("/api", router.STID_router);
app.use("/api", router.booking_router);
app.use("/api", router.slot_router);
app.use("/api", router.assignJob_router);
app.use("/api", router.transportOrder_router);
app.use("/api", router.timeslot_router);

createClient(supabaseUrl, supabaseKey);
// console.log(app._router.stack)
app.listen(port, () => {
  console.log(`Listenting to port: ${port} `);
});
