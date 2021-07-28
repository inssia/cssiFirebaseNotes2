let googleUser;
var listOfTags = [];


window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function handle(e){
        if(e.keyCode === 13){
            const tagText = document.querySelector('#note-tags');
            const tagList = document.querySelector('#tags-list');
            
            const tag = document.createElement('span');
            tag.classList = "tag";
            const tagTextEl = document.createTextNode(`${tagText.value}`);
            tag.appendChild(tagTextEl);

            const deleteEl = document.createElement('button');
            deleteEl.classList = "delete is-small";

            tag.appendChild(deleteEl);

            tagList.appendChild(tag);
            

            listOfTags.push(`${tag.value}`);

            deleteEl.addEventListener("click", ()=> {
                tagList.removeChild(tag, deleteEl);
                const index = listOfTags.indexOf(`${tag.value}`)
                if (index > -1) {
                    listOfTags.splice(index, 1);
                }
            })
            
            tagText.value = "";
        }
    }



const handleNoteSubmit = () => {
  // 1. Capture the form data
  const noteTitle = document.querySelector('#noteTitle');
  const noteText = document.querySelector('#noteText');

  

  // 2. Format the data and write it to our database
  firebase.database().ref(`users/${googleUser.uid}`).push({
    title: noteTitle.value,
    text: noteText.value,
    tags: listOfTags
  })
  // 3. Clear the form so that we can write a new note
  .then(() => {
    noteTitle.value = "";
    noteText.value = "";
    listOfTags = [];
  });
}