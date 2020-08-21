const formulaire = document.getElementById("formPages");
const inputForm = formulaire.querySelector("#nomPage");
const btn = formulaire.querySelector("button");
const containerPages = document.querySelector(".container-pages");
const containerCount = document.querySelector(".count-pages");
let numberPages = 0;
let numberChecked = 0;
getStore();


// --- EVENT LISTENER
btn.addEventListener("click", addPage);
containerPages.addEventListener("click", function(e){
	if (e.target.tagName.toUpperCase() === "INPUT") {
		if (e.target.parentNode.classList.contains("checked")) {
			e.target.parentNode.classList.remove("checked");
			numberChecked--;
		} else {
			e.target.parentNode.classList.add("checked");
			numberChecked++;
		}
		countPages();
		setStore();
	}
})


// ADD PAGE
function addPage(e) {
	e.preventDefault();
	if (inputForm.value !== "") {
		const content = document.createElement("div");
		content.classList.add("page");
		content.innerHTML = `<span class='titlePage'>${inputForm.value}</span><input type="checkbox"/>`;
		containerPages.appendChild(content);
		setStore();
	}
	nbPages();
	inputForm.value = "";
}


// COUNT PAGE 
function countPages(){
	containerCount.innerHTML = `${numberChecked} / ${numberPages}`;
}


// UPDATE NB PAGES
function nbPages() {
	const elem = containerPages.querySelectorAll(".page");
	numberPages = elem.length;
	countPages();
}


// STORE
function setStore(){
	const items = containerPages.innerHTML;
	localStorage.setItem("items", items);
}
function getStore() {
	const itemStore = localStorage.getItem("items");
	containerPages.innerHTML = itemStore;
	
	const checked = containerPages.querySelectorAll(".checked input");
	numberChecked = checked.length;
	checked.forEach(input => input.checked = true);
	
	nbPages();
}