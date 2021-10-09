function errorHandler(err, req, res, next) {

    if (err.name === "UnauthorizedError") return res.status(401).json({ message: "The User is Unauthorized" });
    if (err.name === "CastError") return res.status(401).json({ message: err });
    if (err.name === "ValidatorError") return res.status(401).json({ message: err });

    res.status(500).json({ message: err });
}

module.exports = errorHandler