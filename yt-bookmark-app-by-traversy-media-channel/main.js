document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    //Prevent Default
    e.preventDefault();

    //Get Value
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(!siteName || !siteUrl) {
        alert('WTF!!!');
        return false;
    }

   if(localStorage.getItem('bookmarks') === null) {
       var bookmarks = [];
       bookmarks.push(bookmark);
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   } else {
       // Get Bookmark form localStorage
       var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Push New data to array
       bookmarks.push(bookmark);

       // Push Bookmark to localStorage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

   }
    fetchBookmarks();
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = "";

    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        bookmarksResults.innerHTML += '<div class="container jumbotron">' + '<h3>' + name + '</h3>' + '<br/>' + '<h4>' + url + '</h4>'
        + '<a href="#" onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger">delete</a>' + '</div>';
    }
}

function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for(var i=0; i < bookmarks.length; i++) {
        if(bookmarks[i].url === url) {
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}