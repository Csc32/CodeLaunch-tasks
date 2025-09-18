import validation from "../libs/validation.js";
/**
 * Middleware for validate params of body (req.body)
 * using a specific rules defined by routes
 * @param {Array<Object>} rules
 * @returns {Function} express middleware that:
 * - execute validation config
 * - return 422 with error bag if the validation fails
 * - add validated data to `req.validated`if validation success
 */
export default function validationMiddleware(rules) {
	return (req, res, next) => {
		validation.setInputs(req.body).setRules(rules);
		if (!validation.validate()) {
			return res.status(422).json({ errors: validation.getErrors() });
		}

		req.validated = validation.getValidatedInputs();
		next();
	};
}
