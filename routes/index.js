var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

async function getData(filename) {
  try {
    const data = fs.readFileSync(path.join(__dirname, filename + '.json'));
    if (data) {
      const result = JSON.parse(data.toString());
      return Promise.resolve(result);
    }
    return Promise.reject(new Error([]));
  } catch (error) {
    return Promise.reject(new Error([]));
  }
}

async function setData(data, filename) {
  try {
    if (data) {
      fs.writeFileSync(
        path.join(__dirname, filename + '.json'),
        JSON.stringify(data)
      );
      return Promise.resolve(true);
    }
    return Promise.reject(new Error(false));
  } catch (error) {
    return Promise.reject(new Error(false));
  }
}

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getUsers', async function (req, res, next) {
  const responseJSON = {};
  try {
    const data = await getData('database');
    const result = [];
    data.forEach((x) => {
      const obj = {};
      obj.id = x.id + 1 || 0;
      obj.name = x.name || '';
      obj.email = x.email || '';
      obj.phone = x.phone || '';
      obj.company = x.company.toString() || [];
      result.push(obj);
    });
    responseJSON.status = 0;
    responseJSON.data = result;
    return res.json(responseJSON);
  } catch (error) {
    responseJSON.status = 1;
    responseJSON.data = [];
    return res.json(responseJSON);
  }
});

router.get('/getCompanies', async function (req, res, next) {
  const responseJSON = {};
  try {
    const data = await getData('company');
    responseJSON.status = 0;
    responseJSON.data = data;
    return res.json(responseJSON);
  } catch (error) {
    responseJSON.status = 1;
    responseJSON.data = [];
    return res.json(responseJSON);
  }
});

router.post('/saveUser', async function (req, res, next) {
  const responseJSON = {};
  try {
    const data = await getData('database');
    const obj = {};
    obj.id = data.length + 1 || 0;
    obj.name = req.body.name || '';
    obj.email = req.body.email || '';
    obj.phone = req.body.phone || '';
    obj.company = req.body.company || [];
    data.push(obj);
    const result = await setData(data, 'database');
    if (result) {
      responseJSON.status = 0;
      responseJSON.data = [];
      return res.json(responseJSON);
    }
    responseJSON.status = 1;
    responseJSON.data = [];
    return res.json(responseJSON);
  } catch (error) {
    responseJSON.status = 1;
    responseJSON.data = [];
    return res.json(responseJSON);
  }
});

router.post('/saveCompany', async function (req, res, next) {
  const responseJSON = {};
  try {
    const data = await getData('company');
    const obj = {};
    obj.id = data.length + 1 || 0;
    obj.companyName = req.body.companyName || '';
    obj.city = req.body.city || '';
    data.push(obj);
    const result = await setData(data, 'company');
    if (result) {
      responseJSON.status = 0;
      responseJSON.data = [];
      return res.json(responseJSON);
    }
    responseJSON.status = 1;
    responseJSON.data = [];
    return res.json(responseJSON);
  } catch (error) {
    responseJSON.status = 1;
    responseJSON.data = [];
    return res.json(responseJSON);
  }
});

module.exports = router;
