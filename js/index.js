// BoshMessenger, Licensed under WTFPL
// Author: UMRnInside, Anony Kagamine
// Anony Kagamine modified this to support custom data.json :)

// will be array
fortunes = null;
bosh = null;

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

function loadData(json_url="./data.json")
{
    var req = new XMLHttpRequest();
    req.open('GET', json_url);

    req.onload = function() {
        if (req.status == 200) {
            //console.log(req.responseText);
            initDataByJsonText(req.responseText);
        } else {
            console.log("Failed");
        }
    };

    // Handle network errors
    req.onerror = function() {
        console.log("Network Error");
    };

    // Make the request
    req.send();
}

loadData();

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
