/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/

const ul = document.querySelector('.student-list');
const lis = ul.children;


/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/

/*
1: 0-9
2: 10-19
3: 20;29
4: 30-39
5: 40-49
6: 50-54
*/

const showPage = (list, page) => {
	for (let i = 0; i < list.length; i++)
		if(i >= (page-1)*10 && i < page*10)
			console.log();
}



/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = list => {
	const pages = Math.ceil(list.length/10);
	const studentsDiv = document.querySelector('.page');
	const pageLinkDiv = document.createElement('div');

	pageLinkDiv.classList.add("pagination");

	studentsDiv.appendChild(pageLinkDiv);

	for (let p = 0; p < pages; p++) {
		pageLinkDiv.appendChild(document.createElement('ul'));
	}
}

appendPageLinks(lis);


// Remember to delete the comments that came with this file, and replace them with your own code comments.