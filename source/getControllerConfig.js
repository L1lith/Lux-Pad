import mayflash from "./controllers/mayflash"
import Xbox360Controller from "./controllers/360"
import fightpadpro from './controllers/fightpadpro'
const controllers = [mayflash, Xbox360Controller, fightpadpro]

export function addControllerDefinition(definition) {
	if (typeof definition != 'object' || definition === null) throw new Error("Controller definition must be an object")
	if (typeof definition.type != 'string' || definition.type.length < 1) throw new Error("Controller definition type must be a string")
	if (Object.keys(definition).length < 2) throw new Error("No options were provided in the controller definition.")
	if (!controllers.includes(definition)) controllers.append(definition)
}

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
