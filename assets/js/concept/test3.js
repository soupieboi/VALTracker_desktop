for(var i = 0; i < json.data.length; i++) {
    if(json.data[i].uuid == "6336272a-4be9-4b0c-68ef-d79c06e11ca2") {
        console.log(json.data[i].displayName)
    }
}

//--------------------------------

export const getContract = async () => {
  console.debug(`Getting contracts`);
  const response = await fetch(
    `https://valorant-api.com/v1/contracts`
  );
  console.assert(
    response.statusCode === 200,
    `Valorant get agents is ${response.statusCode}!`,
    response
  );
  const json = JSON.parse(response.body).data;
  for(var i = 0; i < json.length; i++) {
    if(json[i].uuid == "6336272a-4be9-4b0c-68ef-d79c06e11ca2") {
        return json[i].displayName.split(" ")[0]
    }
}
};