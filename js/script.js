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

const hideStudents = students => {
	for(li = 0; li < students.length; li++)
		students[li].style.display = "none";
}

//search component eventListeners
searchInput.addEventListener('keyup', () => {
	let results = studentSearch(searchInput.value);
	let h1 = document.querySelector('.page h1');
	const paginationDiv = document.querySelector(".pagination");

	if(paginationDiv != null)
		studentDiv.removeChild(paginationDiv);

	if(results.length == 0){
		hideStudents(studentLis);
		if(h1 == null)
			h1 = document.createElement("h1");
		h1.textContent = "No matches found"
		studentDiv.appendChild(h1);
	} else if(results.length != 0) {
		if(h1 != null)
			h1.style.display = "none";
		hideStudents(studentLis);

		for(let s = 0; s < studentLis.length; s++){
			for(let r = 0; r < results.length; r++) {
				if(studentLis[s] === results[r])
					studentLis[s].style.display = "block";
			}
		}
		appendPageLinks(results);
		showPage(results, 1);
	}
});
searchButton.addEventListener('click', () => {
	let results = studentSearch(searchInput.value);
	let h1 = document.querySelector('.page h1');
	const paginationDiv = document.querySelector(".pagination");

	if(paginationDiv != null)
		studentDiv.removeChild(paginationDiv);

	if(results.length == 0){
		hideStudents(studentLis);
		if(h1 == null)
			h1 = document.createElement("h1");
		h1.textContent = "No matches found"
		studentDiv.appendChild(h1);
	} else if(results.length != 0) {
		if(h1 != null)
			h1.style.display = "none";
		hideStudents(studentLis);

		for(let s = 0; s < studentLis.length; s++){
			for(let r = 0; r < results.length; r++) {
				if(studentLis[s] === results[r])
					studentLis[s].style.display = "block";
			}
		}
		appendPageLinks(results);
		showPage(results, 1);
	}
});


//initital appendPageLinks call with original student list
appendPageLinks(studentLis);
//initial call to showPage function so that when page loads, only first 10 students show
showPage(studentLis, 1);