// BoshMessenger, Licensed under WTFPL
// Author: UMRnInside, Anony Kagamine
// Anony Kagamine modified this to support custom data.json :)

// will be array
fortunes = null;
bosh = null;
const default_title = "The Positive Messenger in UTF-8";

function initDataByJsonText(text) {
    var jsonobj = JSON.parse(text);
    var af, bf, fort;
    if (jsonobj.after.length * jsonobj.before.length * jsonobj.famous.length < 4096) {
        alert("FAIL: Cannot make at least 4096 fortunes.");
        return;
    }
    if (jsonobj.bosh.length < 16) {
        alert("FAIL: The count of bosh should be at least 16.");
        return;
    }
    fortunes = new Array();
    for (af in jsonobj.after) {
        for (bf in jsonobj.before) {
            for (fort in jsonobj.famous) {
                var as = jsonobj.after[af];
                var bs = jsonobj.before[bf];
                var fs = jsonobj.famous[fort];
                var tstr = fs.replace(/a/, bs).replace(/b/, as);
                fortunes.push(tstr.replace(/x/g, "这件事"));
            }
        }
    }

    bosh = new Array();
    for (b in jsonobj.bosh) {
        var text = jsonobj.bosh[b].replace(/x/g, "这件事");
        bosh.push(text);
    }
}

function loadData(json_url="./data.json", sync=false)
{
    var req = new XMLHttpRequest();
    req.open('GET', json_url, sync);

    req.onload = function() {
        if (req.status == 200) {
            //console.log(req.responseText);
            initDataByJsonText(req.responseText);
            changeHeaderTitle("Complete!");
            setTimeout(function(){changeHeaderTitle(default_title)}, 3000);
        } else {
            console.log("Failed:", req.status);
        }
    };

    // Handle network errors
    req.onerror = function() {
        console.log("Network Error");
    };
    
    // Notify user that we're loading
    changeHeaderTitle("Loading bosh...");
    // Make the request
    req.send();
}

function changeHeaderTitle(text) {
    document.getElementById("header_title").innerHTML = text;
}

function appendBoshDataAlternative(msgdataobj) {
    var tr_entry = document.createElement("tr")
    
    var radio_element = document.createElement("input")
    radio_element.type = "radio"
    radio_element.name = "bosh_version"
    radio_element.value = msgdataobj.url
    radio_element.innerText = msgdataobj.title
    radio_element.addEventListener("change", function(){loadData(this.value, true)})
    
    var title_td = document.createElement("td")
    title_td.appendChild(radio_element);
    tr_entry.appendChild(title_td)
    
    var provider_td = docuemnt.createElement("td")
    provider_td.innerText = msgdataobj.provider
    tr_entry.appendChild(provider_td)
    
    var desc_td = docuemnt.createElement("td")
    desc_td.innerText = msgdataobj.description;
    tr_entry.appendChild(desc_td);
    
    document.getElementById("boshdata").appendChild(tr_entry)
}
function loadMDI(mdi_url="../MessengerDataIndex/index.json") {
    var req = new XMLHttpRequest();
    req.open('GET', mdi_url);
    req.onload = function() {
        if (req.status == 200) {
            var md_list = JSON.parse(req.responseText);
            for (msgdataobj in md_list) {
                appendBoshDataAlternative(msgdataobj);
            }
        } else {
            console.log("Load MDI Failed:", req.status);
        }
    };
}

loadData();
loadMDI();

const decodedArea = document.getElementById('decoded-area');
const encodedArea = document.getElementById('encoded-area');
const decodeBtn = document.getElementById('decode-btn');
const encodeBtn = document.getElementById('encode-btn');

encodeBtn.addEventListener('click', e=>{
    encodedArea.value = '';
    const encoded = boshEncode(decodedArea.value);
    encodedArea.value = encoded;
});

decodeBtn.addEventListener('click', e=>{
    decodedArea.value = '';
    const decoded = boshDecode(encodedArea.value);
    decodedArea.value = decodeURIComponent(decoded);
});
