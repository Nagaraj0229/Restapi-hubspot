const headers = {
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,PUT,DELETE',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };
  
  const sendResponse = (data) => ({
    statusCode: 200,
    body: JSON.stringify({ data }),
    headers,
  });
  
  const sendErrorResponse = (errorStatus, message) => ({
    statusCode: errorStatus,
    body: JSON.stringify({
      status: errorStatus,
      message: message || 'Something went wrong',
    }),
    headers,
  });
  
  module.exports = {
    sendResponse,
    sendErrorResponse,
  };
  
  module.exports.sendResponse = (data) => {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  };
  
  module.exports.sendErrorResponse = (message) => {
    return {
      statusCode: 500,
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  };
  