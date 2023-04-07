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
  if (res) {
    // Get the number of products sent in the response from the backend and calculate the no of page
    const { numberOfProducts } = res;
    const numberOfPages = Math.ceil(numberOfProducts / 20);

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
        window.location.href = `./pdp.html?productId=${data[ind].uniqueId}`;
      });
      const imgElement = document.createElement('img');
      imgElement.className = "pro-img"
      imgElement.setAttribute('src', data[ind].productImage === undefined ? '../images/No_Image_Available.jpg' : data[ind].productImage);
      divElement.appendChild(imgElement);
      const subdivElement = document.createElement('div');
      subdivElement.setAttribute('class', 'des');

      const h5Element = document.createElement('h5');
      h5Element.className = "des-h5"
      h5Element.innerHTML = data[ind].productName;

      const h4Element = document.createElement('h4');
      h4Element.className = "des-h4"
      h4Element.innerHTML = data[ind].uniqueId;

      subdivElement.appendChild(h5Element);
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

function catalogueMapping(){
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
    .then(result => {
      const imgElement = document.getElementById("logo");
      const image = result["data"]["catalog_logo_url"] ? result["data"]["catalog_logo_url"] : "../images/logo1.png";
      imgElement.src = image;
    })
    .catch(error => alert(error.message));
}


// Function to perform the feetch request baseed on the parameters recieved
function catalogueView(inputSearch, page, filter) {
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
  fetch('https://pim.unbxd.io/peppercorn/api/v2/catalogueView/6391b1448f93e67002742cef', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      // console.log(result["facets"])
      // Fill in the filter section based on response recieved
      // eslint-disable-next-line no-use-before-define
      filterSection(result.facets);
      // Fill in the data section based on response recieved
      dataSection(inputSearch, page, result.response);
      // console.log(result["response"]["numberOfProducts"])
    })
    // eslint-disable-next-line no-console
    .catch((error) => console.log('error', error));
}

function fetchValues(checkedValues) {
  //   console.log(checkedValues);
  const facetFilter = [];
  Object.keys(checkedValues).forEach((key) => {
    checkedValues[key].forEach((value) => {
      const filter = `${key}:"${decodeURIComponent(value)}"`;
      facetFilter.push(filter);
    });
  });
  // console.log(facetFilter);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (urlParams.has('search')) {
    const query = urlParams.get('search');
    if (query !== 'null') {
      document.getElementById('search').value = query;
    }
    if (urlParams.has('pageno')) {
      const pageno = urlParams.get('pageno');
      catalogueView(query, pageno, facetFilter);
    } else {
      catalogueView(query, 1, facetFilter);
    }
  } else {
    catalogueView(null, 1, facetFilter);
  }
}

// Function to fill in the filter section of the page
function filterSection(facets) {
  // Acess the sidebar id element
  const filter = document.getElementById('sidebar');
  // Get the keys of the facets
  // eslint-disable-next-line no-undef
  // Iterate through keys and add a title with diffeerent values as checkboxes.
  const facetKeys = Object.keys(facets);

  for (let i = 0; i < facetKeys.length; i += 1) {
    const facetDiv = document.createElement('div');
    const { displayName } = facets[facetKeys[i]];
    const { values } = facets[facetKeys[i]];
    facetDiv.innerHTML += `
        <p>${displayName}</p>
        <hr>
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

  const checkboxes = document.querySelectorAll('input[type="checkbox"].filter');
  checkboxes.forEach((checkbox) => {
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
          }
          return acc;
        }, {});
      let timeoutId;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fetchValues(checkedValues);
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
searchInput.addEventListener('input', debounceSearch);
// Based on the url parameter perform the fetch request calling the Catalogue view function
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const query = urlParams.get('search') || '';
const pageno = urlParams.get('pageno') || 1;
document.getElementById('search').value = query;
catalogueMapping();
catalogueView(query, pageno, []);
