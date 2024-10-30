function attachEvents() {

    const urlPosts = `http://localhost:3030/jsonstore/blog/posts`;
    const urlComments = `http://localhost:3030/jsonstore/blog/comments`;

    const btnLoadEl = document.querySelector('#btnLoadPosts');
    const postsEl = document.querySelector('#posts');
    const btnViewPostEl = document.querySelector('#btnViewPost');
    const postTitleEl = document.querySelector('#post-title');
    const postBodyEl = document.querySelector('#post-body');
    const postCommentsEl = document.querySelector('#post-comments');

    let data;

    btnLoadEl.addEventListener('click', addPost)
    btnViewPostEl.addEventListener('click', addComment)

    function addPost() {
        fetch(urlPosts)
            .then(resp => resp.json())
            .then(res => createPosts(res));

        function createPosts(res) {
            data = res

            postsEl.innerHTML = '';

            for (const [id, postInfo] of Object.entries(data)) {

                const option = document.createElement('option');
                option.value = id;
                option.textContent = postInfo.title;

                postsEl.appendChild(option)

            }

        }
    }

    function addComment() {
        const selectedInfoEl = document.querySelector('#posts').value;
        postTitleEl.textContent = data[selectedInfoEl].title
        postBodyEl.textContent = data[selectedInfoEl].body



        fetch(urlComments)

            .then(resp => resp.json())
            .then(res => createComment(res));

        // postTitleEl.textContent = data

        function createComment(res) {
            postCommentsEl.innerHTML = ''


            for (const [id, postInfo] of Object.entries(res)) {

                const li = document.createElement('li');
                li.id = id
                li.textContent = postInfo.text

                postCommentsEl.appendChild(li)

            }



        }


    }
















}

attachEvents();