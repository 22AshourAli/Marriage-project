// ----------------- Start Global
var documentHTML = document;

var الزوج = documentHTML.getElementById("الزوج"),
   الزوجة = documentHTML.getElementById("الزوجة"),
   dateTime = documentHTML.getElementById('dateTime'),
   ملاحظات = documentHTML.getElementById('ملاحظات')
   btnAdd = documentHTML.getElementById("btnAdd"),
   btnUpdate = documentHTML.getElementById("btnUpdate"),
   searchBook = documentHTML.getElementById("searchBook"),
   alertName = documentHTML.getElementById("alertName"),
   alerDate = documentHTML.getElementById("alerDate")
   alertUrl = documentHTML.getElementById("alertUrl"),
   alertExite = documentHTML.getElementById("alertExite"),
   booksContainer = [],
   indexUpdate = 0;

// ----------------- When Start

if (getLocal() !== null) {
   booksContainer = getLocal();
   displayData();
}

// ----------------- Start Events
btnAdd.onclick = function () {
   addBook();
};

btnUpdate.onclick = function () {
   updateData();
};

searchBook.oninput = function () {
   searchData();
};

// ----------------- Start Function

function addBook() {
   if ((nameValidation() === true) & (urlValidation() === true) & (dateValidation() === true )) {
      var book = {
         name: الزوج.value,
         url: الزوجة.value,
         date: dateTime.value,
         notes:ملاحظات.value,
      };
      booksContainer.push(book);
      // console.log(booksContainer);
      displayData();
      setLocal();
      resetForm();
   }
}

function displayData() {
   var tableData = "";
   var term = searchBook.value.toLowerCase(); // ""

   for (var i = 0; i < booksContainer.length; i++) {
      if (booksContainer[i].name.toLowerCase().includes(term)) {
         tableData += `
         <tr class=''>
         <td >${booksContainer[i].name.toLowerCase().replaceAll(term, `<span class="bg-info">${term}</span>`)}</td> 
         <td>
            <p class="small text-truncate" style="max-width: 250px">${booksContainer[i].url}</p>
         </td>
         <td>
         <p class="small text-truncate" style="max-width: 250px">${booksContainer[i].date}
         </td>
         <td>
                  <p class="small text-truncate" style="max-width: 250px">${booksContainer[i].notes}

         </td>
         <td>
          <input type="checkbox" name="القسيمة" id="القسيمة">
          <input type="checkbox" name="القسيمة" id="القسيمة">
         </td>
      
              
   <td>
     <button class="btn w-100 btn-outline-warning" onclick="setUpdateInput(${i})">
                  <i class="fa-regular fa-pen-to-square"></i>
               </button>
   </td>
             
   <td>
                  <button class="btn w-100 btn-outline-danger" onclick="deleteRow(${i})">
                  <i class="fa-solid fa-trash"></i>
               </button>
   </td>


      </tr>
         
         `;
      }
   }

   documentHTML.getElementById("tableBody").innerHTML = tableData;
}

function deleteRow(index) {
   booksContainer.splice(index, 1);
   setLocal();
   displayData();
   // console.log(booksContainer);
}

function setUpdateInput(index) {
   indexUpdate = index;
   //   console.log(booksContainer.at(index));

   الزوج.value = booksContainer.at(index).name;
   الزوجة.value = booksContainer.at(index).url;
   dateTime.value = booksContainer.at(index).date;
   ملاحظات.value = booksContainer.at(index).notes;

   btnAdd.classList.add("d-none");
   btnUpdate.classList.remove("d-none");
}

function updateData() {
   var book = {
      name: الزوج.value,
      url: الزوجة.value,
      date: dateTime.value,
      notes: ملاحظات.value,
   };

   booksContainer.splice(indexUpdate, 1, book);
   setLocal();
   displayData();
   resetForm();

   btnUpdate.classList.add("d-none");
   btnAdd.classList.remove("d-none");

   // console.log(booksContainer);
}

function searchData() {
   displayData();
}

function resetForm() {
   الزوج.value = "";
   الزوجة.value = "";
   dateTime.value = "";
   ملاحظات.value = "";
}

function setLocal() {
   localStorage.setItem("booksContainer", JSON.stringify(booksContainer));
}

function getLocal() {
   return JSON.parse(localStorage.getItem("booksContainer"));
}

// ----------------- Start Validation
function nameValidation() {
   if (الزوج.value === "") {
      alertName.classList.remove("d-none"); //show alert
      return false;
   } else {
      alertName.classList.add("d-none"); //hide alert
      return true;
   }
}


function urlValidation() {

if (الزوجة.value === "") {
      alertUrl.classList.remove("d-none"); //show alert
      return false;
   } else {
      alertUrl.classList.add("d-none"); //hide alert
      return true;
   }

}

function dateValidation() {
      if (dateTime.value === "") {
      alerDate.classList.remove("d-none"); //show alert
      return false;
   } else {
      alerDate.classList.add("d-none"); //hide alert
      return true;
   }
   
}