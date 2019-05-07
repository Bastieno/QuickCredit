const handleResponse = (result, nextCb, response, statusCode, message) => {
  if (result instanceof Error) {
    nextCb(result);
  } else {
    response.status(statusCode).json({
      message,
      status: statusCode,
      data: result,
    });
  }
};

export default handleResponse;
