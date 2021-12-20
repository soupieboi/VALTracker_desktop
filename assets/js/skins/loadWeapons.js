function makeCallAndBuildElements() {
   $.ajax({
      url: `https://valorant-api.com/v1/bundles`,
      type: 'get',
      success: function(data, jqXHR) {
         for(var count = 0; count < 1000; count++) {}
      }
   });
}