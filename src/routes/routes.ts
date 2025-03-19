import express from "express";
import { getEvents } from "../controllers/eventsController";
import { getProperties } from "../controllers/propertiesController";

const router = express.Router();

const eventsRouter = express.Router();
const propertiesRouter = express.Router();
const trackingPlanRouter = express.Router();

router.use("/events", eventsRouter);
router.use("/properties", propertiesRouter);
router.use("/tracking-plan", trackingPlanRouter);

eventsRouter.get("/", getEvents);

propertiesRouter.get("/", getProperties);

export default router;
