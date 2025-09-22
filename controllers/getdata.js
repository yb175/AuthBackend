
/**
 * @function getData
 * @description This function is used to get the data from the request
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the data is sent
 */
export default async function getData(req, res) {
  try {
    // Get the info from the request
    const { info } = req;

    // If the info exists, send it in the response
    if (info) {
      res.send({ payload: info });
    }
  } catch (err) {
    // If there is an error, send it in the response with a 500 status code
    res.status(500).send({ err: err.message });
  }
}
