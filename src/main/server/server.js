const axios = require('axios');
const urljoin = require('url-join');

const clientUrl = 'https://www.indecon.online';

const prepareFullUrl = (url, endpoint, optElement, optDate) => {
  let fullUrl;

  switch(endpoint){
    case 'last': {
      fullUrl=urljoin(url,endpoint);
      break;
    }

    case 'values': {
      fullUrl=urljoin(url,endpoint,optElement);
      break;
    }

    case 'date': {
      fullUrl=urljoin(url,endpoint,optElement,optDate);
      break;
    }

    default: {
      throw new Error('Endpoint desconocido ${endpoint}');
    }
  }

  return fullUrl;
};

const formatArray = (array) => {
  const initialValue = [];
  return array.reduce((obj, item) => {
    let point = {[item[0]]:item[1]};
    return [...obj,point];
  }, initialValue);
};

const getPromiseData = async (endpoint, optElement, optDate) => {
  let data = [];
  let url= '';

  url = prepareFullUrl(clientUrl,endpoint, optElement, optDate);

  let preData= await axios
    .get(url)
    .catch(err => {
      console.log(err);
      return null;
    });

  let values = preData.data.values;

  data = formatArray(Object.entries(values));

  return data;
};

module.exports = getPromiseData;

