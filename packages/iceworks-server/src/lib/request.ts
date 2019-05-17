import * as rp from 'request-promise';

const request = async (uri, options = {}) => {
  options = Object.assign(
    {},
    {
      uri,
      json: true,
      rejectUnauthorized: false,
      headers: {
        'Cache-Control': 'no-cache',
      },
      timeout: 5000,
    },
    options
  );

  try {
    const response = await rp(options);
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default request;
