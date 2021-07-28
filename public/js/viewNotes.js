let googleUser;

window.onload = (event) => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log('Logged in as: ' + user.displayName);
      googleUser = user;
      getNotes(user.uid);
    } else {
      window.location = 'index.html'; // If not logged in, navigate back to login page.
    }
  });
};

function getNotes (userId) {
    console.log('getting notes for', userId);
    const notesRef = firebase.database().ref(`users/${userId}`);
    notesRef.on('value', (db) =>{
        const data = db.val();
        renderData(data);
    });
}

function renderData (data) {
    for (const dataId in data) {
        const note = data[dataId];
        document.querySelector('#app').appendChild(renderCard(note));
    }
    
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function renderCard(note) {

    

    const div = document.createElement('div');
    div.classList = 'column is-one-quarter';

    const card = document.createElement('div');
    card.classList = 'card';

    div.appendChild(card);

    //note.style.background = getRandomColor();

    const header = document.createElement('header');
    header.classList ='card-header';

    card.appendChild(header);

    const cardTitle = document.createElement('span');
    cardTitle.classList = 'card-header-title';
    const title = document.createTextNode(`${note.title}`);
    cardTitle.appendChild(title);

    header.appendChild(cardTitle);

    const cardContent = document.createElement('div');
    cardContent.classList = 'card-content';

    card.appendChild(cardContent);

    const content = document.createElement('div');
    content.classList = 'content';
    const contentText = document.createTextNode(`${note.text}`);
    content.appendChild(contentText);

    cardContent.appendChild(content);

    const cardFooter = document.createElement('footer');
    cardFooter.classList = 'card-footer';
    const name = document.createTextNode(`${googleUser.displayName}`);
    cardFooter.appendChild(name);

    card.appendChild(cardFooter);

    card.style.background = getRandomColor();

    return div;

    // return `
    //     <div class="column is-one-quarter">
    //         <div class="card">
    //             <header class="card-header">
    //                 <span class="card-header-title">${note.title}</span>
    //                 <span class="card-header-title">${googleUser.displayName}</span>
    //             </header>
    //             <div class="card-content">
    //                 <div class="content">${note.text}</div>
    //             </div>
    //         </div>
    //     </div>
    //     `;
}


