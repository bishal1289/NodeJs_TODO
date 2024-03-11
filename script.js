let txt = document.querySelector("#txt");
let add = document.querySelector("#add");
let mainDiv = document.querySelector("#mainDiv");

/* CREATING OBJECT AND STORING INTO THE ARRAY */

add.addEventListener("click", function () {
  let obj = {};
  obj.id = Date.now();
  obj.title = txt.value;
  obj.status = "Pending";

  if (obj.title === "" || obj.title.trim() == "") {
    alert("Write Something");
  } else {
      fetch("http://localhost:3008/addData", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
      }).then((res) => {
        return res.json();
      }).then((data) => {
      console.log(data);
    })
    addUI(obj);
  }
  txt.value = "";
});

/* FUNCTION TO APPEND ITEMS CHECKBOX AND DELETE BUTTON IN UI */

function addUI(obj) {
  let div = document.createElement("div");
  div.classList.add("task-list-item");
  let span = document.createElement("span");
  let checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");

  let deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");

  span.innerHTML = obj.title;
  div.append(checkBox);
  div.append(span);
  div.append(deleteBtn);

  /* TO MAKE CHECKED ITEM STYLE TEXT-DECORATION : LINE-THROUGH */

  checkBox.addEventListener("click", function () {
    if (checkBox.checked === true) {
      span.style.textDecoration = "line-through";
      obj.status = "Completed";
    } else {
      obj.status = "Pending";
      span.style.textDecoration = "none";
    }
  });

  if (obj.status == "Completed") {
    checkBox.checked = true;
    span.style.textDecoration = "line-through";
  }

  deleteBtn.addEventListener("click", removeTask);

  /* TO REMOVE ITEM ON CLICK OF THE BUTTON FROM ARRAY AND UI*/

  deleteBtn.addEventListener("click", () => {
    console.log(obj);
    fetch("http://localhost:3008/deleteItem", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    });
  });

  mainDiv.append(div);
}

/* TO REMOVE THE ITEMS */

function removeTask(e) {
  e.target.parentNode.remove();
}

async function fetchData() {
  await fetch("http://localhost:3008/gettodolist", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      data.forEach((element) => {
        addUI(element);
      });
    });
}
fetchData();
