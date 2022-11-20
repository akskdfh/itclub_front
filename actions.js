
let team = document.querySelector('#team');

team.addEventListener('click', scroll);

function scroll() 
{
	~team.scrollLeft = team.scrollWidth;
}