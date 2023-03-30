
// Function to perform the feetch request baseed on the parameters recieved
function catalogueView(inputSearch,pageno,filter) {

    var myHeaders = new Headers();
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8");
    myHeaders.append("Connection", "keep-alive");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ajs_user_id=sivanv@unbxd.com; _ga=GA1.2.44711214.1628009891; fs_cid=1.0; fs_uid=#BCTWS#5827173059792896:5552003249360896:::#89e388a9#/1687244231; intercom-device-id-uksd1f47=65dacc19-cc8f-4a38-9280-d7f1930483b8; ajs_user_id=sivanv@unbxd.com; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; _gid=GA1.2.1181530657.1679289145; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTAzLTI4IDA0OjE4OjMwIFVUQyIsImVtYWlsIjoic2l2YW52QHVuYnhkLmNvbSIsInJlZ2lvbnMiOnsidXMiOnsicmVmX3VzZXJfaWQiOjcwMjUxfSwic2ciOnsicmVmX3VzZXJfaWQiOjM4OX0sInVrIjp7InJlZl91c2VyX2lkIjoyNTl9LCJhdSI6eyJyZWZfdXNlcl9pZCI6MjYyfSwidXNfZ2NwIjp7InJlZl91c2VyX2lkIjoyNjZ9fX0.HjcmYCYF2_Jni6WGoGkMqdirdsjGZI15EiDlCNJRp50; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpdmFudkB1bmJ4ZC5jb20iLCJleHBpcnkiOiIyMDIzLTAzLTMxIDA0OjE4OjMwIFVUQyIsInVzZXJfaWQiOiI1ZDA5ZGUyOWIxZDI1MDAwMjNiOTc1MmIiLCJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIxVDA0OjE4OjMwLjc4OVoifQ.afdTOWa8_r12If2N-9ZkK7Wd0ydjQRvm0vM280rMN_w; mp_4d8b093383efd0132a7afde806127f49_mixpanel=%7B%22distinct_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22%24device_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; connect.sid=s%3ArfsVqhM8NaF8eDe-O0xZ-GCC-BxSNgO7.AeW2wRDrJUNK891rbKv15DAcFiiWaXHoqv5O0fWxj80; ajs_group_id=8542a739d0b398ee28a5b32c351e45e1; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; intercom-session-uksd1f47=TkJHUVZxN3pPMVJySWk4RGtkWHhZcXltNFd5Y0JkRHhFMngwYUJrdGd1N2FjRngrUURPbEthanQ1MmpGdWMweC0takNYY29GaHhrd0lidTRsUWNEU3NXUT09--831f39c58176f7b8a7d643f6e9eb71ccc544b2a6; JSESSIONID=o5s6-GZRx9jj4DTZ430OHTjfwx3OftI7RsDWLOyh; connect.sid=s%3AwC9sTFTqlyOa49FMrjBXzO5eWsf--yRT.vU433W3Bf4PulIvQYrUHQZM0eFdIhWezisLjJlek914");
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
    myHeaders.append("Acess-Control-Allow-Origin", "*");

    var raw = JSON.stringify({
        "page": pageno,
        "count": 20,
        "facet_filters": filter,
        "search_str": inputSearch
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    // console.log(inputSearch,pageno,filter)
    fetch("https://pim.unbxd.io/peppercorn/api/v2/catalogueView/6391b1448f93e67002742cef", requestOptions)
        .then(response => response.json())
        .then(result => {
            FilterSection(result["facets"]) // Fill in the filter section based on response recieved
            DataSection_Product(inputSearch,pageno,result["response"]) // Fill in the data section based on response recieved
            // console.log(result["response"]["numberOfProducts"])
        })
        .catch(error => console.log('error', error));
}



// DEBOUNCING SEARCH

// Get the search input element
const searchInput = document.getElementById("search");
// Set the debounce delay time (in milliseconds)
const debounceDelay = 1000;
// Set a variable to hold the timeout ID
let timeoutId;
// Function to perform the search
function performSearch() {
    const searchValue = searchInput.value;
    // Perform the search here with the searchValue
    window.location.href = `./index.html?search=${searchValue}`;
}
// Function to debounce the search function
function debounceSearch() {
    // Clear the previous timeout, if there is one
    clearTimeout(timeoutId);
    // Set a new timeout
    timeoutId = setTimeout(() => {
        performSearch();
    }, debounceDelay);
}
// Add an event listener to the search input
searchInput.addEventListener("input", debounceSearch);


// Based on the url parameter perform the fetch request calling the Catalogue view function
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (urlParams.has('search')) {
    var query = urlParams.get('search');
    if (query !== "null"){
        document.getElementById("search").value = query
    } 
    if (urlParams.has('pageno')){
        var pageno = urlParams.get('pageno');
        catalogueView(query, pageno,[])
    }
    else{
        catalogueView(query,1,[]);
    }
    
}
else{
    catalogueView(null,1,[]);
}

// Function to fill the data section of the catalog
function DataSection_Product(inputSearch,pageeno,res) {
    if (res) {
        // Get the number of products sent in the response from the backend and calculate the no of pages
        no_of_products = res["numberOfProducts"];
        no_of_pages = Math.ceil(no_of_products / 20);

        // Get the pagination section where the pagination with given pages is created
        ul_element = document.getElementsByClassName("pagination")[0];
        ul_element.innerHTML = "";

        // Get the product section where the products is going to be added
        product_element = document.getElementsByClassName("pro-container")[0];
        product_element.innerHTML = "";

        data = res["products"]
        //Iterate through the response data containing a list of products and append it to the html page under the product section
        for (let ind = 0; ind < data.length; ind++) {

            div_element = document.createElement("div");
            div_element.setAttribute("class", "pro");

            img_element = document.createElement("img");
            img_element.setAttribute("src", data[ind].productImage);
            div_element.appendChild(img_element);
            div_name = document.createElement("div");
            div_name.setAttribute("class", "des");

            h5_element = document.createElement("h5");
            h5_element.innerHTML = data[ind]["productName"];

            h4_element = document.createElement("h4");
            h4_element.innerHTML = data[ind]["uniqueId"];

            div_name.appendChild(h5_element);
            div_name.appendChild(h4_element);
            div_element.appendChild(div_name);


            product_element.appendChild(div_element);

            // Add the pagination section with the particular pageno and query text
            if (!document.getElementsByClassName("pagination")[0].hasChildNodes()) {
              createPagination(inputSearch,pageeno,no_of_pages);
            }
        }


    }
    else {
        window.location.href = './404.html';
    }
}


// Function to change the css of pageno on clicking a page 
function SelectPage(el) {
    // This is used for making the current page selected to active which changes the css of the highleted page.
    document.querySelector('.page-item').classList.remove('active');
    document.querySelector(el).parent().classList.add('active');
}

// Function to set multiple attribute to a given tag.
function setMultipleAttributesonElement(elem, elemAttributes) {
    for (var name in elemAttributes) {
      elem.setAttribute(name, elemAttributes[name]);
    }
  }


// Function to creation pagination 
function createPagination(query, pageno,pages) {

    var pageno = Number(pageno);
  
    // Acess the pagination section for thhe pages to be added
    ul_element = document.getElementsByClassName("pagination")[0];
    list_element = document.createElement("li");
  
  
    (pageno === 1) ? list_element.setAttribute("class", "page-item disabled") : setMultipleAttributesonElement(list_element,
         { "class": "page-item", "onclick": `window.location.href='./index.html?search=${query}&pageno=${pageno-1}'` });
  
  
    anchor_element = document.createElement("a");
    anchor_element.setAttribute("class", "page-link");
    anchor_element.innerHTML = "Prev";
    list_element.appendChild(anchor_element);
    ul_element.appendChild(list_element);
  
    // Generate the max and min index of the current pageno (+5 and -5 from current page)
    (pageno - 5 <= 0) ? min_index = 1 : min_index = pageno - 5;
    (pageno + 5 >= pages) ? max_index = pages : max_index = pageno + 5;
  
  
    // Create the pages and add an extra active class to the current page
    for (var i = min_index; i <= max_index; i++) {
      list_element = document.createElement("li");
  
      (i === pageno) ? list_element.setAttribute("class", "page-item active") : list_element.setAttribute("class", "page-item");
  
      anchor_element = document.createElement("a");
      const elem_attributes = {
        "class": "page-link",
        "href": `./index.html?search=${query}&pageno=${i}`,
        "onclick": 'SelectPage(this)',
      }
      setMultipleAttributesonElement(anchor_element, elem_attributes);
      anchor_element.innerHTML = i;
  
      list_element.appendChild(anchor_element);
      ul_element.appendChild(list_element);
    }
  
  
    list_element = document.createElement("li");
  
    (pageno === pages) ? list_element.setAttribute("class", "page-item disabled") : setMultipleAttributesonElement(list_element,
         { "class": "page-item", "onclick": `window.location.href='./index.html?search=${query}&pageno=${pageno+1}'` });
  
    anchor_element = document.createElement("a");
    anchor_element.setAttribute("class", "page-link");
    anchor_element.innerHTML = "Next";
  
    list_element.appendChild(anchor_element);
    ul_element.appendChild(list_element);
  
  }

// Function to fill in the filter section of the page
function FilterSection(facets){
    // Acess the sidebar id element
    var filter = document.getElementById("sidebar");
    // Get the keys of the facets
    keys = Object.keys(facets);

    // Iterate through keys and add a title with diffeerent values as checkboxes.
    for (ind in keys) {
        var fieldName = document.createElement("div");
        fieldName.innerHTML += `
        <p>${facets[keys[ind]]["displayName"]}</p>
        <hr>
        `
        for (let ind2 = 0; ind2 < facets[keys[ind]]["values"].length; ind2 += 2) {

            fieldName.innerHTML += `
                <input type="checkbox" name = ${keys[ind]} value= ${encodeURIComponent(facets[keys[ind]]["values"][ind2])}> 
                ${facets[keys[ind]]["values"][ind2]} (${facets[keys[ind]]["values"][ind2+1]})<br>
            `
        }
        // console.log(fieldName)
        filter.appendChild(fieldName);
    }
    }
