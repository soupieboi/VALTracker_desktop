var jsonCount = {};

for(var count = 0; count < json.data.length; count++) {
    for(var count2 = 0; count2 < json.data[count].rounds.length; count2++) {
        for(var count3 = 0; count3 < json.data[count].rounds[count2].player_stats.length; count3++) {
            if(json.data[count].rounds[count2].player_stats[count3].player_display_name == `${name}` + "#" + `${tag}`) {
                if(jsonCount[json.data[count].rounds[count2].player_stats[count3].economy.weapon.name] == undefined) {
                    jsonCount[json.data[count].rounds[count2].player_stats[count3].economy.weapon.name] = 1
                } else {
                    jsonCount[json.data[count].rounds[count2].player_stats[count3].economy.weapon.name] = jsonCount[json.data[count].rounds[count2].player_stats[count3].economy.weapon.name] + 1
                }
                console.log(json.data[count].rounds[count2].player_stats[count3].player_display_name)
                console.log(json.data[count].rounds[count2].player_stats[count3].economy.weapon.name)
            }
        }
    }
}

var numbers = [];
Object.keys(jsonCount).forEach(function(key) {
    numbers.push(jsonCount[key]);
});
var max = Math.max(...numbers);
console.log(max);
console.log(jsonCount);

let maxnum = 0;
let maxKey = "";

for(let nums in jsonCount){
    if(jsonCount[nums]> maxnum){
        maxnum = jsonCount[nums];
        maxKey = nums
    }
}