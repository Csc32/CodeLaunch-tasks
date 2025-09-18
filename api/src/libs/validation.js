/**
 * Class to validate data from the request
 */
class Validation {
	/**
	 * Set validation rules
	 * @param {Object} inputs
	 * @param {Array} rules
	 * @param {Object} fieldNames
	 */
	constructor(inputs = {}, rules = [], fieldNames = {}) {
		this.inputs = inputs;
		this.rules = rules;
		this.fieldNames = fieldNames;
		this.errors = {};
		this.validatedInputs = {};
	}
	/**
	 *Execute all validation rules in the array of rules
	 * @returns boolean
	 */
	validate() {
		for (const ruleObj of this.rules) {
			const { field, rules } = ruleObj;
			const value = this.inputs[field];
			const fieldName = this.fieldNames[field] || field;

			for (const rule of rules) {
				const [ruleName, ruleValue] = rule.split(":");

				if (
					ruleName === "required" &&
					(!value || value.toString().trim() === "")
				) {
					this.addError(field, `${fieldName} is required`);
				}

				if (ruleName === "min" && value && value.length < parseInt(ruleValue)) {
					this.addError(
						field,
						`${fieldName} must have at least ${ruleValue} characters`,
					);
				}

				if (ruleName === "max" && value && value.length > parseInt(ruleValue)) {
					this.addError(
						field,
						`${fieldName} must have at most ${ruleValue} characters`,
					);
				}

				if (
					ruleName === "boolean" &&
					value !== undefined &&
					![0, 1, true, false].includes(value)
				) {
					this.addError(field, `${fieldName} must be true/false or 0/1`);
				}
			}
		}

		return Object.keys(this.errors).length === 0;
	}
	/**
	 * Set errors in errors bag
	 * @param {string} field
	 * @param {string} message
	 */
	setError(field, message) {
		if (!this.errors[field]) {
			this.errors[field] = [];
		}
		this.errors[field].push(message);
	}
	/**
	 * Returns all errors in error bag
	 * @returns {array}
	 */
	getErrors() {
		return this.errors;
	}
	/**
	 * Returns all validated inputs
	 * @returns {object}
	 */
	getValidatedInputs() {
		return this.rules.reduce((acc, ruleObj) => {
			const { field } = ruleObj;
			if (!this.errors[field]) {
				acc[field] = this.inputs[field];
			}
			return acc;
		}, {});
	}
}
const validation = new Validation();
export default validation;
