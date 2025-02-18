const responseClientMiddlleware = ({
  req,
  res,
  statusCode = 200,
  message,
  payload,
}) => {
  const status = statusCode >= 200 && statusCode <= 299 ? "success" : "error";
  
  return res.status(statusCode).json({
    status,
    message,
    payload,
  });
};

export default responseClientMiddlleware;
