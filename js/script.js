/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables that selects the ul that holds the students
//and the actual collection of students
const ul = document.querySelector('.student-list');
const studentLis = ul.children;
//global variable to select header div
const header = document.querySelector('.page-header');
//global variable to select ul parent div
const studentDiv = document.querySelector('.page');

//dynamically add search bar component
const studentSearchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

studentSearchDiv.classList.add("student-search");

//adding text/placeholder to both search button and input
searchButton.textContent = "Search";
searchInput.placeholder = "Search for students...";

//appending search component to the page
header.appendChild(studentSearchDiv);
studentSearchDiv.appendChild(searchInput);
studentSearchDiv.appendChild(searchButton);


//showPage function that displays appropriate students
const showPage = (lis, pageNum) => {
	for (let i = 0; i < lis.length; i++)
		if(i >= (pageNum-1)*10 && i < pageNum*10)
			lis[i].style.display = "block";
		else if(i < (pageNum-1)*10 || i >= pageNum*10)
			lis[i].style.display = "none";
}


//appendPageLinks function that creates buttons and calls showPage function
const appendPageLinks = lis => {
	const pageNums = Math.ceil(lis.length/10);
	const pageLinkDiv = document.createElement('div');

	pageLinkDiv.classList.add("pagination");
	studentDiv.appendChild(pageLinkDiv);


	for (let p = 1; p <= pageNums; p++) {
		const pageUL = document.createElement('ul');
		const pageLI = document.createElement('li');
		const pageAnchor = document.createElement('a');

		pageAnchor.textContent = (p.toString());

		pageLinkDiv.appendChild(pageUL);
		pageUL.appendChild(pageLI);
		pageLI.appendChild(pageAnchor);

		pageAnchor.addEventListener('click', (e) => {
			const allAnchors = document.querySelectorAll(".pagination a");
			const targetAnchor = e.target;

			showPage(lis, parseInt(targetAnchor.textContent));
			for(let a = 0; a < allAnchors.length; a++) {
				allAnchors[a].classList.remove('active');
			}
			targetAnchor.classList.add('active');
		})
	}
}

//search component search function
const studentSearch = ref => {
	let results = [];

	for(let i = 0; i < studentLis.length; i++){
		const names = studentLis[i].querySelector('.student-details h3');
		const email = studentLis[i].querySelector('.student-details span');
		if(names.textContent.includes(ref) || email.textContent.includes(ref))
			results.push(studentLis[i]);
	}

	return results;
}

//search component eventListeners
searchInput.addEventListener('keyup', () => {
	let results = studentSearch(searchInput.value);
	const h1 = document.createElement('h1');
	const paginationDiv = document.querySelector(".pagination");
	let newList = document.createElement('ul');

	if(paginationDiv != null)
		studentDiv.removeChild(paginationDiv);

	if(results.length == 0){
		ul.style.display = "none";
		h1.textContent = "No matches found"
		studentDiv.appendChild(h1);
	} else if(results.length != 0) {
		ul.style.display = "none";
		newList.classList.add("student-list");

		for(let i = 0; i < results.length; i++) {
			newList.appendChild(results[i]);
		}
		studentDiv.appendChild(newList);
		appendPageLinks(newList);
	}
});
searchButton.addEventListener('click', () => {
	let results = studentSearch(searchInput.value);
});


//initital appendPageLinks call with original student list
appendPageLinks(studentLis);
//initial call to showPage function so that when page loads, only first 10 students show
showPage(studentLis, 1);