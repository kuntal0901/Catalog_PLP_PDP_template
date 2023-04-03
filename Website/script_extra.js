function catalogueProduct(uniqueId,data){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ajs_user_id=sivanv@unbxd.com; _ga=GA1.2.44711214.1628009891; fs_cid=1.0; fs_uid=#BCTWS#5827173059792896:5552003249360896:::#89e388a9#/1687244231; intercom-device-id-uksd1f47=65dacc19-cc8f-4a38-9280-d7f1930483b8; ajs_user_id=sivanv@unbxd.com; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; _gid=GA1.2.1181530657.1679289145; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTAzLTI4IDA0OjE4OjMwIFVUQyIsImVtYWlsIjoic2l2YW52QHVuYnhkLmNvbSIsInJlZ2lvbnMiOnsidXMiOnsicmVmX3VzZXJfaWQiOjcwMjUxfSwic2ciOnsicmVmX3VzZXJfaWQiOjM4OX0sInVrIjp7InJlZl91c2VyX2lkIjoyNTl9LCJhdSI6eyJyZWZfdXNlcl9pZCI6MjYyfSwidXNfZ2NwIjp7InJlZl91c2VyX2lkIjoyNjZ9fX0.HjcmYCYF2_Jni6WGoGkMqdirdsjGZI15EiDlCNJRp50; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpdmFudkB1bmJ4ZC5jb20iLCJleHBpcnkiOiIyMDIzLTAzLTMxIDA0OjE4OjMwIFVUQyIsInVzZXJfaWQiOiI1ZDA5ZGUyOWIxZDI1MDAwMjNiOTc1MmIiLCJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIxVDA0OjE4OjMwLjc4OVoifQ.afdTOWa8_r12If2N-9ZkK7Wd0ydjQRvm0vM280rMN_w; mp_4d8b093383efd0132a7afde806127f49_mixpanel=%7B%22distinct_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22%24device_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; connect.sid=s%3ArfsVqhM8NaF8eDe-O0xZ-GCC-BxSNgO7.AeW2wRDrJUNK891rbKv15DAcFiiWaXHoqv5O0fWxj80; ajs_group_id=8542a739d0b398ee28a5b32c351e45e1; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; intercom-session-uksd1f47=TkJHUVZxN3pPMVJySWk4RGtkWHhZcXltNFd5Y0JkRHhFMngwYUJrdGd1N2FjRngrUURPbEthanQ1MmpGdWMweC0takNYY29GaHhrd0lidTRsUWNEU3NXUT09--831f39c58176f7b8a7d643f6e9eb71ccc544b2a6; JSESSIONID=o5s6-GZRx9jj4DTZ430OHTjfwx3OftI7RsDWLOyh");
    myHeaders.append("Origin", "https://pim.unbxd.io");
    myHeaders.append("Referer", "https://pim.unbxd.io/catalogueView/");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");

    var raw = JSON.stringify({
    "catalogue_id": "6391b1448f93e67002742cef",
    "unique_id": uniqueId
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueProduct", requestOptions)
    .then(response => response.json())
    .then(result => {
        // console.log(result["data"]["response"]["products"])
        fill_table(data,result["data"]["response"]["products"][0])
    })
    .catch(error => console.log('error', error));
}
// catalogueProduct()

function catalogueMapping(uniqueId){
    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ajs_user_id=sivanv@unbxd.com; _ga=GA1.2.44711214.1628009891; fs_cid=1.0; fs_uid=#BCTWS#5827173059792896:5552003249360896:::#89e388a9#/1687244231; intercom-device-id-uksd1f47=65dacc19-cc8f-4a38-9280-d7f1930483b8; ajs_user_id=sivanv@unbxd.com; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; _gid=GA1.2.1181530657.1679289145; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTAzLTI4IDA0OjE4OjMwIFVUQyIsImVtYWlsIjoic2l2YW52QHVuYnhkLmNvbSIsInJlZ2lvbnMiOnsidXMiOnsicmVmX3VzZXJfaWQiOjcwMjUxfSwic2ciOnsicmVmX3VzZXJfaWQiOjM4OX0sInVrIjp7InJlZl91c2VyX2lkIjoyNTl9LCJhdSI6eyJyZWZfdXNlcl9pZCI6MjYyfSwidXNfZ2NwIjp7InJlZl91c2VyX2lkIjoyNjZ9fX0.HjcmYCYF2_Jni6WGoGkMqdirdsjGZI15EiDlCNJRp50; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpdmFudkB1bmJ4ZC5jb20iLCJleHBpcnkiOiIyMDIzLTAzLTMxIDA0OjE4OjMwIFVUQyIsInVzZXJfaWQiOiI1ZDA5ZGUyOWIxZDI1MDAwMjNiOTc1MmIiLCJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIxVDA0OjE4OjMwLjc4OVoifQ.afdTOWa8_r12If2N-9ZkK7Wd0ydjQRvm0vM280rMN_w; mp_4d8b093383efd0132a7afde806127f49_mixpanel=%7B%22distinct_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22%24device_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; ajs_group_id=8542a739d0b398ee28a5b32c351e45e1; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; intercom-session-uksd1f47=TkJHUVZxN3pPMVJySWk4RGtkWHhZcXltNFd5Y0JkRHhFMngwYUJrdGd1N2FjRngrUURPbEthanQ1MmpGdWMweC0takNYY29GaHhrd0lidTRsUWNEU3NXUT09--831f39c58176f7b8a7d643f6e9eb71ccc544b2a6; JSESSIONID=o5s6-GZRx9jj4DTZ430OHTjfwx3OftI7RsDWLOyh; connect.sid=s%3AAwEGs1LuLNCBWyRB5KPV74hpZxOGqmis.hD0YWcyZZlToodQ6zLBE5LCvTVziTjyOIbfeOFWbscU");
    myHeaders.append("Referer", "https://pim.unbxd.io/catalogueView/");
    myHeaders.append("Sec-Fetch-Dest", "empty");
    myHeaders.append("Sec-Fetch-Mode", "cors");
    myHeaders.append("Sec-Fetch-Site", "same-origin");
    myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36");
    myHeaders.append("X-Requested-With", "XMLHttpRequest");
    myHeaders.append("sec-ch-ua", "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Google Chrome\";v=\"110\"");
    myHeaders.append("sec-ch-ua-mobile", "?0");
    myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
    
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
    fetch("https://pim.unbxd.io/api/v1/catalogueConfig/6391b1448f93e67002742cef", requestOptions)
      .then(response => response.json())
      .then(result => catalogueProduct(uniqueId,result["data"]["properties"]))
      .catch(error => console.log('error', error));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const Id = urlParams.get('productId');
console.log(Id)
catalogueMapping(Id)


function fill_table(data,mappings){
    
    image = document.getElementById("productImage");
    title = document.getElementById("productTitle");
    id = document.getElementById("productId");
    image.src = mappings["productImage"] === undefined ? "./No_Image_Available.jpg" : mappings["productImage"][0];
    title.innerHTML = mappings["productName"];
    id.innerHTML += " " + mappings["uniqueId"]; 
    
    field_mapping ={} 
    for (i in data){
        if (data[i]["field_id"] in mappings){
            if(data[i]["group"] in field_mapping){
                field_mapping[data[i]["group"]].push({"name":data[i]["name"],"value": mappings[data[i]["field_id"]],"data_type":data[i]["data_type"]})
            // field_mapping[data[i]["name"]] = {"value": mappings[data[i]["field_id"]],"data_type":data[i]["data_type"],"group":data[i]["group"]};
            }
            else{
            field_mapping[data[i]["group"]] = [{"name":data[i]["name"],"value": mappings[data[i]["field_id"]],"data_type":data[i]["data_type"]}]
            }
        }
        
    }
    
    content = document.getElementById("additional_info");
    for (key of Object.keys(field_mapping).sort()){
        content.innerHTML += `
            <hr />
            <div id="group"><h3>${key}</h3></div>
            <hr />
        `
        for (i in field_mapping[key]){
            if (field_mapping[key][i]["name"] === "descriptionHtml"){
                content.innerHTML += `
                    <div id="key_value">
                        <div id="key"><p><b>${field_mapping[key][i]["name"]}</b> </p></div>
                        <div class="value desc">${field_mapping[key][i]["value"]}</div>
                    <br />
                    </div>
                `
            }
            else if(field_mapping[key][i]["data_type"] === "image"){
                content.innerHTML += `
                <div id="key_value">
                    <div id="key"><p><b>${field_mapping[key][i]["name"]}</b> </p></div>
                    <div class="value"><img src="${field_mapping[key][i]["value"]}" height=100px width=100px/></div>
                <br />
                </div>
            `
            }
            else{
                content.innerHTML += `
                <div id="key_value">
                    <div id="key"><p><b>${field_mapping[key][i]["name"]}</b> </p></div>
                    <div class="value"><p>${field_mapping[key][i]["value"]}</p></div>
                <br />
                </div>
            `
            }

        }
    }
    // console.log(Object.keys(field_mapping).length,Object.keys(mappings).length);
    // table = document.getElementsByClassName("tbody")[0];
    // keys = Object.keys(field_mapping);

    // for (key of Object.keys(field_mapping)){
    //     tr = document.createElement("tr");
    //     td_key = document.createElement("td");
    //     td_value = document.createElement("td");
    //     td_key.innerHTML = key;
    //     // console.log(key,typeof(field_mapping[key]))
    //     if (field_mapping[key]["data_type"] == "image"){
    //         td_value.innerHTML = `<img src="${field_mapping[key]["value"]}" height="100px" width="100px"/>`
    //     }
    //     else{
    //         td_value.innerHTML = field_mapping[key]["value"];
    //     }
        
    //     tr.appendChild(td_key);
    //     tr.appendChild(td_value);
    //     table.appendChild(tr);
    //     // table.innerHTML +=`
    //     //     <tr>
    //     //         <td>${key}</td>
    //     //         <td>${field_mapping[key]}</td>
    //     //     </tr>
    //     // `
    // }
}