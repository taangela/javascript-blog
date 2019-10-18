'use strict'; {
    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        /*console.log(event);*/

        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        /*console.log('clickedElement:', clickedElement)*/
        clickedElement.classList.add('active');

        /*[DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.posts article.active');
        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = this.getAttribute('href');
        /*console.log(articleSelector);*/

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector);
        /*console.log(targetArticle);*/

        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active');
    }

    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles',
        optArticleTagsSelector = '.post-tags .list',
        optArticleTagsSelectorLink = '.post-tags .list a',
        /*czy cos zle zrobilam, ze musialam dodac taka stala*/
        optArticleAuthorSelector = '.post-author',
        optArticleAuthorSelectorLink = '.post-author a',
        optTagsListSelector = '.tags.list'


    function generateTitleLinks(customSelector = '') {

        /* [DONE] remove contents of titleList */
        const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

        /* [DONE] for each article */
        const articles = document.querySelectorAll(optArticleSelector + customSelector);
        /*console.log(articles);*/
        let html = '';
        for (let article of articles) {
            /* [DONE] get the article id */
            let articleId = article.getAttribute('id');
            /*console.log(articleId);*/
            /* [DONE] find the title element and get the title from the title element*/
            let articleTitle = article.querySelector(optTitleSelector).innerHTML;
            /*console.log(articleTitle);*/
            /* [DONE] create HTML of the link */
            let linkHTML = ('<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>');
            console.log(linkHTML);
            /* [DONE] insert link into html variable */
            html = html + linkHTML;
            /*console.log(html);*/
        }
        titleList.innerHTML = html;
        const links = document.querySelectorAll('.titles a');
        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }

    generateTitleLinks();

    function generateTags() {
        /* [NEW] create a new variable allTags with an empty array */
        let allTags = [];
        /* find all articles */
        const articles = document.querySelectorAll(optArticleSelector);
        /* START LOOP: for every article: */
        for (let article of articles) {
            /* find tags wrapper */
            const tagsList = article.querySelector(optArticleTagsSelector);
            /* make html variable with empty string */
            let html = '';
            /* get tags from data-tags attribute */
            const articleTags = article.getAttribute('data-tags');
            console.log(articleTags);
            /* split tags into array */
            const articleTagsArray = articleTags.split(' ');
            console.log(articleTagsArray);
            /* START LOOP: for each tag */
            for (let tag of articleTagsArray) {
                console.log(tag);
                /* generate HTML of the link */
                let linkHTML = ('<li><a href="#tag-' + tag + '">' + tag + '</a></li>' + ' ');
                /* add generated code to html variable */
                html = html + linkHTML;
                console.log(html);
                /* [NEW] check if this link is NOT already in allTags */
                if (allTags.indexOf(linkHTML) == -1) {
                    /* [NEW] add generated code to allTags array */
                    allTags.push(linkHTML);
                    /* END LOOP: for each tag */
                }
                /* insert HTML of all the links into the tags wrapper */
                tagsList.innerHTML = html;
                /* END LOOP: for every article: */
            }
            /* [NEW] find list of tags in right column */
  			const tagList = document.querySelector('.tags');

  			/* [NEW] add html from allTags to tagList */
  			tagList.innerHTML = allTags.join(' ');
        }
    }

    generateTags();


    function tagClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        console.log('tag was clicked!');
        console.log(clickedElement);
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log(href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const tag = href.replace('#tag-', '');
        console.log(tag);
        /* find all tag links with class active */
        const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
        console.log(activeTagLinks);
        /* START LOOP: for each active tag link */
        for (let activeTagLink of activeTagLinks) {
            /* remove class active */
            activeTagLink.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all tag links with "href" attribute equal to the "href" constant */
        const tagHrefLinks = document.querySelectorAll('a[href="' + href + '"]');
        /* START LOOP: for each found tag link */
        for (let tagHrefLink of tagHrefLinks) {
            /* add class active */
            tagHrefLink.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-tags~="' + tag + '"]');
    }


    function addClickListenersToTags() {
        /* find all links to tags */
        const tagLinks = document.querySelectorAll(optArticleTagsSelectorLink);
        console.log(tagLinks);
        /* START LOOP: for each link */
        for (let tag of tagLinks) {
            /* add tagClickHandler as event listener for that link */
            console.log(tag);
            tag.addEventListener('click', tagClickHandler);
            /* END LOOP: for each link */
        }
    }

    addClickListenersToTags();

    function generateAuthors() {
        const articles = document.querySelectorAll(optArticleSelector);
        for (let article of articles) {
            const authorsWrapper = article.querySelector(optArticleAuthorSelector);
            console.log(authorsWrapper);
            let html = '';
            const articleAuthors = article.getAttribute('data-author');
            console.log(articleAuthors);
            let linkHTML = ('<a href="#author-' + articleAuthors + '">' + articleAuthors + '</a>');
            html = html + linkHTML;
            console.log(html);
            authorsWrapper.innerHTML = html;
        }
    }

    generateAuthors();


    function authorClickHandler(event) {
        /* prevent default action for this event */
        event.preventDefault();
        /* make new constant named "clickedElement" and give it the value of "this" */
        const clickedElement = this;
        console.log('author was clicked!');
        /* make a new constant "href" and read the attribute "href" of the clicked element */
        const href = clickedElement.getAttribute('href');
        console.log(href);
        /* make a new constant "tag" and extract tag from the "href" constant */
        const author = href.replace('#author-', '');
        /* find all authors links with class active */
        const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');
        /* START LOOP: for each active tag link */
        for (let activeAuthor of activeAuthors) {
            /* remove class active */
            activeAuthor.classList.remove('active');
            /* END LOOP: for each active tag link */
        }
        /* find all authors links with "href" attribute equal to the "href" constant */
        const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');
        /* START LOOP: for each found tag link */
        for (let authorLink of authorLinks) {
            /* add class active */
            authorLink.classList.add('active');
            /* END LOOP: for each found tag link */
        }
        /* execute function "generateTitleLinks" with article selector as argument */
        generateTitleLinks('[data-author="' + author + '"]');
    }


    function addClickListenersToAuthors() {
        /* find all links to tags */
        const linksAuthors = document.querySelectorAll(optArticleAuthorSelectorLink);
        console.log(linksAuthors);
        /* START LOOP: for each link */
        for (let author of linksAuthors) {
            /* add tagClickHandler as event listener for that link */
            console.log(author);
            author.addEventListener('click', authorClickHandler);
            /* END LOOP: for each link */
        }
    }

    addClickListenersToAuthors()
}

function getDivHeight() {
    let maxHeightDiv = 0;

    for (let i = 1; i <= 10; i++) {
        let heightDiv = document.getElementById('article-' + i).clientHeight;

        if (maxHeightDiv < heightDiv) {
            maxHeightDiv = heightDiv;
        }
    }
    console.log(maxHeightDiv);

    document.getElementById('maxHeightDiv').style.height = maxHeightDiv + 20 + 'px';
}

getDivHeight();




function mobileMenu() {
    const mobile = document.getElementById('myTopnav');
    if (mobile.className === 'topnav') {
        mobile.className += ' responsive';
    } else {
        mobile.className = 'topnav';
    }
}