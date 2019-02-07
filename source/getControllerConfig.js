import mayflash from "./controllers/mayflash"
import Xbox360Controller from "./controllers/360"
const controllers = [mayflash, Xbox360Controller]

function getControllerConfig(controller) {
	for (let i = 0; i < controllers.length; i++) {
		const checkController = controllers[i]
		if (typeof checkController.match == "string" && checkController.match.length > 0) {
			if (controller.id.includes(checkController.match)) return checkController
		} else if (checkController.match instanceof RegExp) {
			if (checkController.match.test(controller.id)) return checkController
		} else {
			throw new Error("Internal Error, Unexpected Match Type")
		}
	}
	return {
		type: "unknown"
	}
}

export default getControllerConfig
