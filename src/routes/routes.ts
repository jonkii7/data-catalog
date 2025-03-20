import express from "express";
import { deleteProperty, getProperties, getPropertyById, postProperty, updateProperty } from "../controllers/propertiesController";
import { getEvents, postEvent, updateEvent, deleteEvent, addPropertiesToEvent, removePropertyFromEvent, getEventById } from "../controllers/eventsController";
import { postTrackingPlan, addEventsToTrackingPlan, removeEventFromTrackingPlan, deleteTrackingPlan, getTrackingPlanById } from "../controllers/trackingPlansController";

const router = express.Router();

const eventsRouter = express.Router();
const propertiesRouter = express.Router();
const trackingPlansRouter = express.Router();

router.use("/events", eventsRouter);
router.use("/properties", propertiesRouter);
router.use("/tracking-plans", trackingPlansRouter);

propertiesRouter.get("/", getProperties);
propertiesRouter.get("/:pid", getPropertyById);
propertiesRouter.post("/", postProperty);
propertiesRouter.put("/:pid", updateProperty);
propertiesRouter.delete("/:pid", deleteProperty);

eventsRouter.get("/", getEvents);
eventsRouter.get("/:eid", getEventById);
eventsRouter.post("/", postEvent);
eventsRouter.put("/:eid", updateEvent);
eventsRouter.delete("/:eid", deleteEvent);
eventsRouter.post("/:eid/properties", addPropertiesToEvent);
eventsRouter.delete("/:eid/properties/:pid", removePropertyFromEvent);

trackingPlansRouter.get("/:tid", getTrackingPlanById);
trackingPlansRouter.post("/", postTrackingPlan);
trackingPlansRouter.delete("/:tid", deleteTrackingPlan);
trackingPlansRouter.post("/:tid/events", addEventsToTrackingPlan);
trackingPlansRouter.delete("/:tid/events/:eid", removeEventFromTrackingPlan);

export default router;
