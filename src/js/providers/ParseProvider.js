import Parse from 'parse';

export function retrieveMainData(Parse){
  //Creates local object based on "SurveyData" Object in Parse-Server
  const SurveyData = Parse.Object.extend("SurveyData");

  //Queries the SurveyData class from Parse Server
  let query = new Parse.Query(SurveyData);

  //You can skip the first results by setting skip
  //query.skip(offset);

  //You can limit the number of results by setting "limit"
  query.limit(2000);

  // Retrieve the most recent ones
  query.descending("createdAt");

  //Limiting Results based on a class
  query.equalTo("surveyingOrganization","Puente");

  //Below searches what's in the surveyPoints array
  query.find().then((surveyPoints) => {
  //resolve(surveyPoints);
  console.log(surveyPoints)
  });
}

export function postObjectsToClass(localObject, parseClass) {
  //Creates and or Updates Parse Class
  //const SurveyData = Parse.Object.extend('SurveyData');
  const SurveyData = Parse.Object.extend(parseClass);
  let surveyPoint = new SurveyData();

  for (var key in localObject) {
    var obj = localObject[key];
    surveyPoint.set(String(key),obj);
  }

  
  //var point = new Parse.GeoPoint(localObject.latitude,localObject.longitude);
  //surveyPoint.set('location', point);

  return surveyPoint.save(null, {
    success: function (surveyPoint) {
      console.log(surveyPoint);
      return surveyPoint;
    },
    error: function (surveyPoint, error) {
      console.log(error);
      return error;
    }
  });
}