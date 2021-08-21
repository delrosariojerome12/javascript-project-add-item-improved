const main = document.querySelector("main");
// const groupItems = document.querySelectorAll(".group-item");
const addItemsText = document.querySelector("#add");
const submitBtn = document.querySelector("#submit");
const search = document.querySelector("#search");
const content = document.querySelector(".content");
const statusEl = document.querySelector("#status");

let textValue = "";
const itemList = [];
submitBtn.addEventListener("click", function (e) {
  if (addItemsText.value.trim() !== "") {
    textValue = addItemsText.value;
    itemList.push(textValue);
    console.log(itemList);
    statusEl.textContent = "Item Added";
    // addItemsText.placeholder = "Add Item";
    addItemsText.value = "";
    putItem();
  } else if (addItemsText.value.trim() === "") {
    // console.log("eror! text field cannot be empty");
    statusEl.textContent = "Empty Value Cannot Be Added";
    addItemsText.placeholder = "Text field cannot be empty!";
    addItemsText.style.border = "none";
    addItemsText.style.outline = "none";
    addItemsText.style.border = "#f14c4c 2px solid";
    addItemsText.value = "";
  }
});
addItemsText.addEventListener("keydown", function (e) {
  if (e.keyCode === 13 && e.target.value.trim() !== "") {
    textValue = this.value;
    itemList.push(textValue);
    console.log(itemList);
    statusEl.textContent = "Item Added";
    this.value = "";
    putItem();
    // console.log(ul.innerHTML);
  } else if (e.keyCode === 13 && e.target.value.trim() === "") {
    // console.log("eror! text field cannot be empty");
    statusEl.textContent = "Empty Value Cannot Be Added";
    this.placeholder = "Text field cannot be empty!";
    this.style.border = "none";
    this.style.outline = "none";
    this.style.border = "#f14c4c 2px solid";
    this.value = "";
    // console.log(ul.innerHTML);
  }
});
addItemsText.addEventListener("keypress", function (e) {
  if (e.keyCode !== 13) {
    this.style.border = "#000 2px solid";
  }
});
let ctr = -1;
const ul = document.querySelector("ul");

function putItem() {
  const groupItems = document.querySelectorAll(".group-item");
  if (ctr < 3) {
    ctr++;
    groupItems[
      ctr
    ].innerHTML = `${textValue} <button class='remove'>X</button>`;
    removeCall();
  } else {
    ul.innerHTML += `<li class='group-item'>${textValue}<button class='remove'>X</button></li>`;
    removeCall();
  }
}

function removeCall() {
  const remove = document.querySelectorAll(".remove");

  for (let index = 0; index < remove.length; index++) {
    const groupItems = document.querySelectorAll(".group-item");

    remove[index].addEventListener("click", function () {
      // remove in the document
      let removeVar = this.parentElement;
      console.log(removeVar);
      console.log(groupItems);
      statusEl.textContent = "Selected Item Removed";
      removeVar.remove();
      // removing item from the array
      let arrayFind = removeVar.textContent.slice(0, -2);
      for (let j = 0; j < itemList.length; j++) {
        if (arrayFind === itemList[j]) {
          itemList.splice(j, 1);
          console.log("working");
          // console.log(itemList[j]);
          console.log(itemList);
        }
      }
    });
  }
}

search.addEventListener("keydown", function (e) {
  // const groupItems = document.querySelectorAll(".group-item");

  let searchText = "";
  removeCall();
  if (e.keyCode === 13 && this.value.trim() !== "") {
    searchText = this.value;
    searchList(searchText);
    this.value = "";
  } else if (e.keyCode === 13 && this.value.trim() === "") {
    console.log("error");
    this.value = "";
  }
});

function searchList(searchItem) {
  let status = false;
  const groupItems = document.querySelectorAll(".group-item");

  for (let index = 0; index < itemList.length; index++) {
    if (searchItem === itemList[index]) {
      console.log("item found");
      groupItems[index].style.backgroundColor = "#1364fa";
      groupItems[index].style.color = "#fff";
      groupItems[index].style.fontWeight = "700";
      status = true;
    }
  }
  if (status) {
    statusEl.textContent = `Item Found!`;
  } else {
    statusEl.textContent = `No Match Found!`;
  }
}
