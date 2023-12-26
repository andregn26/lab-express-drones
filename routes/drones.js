const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");

// require the Drone model here

router.get("/drones", (req, res, next) => {
	Drone.find().then((allDronesFromDB) => {
		console.log("drones -->", { drones: allDronesFromDB });
		res.render("drones/list", { drones: allDronesFromDB });
	});
});

router.get("/drones/create", (req, res, next) => {
	res.render("drones/create-form");
});

router.post("/drones/create", (req, res, next) => {
	const { name, propellers, maxSpeed } = req.body;
	Drone.create({ name, propellers, maxSpeed })
		.then((createdDrone) => {
			console.log("created drone -->", createdDrone);
			res.redirect("/drones");
		})
		.catch((error) => {
			console.log(error);
			res.redirect("/drones/create");
		});
});

router.get("/drones/:id/edit", (req, res, next) => {
	const { id } = req.params;
	Drone.findById(id).then((droneById) => {
		console.log(droneById);
		res.render("drones/update-form", droneById);
	});
});

router.post("/drones/:id/edit", (req, res, next) => {
	const { id } = req.params;
	const { name, propellers, maxSpeed } = req.body;
	Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
		.then((updatedDrone) => {
			console.log("drone updated -->", updatedDrone);
			res.redirect("/drones");
		})
		.catch((error) => {
			console.log(error);
			res.redirect("/drones/:id/edit");
		});
});

router.post("/drones/:id/delete", (req, res, next) => {
	const { id } = req.params;
	Drone.findByIdAndDelete(id).then((deletedDrone) => {
		console.log("deletedDrone -->", deletedDrone);
		res.redirect("/drones");
	});
});

module.exports = router;
