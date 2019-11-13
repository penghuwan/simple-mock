require ('./ajaxMock');
require ('./fetchMock');

const xhr = new XMLHttpRequest ();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log (JSON.parse (xhr.responseText));
  }
};
xhr.open ('GET', '/mock');
xhr.send ();

fetch ('/mock')
  .then (res => {
    return res.json ();
  })
  .then (data => {
    console.log (data);
  });
