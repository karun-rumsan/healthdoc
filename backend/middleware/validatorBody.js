import * as zod from "zod";

function validateRequestBody(schema) {
  return function (req, res, next) {
    const { result, error } = schema.safeParse(req.body);

    if (error) {
      const details = error.issues.reduce((acc, issue) => {
        if (!acc[issue.path[0]]) {
          acc[issue.path[0]] = [];
        }
        acc[issue.path[0]].push(issue.message);
        return acc;
      }, {});
      return res.status(400).send({ error: "Invalid request body", details });
    } else {
      next();
    }
  };
}
export default validateRequestBody;
