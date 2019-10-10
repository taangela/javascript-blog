'use strict';

{
    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        console.log(event);

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement)
        clickedElement.classList.add('active');

        /*[DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = this.getAttribute('href');
        console.log(articleSelector);

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);

        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        /* [DONE] remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);
        let html = '';
        for (let article of articles) {
            /* [DONE] get the article id */
            let articleId = article.getAttribute('id');
            console.log(articleId);
            /* [DONE] find the title element and get the title from the title element*/
            let articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);
            /* [DONE] create HTML of the link */
            let linkHTML = ('<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>');
            console.log(linkHTML);
            /* [DONE] insert link into html variable */
            html = html + linkHTML;
            console.log(html);
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();
}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

/*function myFunction() {
  let x = document.getElementById("list-container-id");  
  let y = document.getElementById("titles-id");

  console.log("dodaje " + x.className);
  if (x.className.indexOf("responsive") < 0) {
    x.className += " responsive";
    console.log("dodalem")
    y.style = "display: block;";
  } else {
    x.className = x.className.replace("responsive", "");
    console.log('co jest k mac kaczorze');
    y.style = "";
  }

  
}*/