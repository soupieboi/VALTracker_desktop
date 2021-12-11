const replaceText = (text) => {
   const element = document.getElementById("search-output");
   if (element) element.innerText = text
}

function makeCallAndBuildElements() {
   $.ajax({
      url: `https://valorant-api.com/v1/bundles`,
      type: 'get',
      success: function(data, xhr) {
         console.log(xhr.status);
         console.log(data.data[0].displayName);
         console.log(data.data[1].displayName);
      },
      error: function(xhr) {
         //get the status code
         if (xhr.status == 400) {
            replaceText('400, Bad Request');
         }
         if (xhr.status == 401) {
            replaceText('401, Unauthorized');
         }
         if (xhr.status == 403) {
            replaceText('403, Name/Tag Missing!');
         }
         if (xhr.status == 404) {
            replaceText('404, No player found!');
         }
         if (xhr.status == 405) {
            replaceText('405, Not allowed!');
         }
         if (xhr.status == 415) {
            replaceText('415, unsupported Media Type');
         }
         if (xhr.status == 429) {
            replaceText('429, Rate limit exceeded, try again later');
         }
         if (xhr.status == 500) {
            replaceText('500, Internal Server Error');
         }
         if (xhr.status == 502) {
            replaceText('502, Bad Gateway');
         }
         if (xhr.status == 503) {
            replaceText('503, Service unavailable');
         }
         if (xhr.status == 504) {
            replaceText('504, Gateway timeout');
         }
      },
   });
}

$(document).ready(() => {});