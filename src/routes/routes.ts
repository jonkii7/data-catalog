import express from "express";
import { getEvents } from "../controllers/eventsController";
import { deleteProperty, getProperties, getPropertyById, postProperty, updateProperty } from "../controllers/propertiesController";

const router = express.Router();

const eventsRouter = express.Router();
const propertiesRouter = express.Router();
const trackingPlanRouter = express.Router();

router.use("/events", eventsRouter);
router.use("/properties", propertiesRouter);
router.use("/tracking-plan", trackingPlanRouter);

propertiesRouter.get("/", getProperties);
propertiesRouter.get("/:id", getPropertyById);
propertiesRouter.post("/", postProperty);
propertiesRouter.put("/:id", updateProperty);
propertiesRouter.delete("/:id", deleteProperty);

eventsRouter.get("/", getEvents);

export default router;
