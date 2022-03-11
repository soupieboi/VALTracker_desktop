const fs = require('fs');

var bearer;
var requiredCookie;
var entitlement_token;
var id_token;
var current_version;

async function getPlayerUUID() {
    return (await (await this.fetch('https://auth.riotgames.com/userinfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + bearer,
            'Content-Type': 'application/json',
            'User-Agent': ''
        },
    })).json())['sub'];
}

async function getEntitlement() {
    return (await (await this.fetch('https://entitlements.auth.riotgames.com/api/token/v1', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + bearer,
            'Content-Type': 'application/json',
            'User-Agent': ''
        },
    })).json())['entitlements_token'];
}

async function getXMPPRegion() {
    return (await (await this.fetch("https://riot-geo.pas.si.riotgames.com/pas/v1/product/valorant", {
        "method": "PUT",
        "headers": {
            "cookie": requiredCookie,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + bearer
        },
        "body": `{\"id_token\":\"${id_token}\"}`
    })).json());
}

async function getAllContracts() {
    return (await (await this.fetch('https://valorant-api.com/v1/contracts', {
        method: 'GET',
    })).json());
}

async function getCurrentVersion() {
    return (await (await this.fetch('https://valorant-api.com/v1/version', {
        method: 'GET',
    })).json());
}

async function getContractProgression() {
    return (await (await this.fetch('https://pd.' + region + '.a.pvp.net/contracts/v1/contracts/' + puuid, {
        method: 'GET',
        headers: {
            'X-Riot-Entitlements-JWT': entitlement_token,
            'X-Riot-ClientVersion': current_version,
            'Authorization': 'Bearer ' + bearer,
        },
    })).json());
}

async function getCurrentVersion() {
    return (await (await this.fetch(`https://valorant-api.com/v1/version`, {
        method: 'GET',
    })).json());
}

async function getCurrentContract() {
    return (await (await this.fetch(`https://valorant-api.com/v1/contracts/${currentContract}`, {
        method: 'GET',
    })).json());
}

async function getAllWeapons() {
    return (await (await this.fetch(`https://valorant-api.com/v1/weapons`, {
        method: 'GET',
    })).json());
}

async function getAllCharms() {
    return (await (await this.fetch(`https://valorant-api.com/v1/buddies`, {
        method: 'GET',
    })).json());
}

async function getAllCards() {
    return (await (await this.fetch(`https://valorant-api.com/v1/playercards`, {
        method: 'GET',
    })).json());
}

async function getAllSprays() {
    return (await (await this.fetch(`https://valorant-api.com/v1/sprays`, {
        method: 'GET',
    })).json());
}

async function getAllTitles() {
    return (await (await this.fetch(`https://valorant-api.com/v1/playertitles`, {
        method: 'GET',
    })).json());
}

function getTokenDataFromURL(url) {
    try {
        const searchParams = new URLSearchParams((new URL(url)).hash.slice(1));
        return {
            accessToken: searchParams.get('access_token'),
            expiresIn: searchParams.get('expires_in'),
            id_token: searchParams.get('id_token'),
        };
    } catch (err) {
        throw new Error(`Bad url: "${url}"`);
    }
}

//Get current contract via val-api, then get current level via igA, then display all levels of the current bp with val-api, change color of current level.

$(document).ready(() => {
    var hideFreeItems = false;
    if (!fs.existsSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings')) {
        fs.mkdirSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings');
    }
    if (!fs.existsSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings/settings.json')) {
        const dataToWrite = {
            showFreeItems: false,
        }
        fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings/settings.json', JSON.stringify(dataToWrite))
        hideFreeItems = true;
    } else {
        const dataToParse = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings/settings.json');
        const bpSettings = JSON.parse(dataToParse)
        if (bpSettings.showFreeItems == true) {
            $('input[type="checkbox"]').click();
        } else if (bpSettings.showFreeItems == false) {
            hideFreeItems = true;
        }
    }
    async function fetchBP() {
        const rawTokenData = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/token_data.json')
        const tokenData = JSON.parse(rawTokenData)

        bearer = tokenData.accessToken;
        id_token = tokenData.id_token;

        puuid = await getPlayerUUID();
        entitlement_token = await getEntitlement();
        if (typeof entitlement_token === "string") {

            var reagiondata = await getXMPPRegion();
            console.log(reagiondata)
            region = reagiondata.affinities.live

            const contracts = await getAllContracts();
            currentContract = contracts.data[contracts.data.length - 1].uuid

            const version = await getCurrentVersion();
            current_version = version.data.riotClientVersion;

            const getProgressionLevel = await getContractProgression();
            console.log(getProgressionLevel)
            for (var i = 0; i < getProgressionLevel.Contracts.length; i++) {
                if (getProgressionLevel.Contracts[i].ContractDefinitionID == currentContract) {
                    var bp_progression = getProgressionLevel.Contracts[i].ProgressionLevelReached;
                }
            }
            console.log(bp_progression)

            const contractData = await getCurrentContract();
            var levelcount = 0;
            var totalFreeItems = 0;

            var weaponUUIDarray = [];
            var charmUUIDarray = [];
            var cardUUIDarray = [];
            var sprayUUIDarray = [];
            var titleUUIDarray = [];

            for (var i = 0; i < contractData.data.content.chapters.length; i++) { // All Chapters
                for (var i2 = 0; i2 < contractData.data.content.chapters[i].levels.length; i2++) { // All Levels
                    levelcount++;
                    var card_handler = document.createElement('div');
                    card_handler.classList.add("bp-reward-card", levelcount)

                    var tier_header = document.createElement("div");
                    tier_header.classList.add("tier-header");
                    tier_header.appendChild(document.createTextNode("#" + levelcount));

                    var tier_body = document.createElement("div");
                    tier_body.className = "tier-image-wrapper";

                    var tier_img = document.createElement("img");
                    var tier_img_rep_span = document.createElement("span");
                    tier_img_rep_span.className = "hidden-img-replacement"

                    tier_body.appendChild(tier_img)
                    tier_body.appendChild(tier_img_rep_span)

                    var tier_name = document.createElement("div");
                    tier_name.classList.add("tier-item-desc");
                    var tier_name_span = document.createElement("span");
                    tier_name_span.className = "tier-item-desc-span"
                    tier_name_span.appendChild(document.createTextNode("Something"));
                    tier_name.appendChild(tier_name_span);

                    if (contractData.data.content.chapters[i].levels[i2].reward.type == "Currency") {
                        tier_img.src = "assets/img/radianite_icon.png";
                        tier_img.className = "tier-img-currency";
                        tier_name.textContent = "Radianite"
                    } else if (contractData.data.content.chapters[i].levels[i2].reward.type == "EquippableSkinLevel") {
                        weaponUUIDarray.push(contractData.data.content.chapters[i].levels[i2].reward.uuid + ";" + levelcount)
                        tier_img.id = `skin-${levelcount}`;
                        tier_img.className = "tier-img-weapon";
                    } else if (contractData.data.content.chapters[i].levels[i2].reward.type == "EquippableCharmLevel") {
                        charmUUIDarray.push(contractData.data.content.chapters[i].levels[i2].reward.uuid + ";" + levelcount)
                        tier_img.id = `charm-${levelcount}`;
                        tier_img.className = "tier-img-charm";
                    } else if (contractData.data.content.chapters[i].levels[i2].reward.type == "PlayerCard") {
                        cardUUIDarray.push(contractData.data.content.chapters[i].levels[i2].reward.uuid + ";" + levelcount)
                        tier_img.id = `card-${levelcount}`;
                        tier_img.className = "tier-img-card";
                    } else if (contractData.data.content.chapters[i].levels[i2].reward.type == "Spray") {
                        sprayUUIDarray.push(contractData.data.content.chapters[i].levels[i2].reward.uuid + ";" + levelcount)
                        tier_img.id = `spray-${levelcount}`;
                        tier_img.className = "tier-img-spray";
                    } else if (contractData.data.content.chapters[i].levels[i2].reward.type == "Title") {
                        titleUUIDarray.push(contractData.data.content.chapters[i].levels[i2].reward.uuid + ";" + levelcount)
                        tier_img.id = `title-${levelcount}`;
                        tier_img.className = "tier-img-title";
                    }

                    if (contractData.data.content.chapters[i].isEpilogue == true) {
                        $(tier_header).empty();
                        $(tier_header).append("EPILOGUE");
                        tier_header.classList.add("epilogue");
                        tier_name.classList.add("epilogue");
                    }

                    card_handler.appendChild(tier_header);
                    card_handler.appendChild(tier_body);
                    card_handler.appendChild(tier_name);

                    var wrapper = document.getElementById("bp-cards-wrapper");
                    var lastelement = document.getElementById("lastElement");

                    wrapper.insertBefore(card_handler, lastelement);
                }
                if (contractData.data.content.chapters[i].freeRewards !== null) {
                    var extra_tier_count = 0;
                    for (var i2 = 0; i2 < contractData.data.content.chapters[i].freeRewards.length; i2++) { // All Frees
                        totalFreeItems++;
                        var card_handler = document.createElement('div');
                        card_handler.className = "bp-reward-card";

                        var tier_header = document.createElement("div");
                        tier_header.classList.add("tier-header", "free");
                        tier_header.appendChild(document.createTextNode("#" + levelcount));

                        var tier_body = document.createElement("div");
                        tier_body.className = "tier-image-wrapper";

                        var tier_img = document.createElement("img");
                        var tier_img_rep_span = document.createElement("span");
                        tier_img_rep_span.className = "hidden-img-replacement"

                        tier_body.appendChild(tier_img)
                        tier_body.appendChild(tier_img_rep_span)

                        var tier_name = document.createElement("div");
                        tier_name.classList.add("tier-item-desc", "free");
                        var tier_name_span = document.createElement("span");
                        tier_name_span.className = "tier-item-desc-span"
                        tier_name_span.appendChild(document.createTextNode("Something"));
                        tier_name.appendChild(tier_name_span);

                        if (contractData.data.content.chapters[i].freeRewards[i2].type == "Currency") {
                            tier_img.src = "assets/img/radianite_icon.png";
                            tier_img.className = "tier-img-currency";
                            tier_name.textContent = "Radianite"
                        } else if (contractData.data.content.chapters[i].freeRewards[i2].type == "EquippableSkinLevel") {
                            weaponUUIDarray.push(contractData.data.content.chapters[i].freeRewards[i2].uuid + ";" + levelcount + ";" + extra_tier_count)
                            tier_img.id = `skin-${levelcount}-${extra_tier_count}`;
                            extra_tier_count++;
                            tier_img.className = "tier-img-weapon";
                        } else if (contractData.data.content.chapters[i].freeRewards[i2].type == "EquippableCharmLevel") {
                            charmUUIDarray.push(contractData.data.content.chapters[i].freeRewards[i2].uuid + ";" + levelcount + ";" + extra_tier_count)
                            tier_img.id = `charm-${levelcount}-${extra_tier_count}`;
                            extra_tier_count++;
                            tier_img.className = "tier-img-charm";
                        } else if (contractData.data.content.chapters[i].freeRewards[i2].type == "PlayerCard") {
                            cardUUIDarray.push(contractData.data.content.chapters[i].freeRewards[i2].uuid + ";" + levelcount + ";" + extra_tier_count)
                            tier_img.id = `card-${levelcount}-${extra_tier_count}`;
                            extra_tier_count++;
                            tier_img.className = "tier-img-card";
                        } else if (contractData.data.content.chapters[i].freeRewards[i2].type == "Spray") {
                            sprayUUIDarray.push(contractData.data.content.chapters[i].freeRewards[i2].uuid + ";" + levelcount + ";" + extra_tier_count)
                            tier_img.id = `spray-${levelcount}-${extra_tier_count}`;
                            extra_tier_count++;
                            tier_img.className = "tier-img-spray";
                        } else if (contractData.data.content.chapters[i].freeRewards[i2].type == "Title") {
                            titleUUIDarray.push(contractData.data.content.chapters[i].freeRewards[i2].uuid + ";" + levelcount + ";" + extra_tier_count)
                            tier_img.id = `title-${levelcount}-${extra_tier_count}`;
                            extra_tier_count++;
                            tier_img.className = "tier-img-title";
                        }

                        card_handler.appendChild(tier_header);
                        card_handler.appendChild(tier_body);
                        card_handler.appendChild(tier_name);

                        var wrapper = document.getElementById("bp-cards-wrapper");
                        var lastelement = document.getElementById("lastElement");

                        wrapper.insertBefore(card_handler, lastelement);
                    }
                }
            }

            const allWeapons = await getAllWeapons();
            for (var i = 0; i < weaponUUIDarray.length; i++) {
                for (var i2 = 0; i2 < allWeapons.data.length; i2++) {
                    for (var i3 = 0; i3 < allWeapons.data[i2].skins.length; i3++) {
                        if (allWeapons.data[i2].skins[i3].levels[0].uuid == weaponUUIDarray[i].split(";")[0]) {
                            if (weaponUUIDarray[i].split(";")[2]) {
                                $(`#skin-${weaponUUIDarray[i].split(";")[1]}-${weaponUUIDarray[i].split(";")[2]}`).attr("src", allWeapons.data[i2].skins[i3].levels[0].displayIcon)
                                document.getElementById(`skin-${weaponUUIDarray[i].split(";")[1]}-${weaponUUIDarray[i].split(";")[2]}`).parentElement.parentElement.lastChild.textContent = allWeapons.data[i2].skins[i3].levels[0].displayName
                            } else {
                                $(`#skin-${weaponUUIDarray[i].split(";")[1]}`).attr("src", allWeapons.data[i2].skins[i3].levels[0].displayIcon)
                                document.getElementById(`skin-${weaponUUIDarray[i].split(";")[1]}`).parentElement.parentElement.lastChild.textContent = allWeapons.data[i2].skins[i3].levels[0].displayName
                            }
                        }
                    }
                }
            }

            const allCharms = await getAllCharms();
            for (var i = 0; i < charmUUIDarray.length; i++) {
                for (var i2 = 0; i2 < allCharms.data.length; i2++) {
                    if (allCharms.data[i2].levels[0].uuid == charmUUIDarray[i].split(";")[0]) {
                        if (charmUUIDarray[i].split(";")[2]) {
                            $(`#charm-${charmUUIDarray[i].split(";")[1]}-${charmUUIDarray[i].split(";")[2]}`).attr("src", allCharms.data[i2].displayIcon)
                            document.getElementById(`charm-${charmUUIDarray[i].split(";")[1]}-${charmUUIDarray[i].split(";")[2]}`).parentElement.parentElement.lastChild.firstChild.textContent = allCharms.data[i2].displayName
                        } else {
                            $(`#charm-${charmUUIDarray[i].split(";")[1]}`).attr("src", allCharms.data[i2].displayIcon)
                            document.getElementById(`charm-${charmUUIDarray[i].split(";")[1]}`).parentElement.parentElement.lastChild.firstChild.textContent = allCharms.data[i2].displayName
                        }
                    }
                }
            }

            const allCards = await getAllCards();
            for (var i = 0; i < cardUUIDarray.length; i++) {
                for (var i2 = 0; i2 < allCards.data.length; i2++) {
                    if (allCards.data[i2].uuid == cardUUIDarray[i].split(";")[0]) {
                        if (cardUUIDarray[i].split(";")[2]) {
                            $(`#card-${cardUUIDarray[i].split(";")[1]}-${cardUUIDarray[i].split(";")[2]}`).attr("src", allCards.data[i2].displayIcon)
                            document.getElementById(`card-${cardUUIDarray[i].split(";")[1]}-${cardUUIDarray[i].split(";")[2]}`).parentElement.parentElement.lastChild.firstChild.textContent = allCards.data[i2].displayName
                        } else {
                            $(`#card-${cardUUIDarray[i].split(";")[1]}`).attr("src", allCards.data[i2].displayIcon)
                            document.getElementById(`card-${cardUUIDarray[i].split(";")[1]}`).parentElement.parentElement.lastChild.firstChild.textContent = allCards.data[i2].displayName
                        }
                    }
                }
            }

            const allSprays = await getAllSprays();
            for (var i = 0; i < sprayUUIDarray.length; i++) {
                for (var i2 = 0; i2 < allSprays.data.length; i2++) {
                    if (allSprays.data[i2].uuid == sprayUUIDarray[i].split(";")[0]) {
                        if (sprayUUIDarray[i].split(";")[2]) {
                            $(`#spray-${sprayUUIDarray[i].split(";")[1]}-${sprayUUIDarray[i].split(";")[2]}`).attr("src", allSprays.data[i2].displayIcon)
                            document.getElementById(`spray-${sprayUUIDarray[i].split(";")[1]}-${sprayUUIDarray[i].split(";")[2]}`).parentElement.parentElement.lastChild.firstChild.textContent = allSprays.data[i2].displayName
                        } else {
                            $(`#spray-${sprayUUIDarray[i].split(";")[1]}`).attr("src", allSprays.data[i2].displayIcon)
                            document.getElementById(`spray-${sprayUUIDarray[i].split(";")[1]}`).parentElement.parentElement.lastChild.firstChild.textContent = allSprays.data[i2].displayName
                        }
                    }
                }
            }

            const allTitles = await getAllTitles();
            for (var i = 0; i < titleUUIDarray.length; i++) {
                for (var i2 = 0; i2 < allTitles.data.length; i2++) {
                    if (allTitles.data[i2].uuid == titleUUIDarray[i].split(";")[0]) {
                        if (titleUUIDarray[i].split(";")[2]) {
                            $(`#title-${titleUUIDarray[i].split(";")[1]}-${titleUUIDarray[i].split(";")[2]}`).attr("src", allTitles.data[i2].displayIcon)
                            document.getElementById(`title-${titleUUIDarray[i].split(";")[1]}-${titleUUIDarray[i].split(";")[2]}`).parentElement.parentElement.lastChild.firstChild.textContent = allTitles.data[i2].displayName
                            document.getElementById(`title-${titleUUIDarray[i].split(";")[1]}-${titleUUIDarray[i].split(";")[2]}`).parentElement.lastChild.textContent = allTitles.data[i2].displayName.split(" Title")[0]
                            document.getElementById(`title-${titleUUIDarray[i].split(";")[1]}-${titleUUIDarray[i].split(";")[2]}`).parentElement.lastChild.setAttribute('style', 'display: block;')
                        } else {
                            $(`#title-${titleUUIDarray[i].split(";")[1]}`).append(allTitles.data[i2].displayName.split("Title")[0])
                            document.getElementById(`title-${titleUUIDarray[i].split(";")[1]}`).parentElement.parentElement.lastChild.firstChild.textContent = allTitles.data[i2].displayName
                            document.getElementById(`title-${titleUUIDarray[i].split(";")[1]}`).parentElement.lastChild.textContent = allTitles.data[i2].displayName.split("Title")[0]
                            document.getElementById(`title-${titleUUIDarray[i].split(";")[1]}`).parentElement.lastChild.setAttribute('style', 'display: block;')
                        }
                    }
                }
            }
            console.log(bp_progression)
            $(`.bp-reward-card.${bp_progression}`).attr("id", "currentLevel")
            $(`.bp-reward-card.${bp_progression}`).addClass("currentLevel")
        } else {
            function reauth() {
                riotIPC.send('startReauthCycle', 'now');
            }

            reauth();

            ipcRenderer.on('reauthSuccess', async function (event, arg) {
                const tokenData = getTokenDataFromURL(arg)
                fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/riot_games_data/token_data.json', JSON.stringify(tokenData))

                bearer = tokenData.accessToken;
                id_token = tokenData.id_token;

                riotIPC.send('setCookies', 'please')
                riotIPC.on('tdid', async function (event, arg) {
                    console.log(arg)
                    requiredCookie = "tdid=" + arg

                    puuid = await getPlayerUUID();
                    console.log(puuid);

                    entitlement_token = await getEntitlement();

                    var reagiondata = await getXMPPRegion();
                    console.log(reagiondata)
                    region = reagiondata.affinities.live

                    const contracts = await getAllContracts();
                    currentContract = contracts.data[contracts.data.length - 1].uuid

                    const version = await getCurrentVersion();
                    current_version = version.data.riotClientVersion;

                    const getProgressionLevel = await getContractProgression();
                    console.log(getProgressionLevel)
                    for (var i = 0; i < getProgressionLevel.Contracts.length; i++) {
                        if (getProgressionLevel.Contracts[i].ContractDefinitionID == currentContract) {
                            var bp_progression = getProgressionLevel.Contracts[i].ProgressionLevelReached;
                        }
                    }

                    const contractData = await getCurrentContract();
                    console.log(contractData.data.content.chapters)
                    var levelcount = 0;
                    for (var i = 0; i < contractData.data.content.chapters.length; i++) { // All Chapters
                        for (var i2 = 0; i2 < contractData.data.content.chapters[i].levels.length; i2++) { // All Levels
                            levelcount++;
                            var card_handler = document.createElement('div');
                            card_handler.className = "bp-reward-card";

                            var tier_header = document.createElement("div");
                            tier_header.classList.add("tier-header");
                            tier_header.appendChild(document.createTextNode("#" + levelcount));

                            var tier_body = document.createElement("div");
                            tier_body.className = "tier-image-wrapper";

                            var tier_name = document.createElement("div");
                            tier_name.classList.add("tier-item-desc");
                            var tier_name_span = document.createElement("span");
                            tier_name_span.appendChild(document.createTextNode("Something"));
                            tier_name.appendChild(tier_name_span);

                            if (contractData.data.content.chapters[i].isEpilogue == true) {
                                $(tier_header).empty();
                                $(tier_header).append("EPILOGUE");
                                tier_header.classList.add("epilogue");
                                tier_name.classList.add("epilogue");
                            }

                            card_handler.appendChild(tier_header);
                            card_handler.appendChild(tier_body);
                            card_handler.appendChild(tier_name);

                            var wrapper = document.getElementById("bp-cards-wrapper");
                            var lastelement = document.getElementById("lastElement");

                            wrapper.insertBefore(card_handler, lastelement)
                            console.log(contractData.data.content.chapters[i].levels[i2].reward.uuid)
                        }
                        for (var i2 = 0; i2 < contractData.data.content.chapters[i].freeRewards.length; i2++) { // All Frees
                            var card_handler = document.createElement('div');
                            card_handler.className = "bp-reward-card";

                            var tier_header = document.createElement("div");
                            tier_header.classList.add("tier-header", "free");
                            tier_header.appendChild(document.createTextNode("#" + levelcount));

                            var tier_body = document.createElement("div");
                            tier_body.className = "tier-image-wrapper";

                            var tier_name = document.createElement("div");
                            tier_name.classList.add("tier-item-desc", "free");
                            var tier_name_span = document.createElement("span");
                            tier_name_span.appendChild(document.createTextNode("Something"));
                            tier_name.appendChild(tier_name_span);

                            card_handler.appendChild(tier_header);
                            card_handler.appendChild(tier_body);
                            card_handler.appendChild(tier_name);

                            var wrapper = document.getElementById("bp-cards-wrapper");
                            var lastelement = document.getElementById("lastElement");

                            wrapper.insertBefore(card_handler, lastelement)
                            console.log(contractData.data.content.chapters[i].freeRewards[i2].uuid)
                        }
                    }
                })
            })
        }
    }
    async function checkBoxes() {
        await fetchBP();
        if (hideFreeItems == true) {
            $('.tier-header.free').parent().css("display", "none");
        }
        $('#bp-cards-wrapper').animate({
            scrollTop: $("#currentLevel").offset().top
        }, 2000);
    }
    checkBoxes();
    $('input[type="checkbox"]').click(function () {
        const dataToParse = fs.readFileSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings/settings.json');
        const bpSettings = JSON.parse(dataToParse)
        if ($(this).prop("checked") == true && $(this).attr("id") == "showFreeTier") {
            $('.tier-header.free').parent().css("display", "block")
            bpSettings.showFreeItems = true;
            fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings/settings.json', JSON.stringify(bpSettings));
        } else if ($(this).prop("checked") == false && $(this).attr("id") == "showFreeTier") {
            $('.tier-header.free').parent().css("display", "none")
            bpSettings.showFreeItems = false;
            fs.writeFileSync(process.env.APPDATA + '/VALTracker/user_data/bp_settings/settings.json', JSON.stringify(bpSettings));
        }
    });
})