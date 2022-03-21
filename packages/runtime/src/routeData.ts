/**
* prepare data for matched routes
* @param requestContext
* @param matches
* @returns
*/
export default async function getRouteData(requestContext, matches) {
 const routeData = {};

 const matchedCount = matches.length;

 for (let i = 0; i < matchedCount; i++) {
   const match = matches[i];
   const { route } = match;
   const { component, id } = route;

   const { getInitialData, getPageConfig } = component;
   let initialData;
   let pageConfig;

   if (getInitialData) {
     initialData = await getInitialData(requestContext);
   }

   if (getPageConfig) {
     pageConfig = getPageConfig({
       initialData,
     });
   }

   routeData[id] = {
     initialData,
     pageConfig,
   };
 }

 return routeData;
}