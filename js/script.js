/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//global variables that selects the ul that holds the students
//and the actual collection of students
const ul = document.querySelector('.student-list');
const lis = ul.children;



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