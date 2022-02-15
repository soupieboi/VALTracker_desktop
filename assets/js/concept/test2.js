var agentCount = {};
for(var count = 0; count < json.data.length; count++) {
    for(var count2 = 0; count2 < json.data[count].players.all_players.length; count2++) {
        if(json.data[count].players.all_players[count2].name + "#" + json.data[count].players.all_players[count2].tag == name + "#" + tag) {
            console.log(json.data[count].players.all_players[count2].character)
            if(agentCount[json.data[count].players.all_players[count2].character] == undefined) {
                agentCount[json.data[count].players.all_players[count2].character] = 1
            } else {
                agentCount[json.data[count].players.all_players[count2].character] = agentCount[json.data[count].players.all_players[count2].character] + 1
            }
        }
    }
}

var numbers = [];
Object.keys(agentCount).forEach(function(key) {
    numbers.push(agentCount[key]);
});
var max = Math.max(...numbers);
console.log(max);
console.log(agentCount);

let maxnum = 0;
let maxKey = "";

for(let nums in agentCount){
    if(agentCount[nums]> maxnum){
        maxnum = agentCount[nums];
        maxKey = nums
    }
}

console.log(maxKey)