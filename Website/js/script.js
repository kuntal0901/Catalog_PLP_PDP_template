// Function to set multiple attribute to a given tag.
function setMultipleAttributesonElement(elem, elemAttributes) {
  Object.keys(elemAttributes).forEach((name) => {
    elem.setAttribute(name, elemAttributes[name]);
  });
}
// Function to change the css of pageno on clicking a page
// eslint-disable-next-line no-unused-vars
function SelectPage(el) {
  // change css of selected page.
  document.querySelector('.page-item').classList.remove('active');
  document.querySelector(el).parent().classList.add('active');
}

function safeTraverse(obj, paths = []) {
  let val = obj;
  let idx = 0;

  while (idx < paths.length) {
      if (!val) {
          return null;
      }
      val = val[paths[idx]];
      idx++;
  }
  return val === 0 ? '0' : val;
}

// Function to creation pagination
function createPagination(query, pageno, pages) {
  const pageNo = Number(pageno);

  // Acess the pagination section for thhe pages to be added
  const paginationElement = document.getElementById('pagination');
  let listElement = document.createElement('li');

  if (pageNo === 1) {
    listElement.setAttribute('class', 'page-item disabled');
  } else {
    setMultipleAttributesonElement(
      listElement,
      { class: 'page-item', onclick: `window.location.href='./index.html?search=${query}&pageno=${pageNo - 1}'` },
    );
  }

  let anchorElement = document.createElement('a');
  anchorElement.setAttribute('class', 'page-link');
  anchorElement.innerHTML = 'Prev';
  listElement.appendChild(anchorElement);
  paginationElement.appendChild(listElement);

  // Generate the max and min index of the current pageno (+5 and -5 from current page)
  const minIndex = (pageNo - 5 <= 0) ? 1 : pageNo - 5;
  const maxIndex = (pageNo + 5 >= pages) ? pages : pageNo + 5;
  // Create the pages and add an extra active class to the current page
  for (let i = minIndex; i <= maxIndex; i += 1) {
    listElement = document.createElement('li');
    listElement.setAttribute('class', (i === pageNo) ? 'page-item active' : 'page-item');
    anchorElement = document.createElement('a');
    const eleAttributes = {
      class: 'page-link',
      href: `./index.html?search=${query}&pageno=${i}`,
      onclick: 'SelectPage(this)',
    };
    setMultipleAttributesonElement(anchorElement, eleAttributes);
    anchorElement.innerHTML = i;
    listElement.appendChild(anchorElement);
    paginationElement.appendChild(listElement);
  }
  listElement = document.createElement('li');

  if (pageNo === pages) {
    listElement.setAttribute('class', 'page-item disabled');
  } else {
    setMultipleAttributesonElement(
      listElement,
      { class: 'page-item', onclick: `window.location.href='./index.html?search=${query}&pageno=${pageNo + 1}'` },
    );
  }

  anchorElement = document.createElement('a');
  anchorElement.setAttribute('class', 'page-link');
  anchorElement.innerHTML = 'Next';

  listElement.appendChild(anchorElement);
  paginationElement.appendChild(listElement);
}

// Function to fill the data section of the catalog
function dataSection(inputSearch, page, res) {
  // if(inputSearch !== ""){
  //   document.getElementById("breadcrums").style.display = "block";
  //   document.getElementById("total-products").innerHTML = `Number of products: <b>${res.numberOfProducts}</b>`;
  //   document.getElementById("current-pageno").innerHTML = `Current page no: <b>${page}</b>`;
  //   document.getElementById("search-results") = `Search results for <b>${inputSearch}</b>`;
  // }
  page = Number(page)
  if (res.numberOfProducts > 0) {
    // Get the number of products sent in the response from the backend and calculate the no of page
    const { numberOfProducts } = res;
    const numberOfPages = Math.ceil(numberOfProducts / 20);
    console.log(numberOfPages)
    if (numberOfProducts > 20){
        if(page ===  1){
          document.getElementById("next").style.display = "block";
          document.getElementById("prev").style.display = "none";
        }
        else{
          if (page === numberOfPages){
            document.getElementById("prev").style.display = "block";
            document.getElementById("next").style.display = "none";
            }
          else{
            document.getElementById("prev").style.display = "block";
            document.getElementById("next").style.display = "block";
            }
          }
    }
    else{
      
    }
    
    // Get the pagination section where the pagination with given pages is created
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    // Get the product section where the products is going to be added
    const productContainerElement = document.getElementById('pro-container');
    productContainerElement.innerHTML = '';

    const data = res.products;
    // eslint-disable-next-line max-len
    // Iterate through the response data containing a list of products and append it to the html page under the product section

    for (let ind = 0; ind < data.length; ind += 1) {
      const divElement = document.createElement('div');
      divElement.setAttribute('class', 'pro');
      divElement.addEventListener('click', () => {
        window.location.href = `./pdp.html?catalogueId=${catalogue_id}&productId=${data[ind].uniqueId}`;
      });
      const imgElement = document.createElement('img');
      imgElement.className = "pro-img"
      console.log(data[ind].productImage)
      imgElement.setAttribute('src', data[ind].productImage === undefined ? '../images/No_Image_Available.jpg' : data[ind].productImage[0]);
      divElement.appendChild(imgElement);

      const subdivElement = document.createElement('div');
      subdivElement.setAttribute('class', 'des');
      if(data[ind].productName !== undefined){
        const h5Element = document.createElement('h5');
        h5Element.className = "des-h5"
        h5Element.innerHTML = data[ind].productName;
        subdivElement.appendChild(h5Element);
      }

      const h4Element = document.createElement('h4');
      h4Element.className = "des-h4"
      h4Element.innerHTML = data[ind].uniqueId;

      
      subdivElement.appendChild(h4Element);
      divElement.appendChild(subdivElement);

      productContainerElement.appendChild(divElement);

      // Add the pagination section with the particular pageno and query text
      if (!document.getElementById('pagination').hasChildNodes() && numberOfPages > 1) {
        createPagination(inputSearch, page, numberOfPages);
      }
    }
  } else {
    window.location.href = './404.html';
  }
}

function catalogueMapping(catalogue_id){
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
      console.log(image);
      imgElement.src = image;
    })
    .catch(error => alert(error.message));
}


// Function to perform the feetch request baseed on the parameters recieved
function catalogueView(catalogueid,inputSearch, page, filter) {
  const myHeaders = new Headers();
  myHeaders.append('Accept', '*/*');
  myHeaders.append('Accept-Language', 'en-GB,en-US;q=0.9,en;q=0.8');
  myHeaders.append('Connection', 'keep-alive');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Cookie', 'ajs_user_id=sivanv@unbxd.com; _ga=GA1.2.44711214.1628009891; fs_cid=1.0; fs_uid=#BCTWS#5827173059792896:5552003249360896:::#89e388a9#/1687244231; intercom-device-id-uksd1f47=65dacc19-cc8f-4a38-9280-d7f1930483b8; ajs_user_id=sivanv@unbxd.com; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; _gid=GA1.2.1181530657.1679289145; _un_sso_uid=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjpudWxsLCJleHBpcnkiOiIyMDIzLTAzLTI4IDA0OjE4OjMwIFVUQyIsImVtYWlsIjoic2l2YW52QHVuYnhkLmNvbSIsInJlZ2lvbnMiOnsidXMiOnsicmVmX3VzZXJfaWQiOjcwMjUxfSwic2ciOnsicmVmX3VzZXJfaWQiOjM4OX0sInVrIjp7InJlZl91c2VyX2lkIjoyNTl9LCJhdSI6eyJyZWZfdXNlcl9pZCI6MjYyfSwidXNfZ2NwIjp7InJlZl91c2VyX2lkIjoyNjZ9fX0.HjcmYCYF2_Jni6WGoGkMqdirdsjGZI15EiDlCNJRp50; _un_csrf=eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6InNpdmFudkB1bmJ4ZC5jb20iLCJleHBpcnkiOiIyMDIzLTAzLTMxIDA0OjE4OjMwIFVUQyIsInVzZXJfaWQiOiI1ZDA5ZGUyOWIxZDI1MDAwMjNiOTc1MmIiLCJ0aW1lc3RhbXAiOiIyMDIzLTAzLTIxVDA0OjE4OjMwLjc4OVoifQ.afdTOWa8_r12If2N-9ZkK7Wd0ydjQRvm0vM280rMN_w; mp_4d8b093383efd0132a7afde806127f49_mixpanel=%7B%22distinct_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22%24device_id%22%3A%20%22186cf4aae0dfe8-07f65447b74e8f-1f525634-29b188-186cf4aae0e1c0d%22%2C%22mp_lib%22%3A%20%22Segment%3A%20web%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; connect.sid=s%3ArfsVqhM8NaF8eDe-O0xZ-GCC-BxSNgO7.AeW2wRDrJUNK891rbKv15DAcFiiWaXHoqv5O0fWxj80; ajs_group_id=8542a739d0b398ee28a5b32c351e45e1; ajs_anonymous_id=0d8cfecc-572a-4fb9-8771-7f8ebd343592; intercom-session-uksd1f47=TkJHUVZxN3pPMVJySWk4RGtkWHhZcXltNFd5Y0JkRHhFMngwYUJrdGd1N2FjRngrUURPbEthanQ1MmpGdWMweC0takNYY29GaHhrd0lidTRsUWNEU3NXUT09--831f39c58176f7b8a7d643f6e9eb71ccc544b2a6; JSESSIONID=o5s6-GZRx9jj4DTZ430OHTjfwx3OftI7RsDWLOyh; connect.sid=s%3AwC9sTFTqlyOa49FMrjBXzO5eWsf--yRT.vU433W3Bf4PulIvQYrUHQZM0eFdIhWezisLjJlek914');
  myHeaders.append('Origin', 'https://pim.unbxd.io');
  myHeaders.append('Referer', 'https://pim.unbxd.io/catalogueView/');
  myHeaders.append('Sec-Fetch-Dest', 'empty');
  myHeaders.append('Sec-Fetch-Mode', 'cors');
  myHeaders.append('Sec-Fetch-Site', 'same-origin');
  myHeaders.append('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36');
  myHeaders.append('X-Requested-With', 'XMLHttpRequest');
  myHeaders.append('sec-ch-ua', '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"');
  myHeaders.append('sec-ch-ua-mobile', '?0');
  myHeaders.append('sec-ch-ua-platform', '"macOS"');
  myHeaders.append('Acess-Control-Allow-Origin', '*');
  const raw = JSON.stringify({
    page,
    count: 20,
    facet_filters: filter,
    search_str: inputSearch,
  });
  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  // console.log(inputSearch,pageno,filter)
  fetch(`https://pim.unbxd.io/peppercorn/api/v2/catalogueView/${catalogueid}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result["facets"])
      // Fill in the filter section based on response recieved
      // eslint-disable-next-line no-use-before-define
      console.log(result.facets);
      if (result.facets){
        filterSection(result.facets);
      }
      // else{
      //   document.getElementById("sidebar").style.display="none";
      //   document.getElementById("content").style.marginLeft="0";
      // }
      // Fill in the data section based on response recieved
      dataSection(inputSearch, page, result.response);
      // console.log(result["response"]["numberOfProducts"])
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log('error', error));
}

function fetchValues(catalogueid,search,pageno,checkedValues) {
  //   console.log(checkedValues);
  document.getElementById("pro-container").innerHTML =  `
    <div class="pro">
    <img src="../images/giphy.gif" class="pro-img" />
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
    </div> 
    <div class="pro">
  <img src="../images/giphy.gif" class="pro-img"/>
  <div class="des">
      <h5 class="des-h5"> Title</h5>
      <h4 class="des-h4"> Id</h4>
  </div>
  </div> 
  <div class="pro">
    <img src="../images/giphy.gif" class="pro-img"/>
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
  </div> 
  <div class="pro">
    <img src="../images/giphy.gif" class="pro-img"/>
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
  </div> 
  <div class="pro">
    <img src="../images/giphy.gif" class="pro-img"/>
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
  </div> 
  <div class="pro">
    <img src="../images/giphy.gif" class="pro-img"/>
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
  </div> 
  <div class="pro">
    <img src="../images/giphy.gif" class="pro-img"/>
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
  </div> 
  <div class="pro">
    <img src="../images/giphy.gif" class="pro-img"/>
    <div class="des">
        <h5 class="des-h5"> Title</h5>
        <h4 class="des-h4"> Id</h4>
    </div>
  </div> 
  `

  checkedValues = JSON.parse(localStorage.getItem('checkboxState'));
  const facetFilter = [];
    if (checkedValues !==null){
      Object.keys(checkedValues).forEach((key) => {
      checkedValues[key].forEach((value) => {
        const filter = `${key}:"${decodeURIComponent(value)}"`;
        facetFilter.push(filter);
      });
    });
  }
  
  catalogueView(catalogue_id,query,pageno,facetFilter)
  // console.log(catalogueid,search,pageno,facetFilter);
}

// Function to fill in the filter section of the page
function filterSection(facets) {
  // Acess the sidebar id element
  const filter = document.getElementById('sidebar');
  // Get the keys of the facets
  // eslint-disable-next-line no-undef
  // Iterate through keys and add a title with diffeerent values as checkboxes.
  const facetKeys = Object.keys(facets);
  const facetDiv = document.getElementById('sidebar-body');
  facetDiv.innerHTML = "";
  for (let i = 0; i < facetKeys.length ; i += 1) {
    
    const { displayName } = facets[facetKeys[i]];
    const { values } = facets[facetKeys[i]];
    if(values.length > 0){
        facetDiv.innerHTML += `
        <br>
        <p class="display-name">${displayName}</p>
        <hr style="border: 2px solid  #A9A9A9">
        
        `;

    for (let j = 0; j < values.length; j += 2) {
      const valueCheckbox = document.createElement('input');
      valueCheckbox.type = 'checkbox';
      valueCheckbox.className = 'filter';
      valueCheckbox.name = facetKeys[i];
      valueCheckbox.value = encodeURIComponent(values[j]);

      const valueLabel = document.createTextNode(` ${values[j]} (${values[j + 1]})`);
      const valueSpan = document.createElement('span');
      valueSpan.appendChild(valueCheckbox);
      valueSpan.appendChild(valueLabel);

      facetDiv.appendChild(valueSpan);
      facetDiv.appendChild(document.createElement('br'));
    }
    filter.appendChild(facetDiv);
    }

  }
  

  const checkboxes = document.querySelectorAll('input[type="checkbox"].filter');
  const storedState = JSON.parse(localStorage.getItem('checkboxState'));

  checkboxes.forEach((checkbox) => {
    if (storedState && storedState[checkbox.name] && storedState[checkbox.name].includes(checkbox.value)) {
      checkbox.checked = true;
    }
    checkbox.addEventListener('change', () => {
      // Get the values of all checked checkboxes
      const checkedValues = Array.from(checkboxes)
        // eslint-disable-next-line no-shadow
        .reduce((acc, checkbox) => {
          if (checkbox.checked) {
            // If the checkbox is checked, add its value to its group in the accumulator object
            if (checkbox.name in acc) {
              acc[checkbox.name].push(checkbox.value);
            } else {
              acc[checkbox.name] = [checkbox.value];
            }
          }else {
            // If the checkbox is unchecked, remove its value from the accumulator object
            if (checkbox.name in acc) {
              acc[checkbox.name] = acc[checkbox.name].filter((value) => value !== checkbox.value);
            }
          }
          return acc;
        }, {});
      console.log(checkedValues)
      localStorage.setItem('checkboxState', JSON.stringify(checkedValues));
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchValues();
      }, 500);
    });
  });
}

// DEBOUNCING SEARCH

// Get the search input element
const searchInput = document.getElementById('search');
// Set the debounce delay time (in milliseconds)
const debounceDelay = 1000;
// Set a variable to hold the timeout ID
let timeoutId;
// Function to perform the search
function performSearch() {
  const searchValue = searchInput.value;
  // Perform the search here with the searchValue
  window.location.href = `./index.html?catalogue_id=${catalogue_id}&search=${searchValue}`;
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
searchInput.addEventListener('input', debounceSearch);

function showClearButton() {
  var input = document.getElementById("search");
  var clearButton = document.getElementById("clear-button");
  if (input.value) {
    clearButton.style.display = "flex";
  } else {
    clearButton.style.display = "none";
  }
  localStorage.setItem("my-input-value", input.value);
  localStorage.setItem("clear-button-display", clearButton.style.display);
}

function clearInput() {
  var input = document.getElementById("search");
  input.value = "";
  showClearButton();
  performSearch();
}

document.addEventListener("DOMContentLoaded", function(event) { 
  var input = document.getElementById("search");
  var clearButton = document.getElementById("clear-button");
  var inputValue = localStorage.getItem("my-input-value");
  var buttonDisplay = localStorage.getItem("clear-button-display");
  if (inputValue) {
    input.value = inputValue;
  }
  if (buttonDisplay) {
    clearButton.style.display = buttonDisplay;
  }
});



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const query = urlParams.get('search') || '';
const pageno = urlParams.get('pageno') || 1;
const catalogue_id = urlParams.get('catalogue_id');
console.log(query);
document.getElementById('search').value = query;

catalogueMapping(catalogue_id);
// catalogueView(query, pageno,[]);

fetchValues(catalogue_id,query,pageno,[]);

document.getElementById("logo_url").href =  `./index.html?catalogue_id=${catalogue_id}`;


function prevpage(){
  let url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);
  const pageno = Number(urlParams.get('pageno')) || 1;
  
  urlParams.set('pageno', pageno-1);
  url.search = urlParams.toString();
  window.location.href = url.toString();
}
// document.getElementById("prev-btn").addEventListener("click",prevpage())
function nextpage(){
  let url = new URL(window.location.href);
  const urlParams = new URLSearchParams(url.search);
  const pageno = Number(urlParams.get('pageno')) || 1;
  
  urlParams.set('pageno', pageno+1);
  url.search = urlParams.toString();

  window.location.href = url.toString();
}