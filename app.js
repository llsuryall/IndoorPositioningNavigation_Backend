const express=require("express");
const app=express();
const BuildingRouter=require("./routers/Buildings.js");
const BlockRouter=require("./routers/Blocks.js");
const FloorRouter=require("./routers/Floors.js");
const DatapointRouter=require("./routers/Datapoints.js");

app.use(express.json());
app.use(`${process.env.BACKENDBASEURL}/buildings`,BuildingRouter);
app.use(`${process.env.BACKENDBASEURL}/blocks`,BlockRouter);
app.use(`${process.env.BACKENDBASEURL}/floors`,FloorRouter);
app.use(`${process.env.BACKENDBASEURL}/datapoints`,DatapointRouter);

module.exports=app;
