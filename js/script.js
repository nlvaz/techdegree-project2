/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables that selects the ul that holds the students
//and the actual collection of students
const ul = document.querySelector('.student-list');
const lis = ul.children;
//global variable to select header div
const header = document.querySelector('.page-header');

//dynamically add search bar component
const studentSearchDiv = document.createElement('div');
const searchInput = document.createElement('input');
const searchButton = document.createElement('button');

studentSearchDiv.classList.add("student-search");

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
	const studentDiv = document.querySelector('.page');
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

appendPageLinks(lis);

//initial call to showPage function so that when page loads, only first 10 students show
showPage(lis, 1);