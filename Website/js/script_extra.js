function catalogueProduct(catalogue_id,uniqueId,data){
  const myHeaders = new Headers();
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
    "catalogue_id": catalogue_id,
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
      pdpDetails(data,result["data"]["response"]["products"][0])
    })
    .catch(error => alert(error.message));
}

function catalogueMapping(catalogue_id,uniqueId){
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
      
    fetch(`https://pim.unbxd.io/api/v1/catalogueConfig/${catalogue_id}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        
        const imgElement = document.getElementById("logo");
        const image = result["data"]["catalog_logo_url"] ? result["data"]["catalog_logo_url"] : "../images/logo1.png";
        imgElement.src = image;

        catalogueProduct(catalogue_id,uniqueId,result["data"]["properties"])
      }
      )
      .catch(error => alert(error.message));
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('productId'); 
const catalogue_id = urlParams.get('catalogueId');
document.getElementById("logo_url").href =  `./index.html?catalogue_id=${catalogue_id}`;
if(id && catalogue_id){
    catalogueMapping(catalogue_id,id)
}
else{
    alert("Valid ProductId not mentioned in the product url")
}
    


function pdpDetails(data,mappings){
    document.getElementById("loading").style.display = "none";
    document.getElementById("pdpcontent").style.display = "block";
    const imageElement = document.getElementById("productImage");
    const titleElement = document.getElementById("productTitle");
    const productIdElement = document.getElementById("productId");
    
    // imageElement.src = mappings["productImage"] === undefined ? "./No_Image_Available.jpg" : mappings["productImage"][0];
    // var images = mappings["productImage"] === undefined ? ["../images/No_Image_Available.jpg"] : mappings["productImage"];




    titleElement.innerHTML = mappings["productName"];
    productIdElement.innerHTML += " " + mappings["uniqueId"]; 
    let fieldMapping ={} 
    var images = []
    // console.log(mappings,data);
    for (let index in data){
        let fieldId = data[index]["field_id"];
        let fieldGroup = data[index]["group"];
        let fieldName = data[index]["name"];
        let fieldDatatype = data[index]["data_type"];
        if  (fieldDatatype === "image" && mappings[fieldId] !== undefined){
          for(let i=0 ;i <mappings[fieldId].length ;i++){
            images.push(mappings[fieldId][i])
          }
        }
        if (fieldId in mappings){
            if(fieldGroup in fieldMapping){
    
                fieldMapping[fieldGroup].push({"name":fieldName,"value": mappings[fieldId],"data_type":fieldDatatype})
            }
            else{
                fieldMapping[fieldGroup] = [{"name":fieldName,"value": mappings[fieldId],"data_type":fieldDatatype}]
            }
        }  
        // console.log(fieldMapping)
    }
    console.log(images)
    var currentImageIndex = 0;
    function updateSlider() {
      var slider = document.getElementById("slider");
      var image = new Image();
      // var image = document.getElementById("pdp-image");
      image.onload = function() {
        slider.appendChild(image);
        setTimeout(function() {
          image.style.opacity = "1";
        }, 100);
      };
      image.src = images[currentImageIndex];
      image.className = "basic-image"
      image.addEventListener("click", function() {
        var modal = document.getElementById("myModal");
        var modalImage = document.getElementById("modalImage");
        modalImage.src = this.src;
        modal.style.display = "block";
      });
      var prevButton = document.getElementById("prev-btn");
      prevButton.addEventListener("click", prevImage);
    
      var nextButton = document.getElementById("next-btn");
      nextButton.addEventListener("click", nextImage);
    }

    function prevImage() {
      var slider = document.getElementById("slider");
      var imagesCount = images.length;
      var previousImageIndex = currentImageIndex;
      currentImageIndex = (currentImageIndex - 1 + imagesCount) % imagesCount;
      var previousImage = slider.querySelector("img");
      previousImage.style.opacity = "0";
      setTimeout(function() {
        slider.removeChild(previousImage);
        updateSlider();
      }, 1000);
    }
    
    function nextImage() {
      var slider = document.getElementById("slider");
      var imagesCount = images.length;
      var previousImageIndex = currentImageIndex;
      currentImageIndex = (currentImageIndex + 1) % imagesCount;
      var previousImage = slider.querySelector("img");
      previousImage.style.opacity = "0";
      setTimeout(function() {
        slider.removeChild(previousImage);
        updateSlider();
      }, 1000);
    }
    updateSlider();


    var closeButton = document.querySelector(".close");
    closeButton.addEventListener("click", function() {
      var modal = document.getElementById("myModal");
      modal.style.display = "none";
    });
    console.log(fieldMapping)
    let content = document.getElementById("additional_info");
    for (let key of Object.keys(fieldMapping).sort()){
        content.innerHTML += `
            <div class="group"><h3 class="heading-3">${key}</h3></div>
            <hr />
        `
        for (let index in fieldMapping[key]){
            let dataName = fieldMapping[key][index]["name"];
            let dataValue = fieldMapping[key][index]["value"];
            let dataType = fieldMapping[key][index]["data_type"];
            if (dataName === "descriptionHtml"){
                content.innerHTML += `
                    <div class="pdp-detail">
                        <div class="pdp-detail-key"><p class="paragrraph"><b>${dataName}</b> </p></div>
                        <div class="pdp-detail-value desc">${dataValue}</div>
                    <br />
                    </div>
                `
            }
            else if(dataType=== "image"){
              image = ""
              for (var i = 0; i < dataValue.length; i += 1) {
                image += `<img src="${dataValue[i]}" height=100px width=100px class="pdp-image"/>
                <br />`
              }
              content.innerHTML += `
              <div class="pdp-detail">
                  <div class="pdp-detail-key "><p class="paragraph"><b>${dataName}</b> </p></div>
                  <div class="pdp-detail-value pdp-detail-image">
                  ${image}
                  </div>
                </div>`
              
              // content.innerHTML += `<br />
              // </div>
              //         </div>`
            }
            else{
                content.innerHTML += `
                <div class="pdp-detail">
                    <div class="pdp-detail-key"><p class="paragrraph"><b>${dataName}</b> </p></div>
                    <div class="pdp-detail-value"><p class="paragrraph">${dataValue}</p></div>
                <br />
                </div>
            `
            }

        }
    }
}


 
      