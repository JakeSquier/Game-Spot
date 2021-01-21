

//Users database
const userDataUrl = "http://localhost:3000/api/v1/users/"
//Games database
const gameDataUrl = "http://localhost:3000/api/v1/games/"
//comments database
const commentDataUrl = "http://localhost:3000/api/v1/comments/"
//webpage
const webPage = document.querySelector('.webpage')
//page wrapper
//const pageWrapper = document.querySelector('.wrapper')

document.addEventListener("DOMContentLoaded", () => {

    fetch(gameDataUrl)
        .then(response=> response.json())
        .then(gamesData=> renderGameIndexPage(gamesData))
})

// Page rendering functions

const renderGameIndexPage = (gamesData) => {

    //index page header
    const indexHeaderDiv = renderIndexPgeHeader(gamesData)

    //games index
    const gameIndexDiv = renderGameIndex(gamesData)

    //high scores
    const indexHighscoresDiv = renderHighScores(gamesData)

    //render index page
    webPage.append(indexHeaderDiv, gameIndexDiv, indexHighscoresDiv)

}

//render index page header
const renderIndexPgeHeader = (gamesData) => {
    const indexHeaderDiv = document.createElement('div')
    indexHeaderDiv.id = 'index-header'

    const divStuff = document.createElement('div')
    divStuff.id = 'divStuff'

    const divTitle = document.createElement('div')
    divTitle.className = 'movingTitleContainer'

    const title = document.createElement('h1')
    title.id = 'index-title'
    title.innerHTML = 'The Grid'

    divTitle.append(title)
    indexHeaderDiv.append(divTitle, divStuff)

    return indexHeaderDiv
}

//render games index page
const renderGameIndex = (gamesData) => {
    const gameIndexDiv = document.createElement('div')
    gameIndexDiv.id = 'games-index'

    gameIndexDiv.append(pageLine('All Games', gamesData.length))

    const ulGames = document.createElement('ul')
    ulGames.id = 'games'

    gamesData.forEach(game => {
        
        ulGames.append(renderGameIndexCard(game))
    })
    gameIndexDiv.append(ulGames)

    return gameIndexDiv
}

//render high scores for index page
const renderHighScores = (gamesData) => {
    const indexHighscoresDiv = document.createElement('div')
    indexHighscoresDiv.id = 'index-highscores'

    const divButtons = document.createElement('div')
    divButtons.id = 'game-buttons'

    const divScoreboard = document.createElement('div')
    divScoreboard.id = 'game-scoreboard'

    const scorePanels = 21;

    gamesData.forEach(game => {

        const button = document.createElement('button')
        button.id = game.id
        button.className = 'game-scores'
        button.innerHTML = game.name
        divButtons.append(button)

        button.addEventListener('click', (e) => {

            if(document.querySelector(`#score-panel-1`) != null){
                divScoreboard.innerHTML = ""
            }
            scoreBoard(divScoreboard, scorePanels);

            const scores = game.scores
            for(let i = 0; i < scorePanels; i++){
                
                const div = document.querySelector(`#score-panel-${i+1}`)

                const userDiv = document.createElement('div')
                userDiv.className = 'userName'
                if(scores[i] != null){
                    //userDiv.innerHTML = 
                    userDiv.innerHTML = scores[i].userName
                }

                const scoreDiv = document.createElement('div')
                scoreDiv.className = 'score'
                if(scores[i] != null){
                    scoreDiv.innerHTML = scores[i].score
                }
                div.append(userDiv, scoreDiv)
            }
        })
        indexHighscoresDiv.append(divButtons, divScoreboard)
    })
    return indexHighscoresDiv
}

//index page helper functions

//create all games line

const pageLine = (innerText, innerSpanNumber) => {
    const h2 = document.createElement('h2')
    h2.className = 'index-header'

    const strong = document.createElement('strong')
    strong.innerHTML = innerText

    const span = document.createElement('span')
    span.innerHTML = `(${innerSpanNumber})`

    h2.append(strong, span)

    return h2
}

//populate scoreboard

const scoreBoard = (scoreBoard, rows) => {
    for(let i = 0; i < rows; i++){
        const div = document.createElement('div')
        div.className = 'score-panel'
        div.id = `score-panel-${i+1}`

        scoreBoard.append(div)
    }
}

//create game cards

const renderGameIndexCard = (gameData) => {
    const figure = document.createElement('figure')
    figure.className = 'card'
    figure.id = 'box'

    const img = document.createElement('img')
    img.src = gameData.gif_url

    const figcaption = document.createElement('figcaption')
    figcaption.innerHTML = gameData.name

    figure.append(img, figcaption)

    figure.addEventListener('click', (e) => {
        e.preventDefault()
        renderGameShowPage(gameData)
    })

    return figure
}

//populate scores with username

const getUser = (div, user_id, index) => {

    fetch(userDataUrl)
        .then(response => response.json())
        .then(users => users.forEach(user => {
            if(user.id = user_id){
                div.innerHTML = `${index}. ${user.user_name}`
            }
        }))
}


const renderGameShowPage = (gameData) => {

    webPage.innerHTML = ""
    //header
    const headerDiv = renderShowPageHeader(gameData)

    //gameEmbed
    const gameEmbedDiv = renderShowPageEmbed(gameData)

    //scoreBoard
    const scoreBoardDiv = renderShowPageScoreBoard(gameData)

    //comments
    const commentSectionDiv = renderShowPageComments(gameData)

    //rendering show page

    webPage.append(headerDiv, gameEmbedDiv, scoreBoardDiv, commentSectionDiv)
    snakeScript()

}
//render show page

//render show page header

const renderShowPageHeader = (gameData) => {
    const headerDiv = document.createElement('div')
    headerDiv.id = 'show-header'

    const h1 = document.createElement('h1')
    h1.id = 'show-page-title'
    h1.innerHTML = gameData.name

    headerDiv.append(h1)
    return headerDiv
}

//render game embed to show page

const renderShowPageEmbed = (gameData) => {
    const gameEmbedDiv = document.createElement('div')
    gameEmbedDiv.id = 'game-embed'
    
    
    return gameEmbedDiv
}

//render show page scoreboard

const renderShowPageScoreBoard = (gameData) => {
    const showScoresDiv = document.createElement('div')
    showScoresDiv.id = 'show-page-scoreboard'

    const showScoreHeaderDiv = document.createElement('div')
    showScoreHeaderDiv.id = 'show-page-scoreboard-header'

    const scoreBoardGame = document.createElement('h3')
    scoreBoardGame.innerHTML = gameData.name
    showScoreHeaderDiv.append(scoreBoardGame)

    const showScorePanelDiv = document.createElement('div')
    showScorePanelDiv.id = 'show-page-score-panel'

    const numberOfPanels = 21
    
    if(document.querySelector(`score-show-1`) != null){
        showScorePanelDiv.innerHTML = ""
    }
    showScoreBoard(showScorePanelDiv, numberOfPanels, gameData.scores)

        showScoresDiv.append(showScoreHeaderDiv, showScorePanelDiv)
        return showScoresDiv


}

//render show page comments

const renderShowPageComments = (gameData) => {
    const commentSectionDiv = document.createElement('div')
    commentSectionDiv.id = 'comment-section'

    commentSectionDiv.innerHTML = ""

    const div = document.createElement('div')
    div.id = 'comments'

    const header = document.createElement('header')
    header.innerHTML = 'Comments'

    const ulComments = document.createElement('ul')
    ulComments.id = 'comments'

    const comments = gameData.comments
    renderComments(comments, ulComments)

    const commentForm = document.createElement('form')
    commentForm.id = 'comment-form'

    const commentContentLabel = document.createElement('label')
    commentContentLabel.for = 'content'
    commentContentLabel.innerHTML = 'Comment:'

    const contentInput = document.createElement('input')
    contentInput.type = 'text'
    contentInput.id = 'content'
    contentInput.name = 'content'

    const commentAuthorLabel = document.createElement('label')
    commentAuthorLabel.for = 'author'
    commentAuthorLabel.innerHTML = 'UserName:'

    const commentAuthorInput = document.createElement('input')
    commentAuthorInput.type = 'text'
    commentAuthorInput.id = 'fauthor'
    commentAuthorInput.name = 'author'
    
    const commentButton = document.createElement('button')
    commentButton.class = 'comment-button'
    commentButton.type = 'submit'
    commentButton.innerHTML = 'Post'

    commentForm.append(commentContentLabel, contentInput, commentAuthorLabel, commentAuthorInput, commentButton)
    console.log(commentForm)
    commentForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log(e.target.content.value, e.target.author.value)
        fetch("http://localhost:3000/api/v1/comments", {
            method: "POST",
            headers: {
            "Content-type": "application/json",
            Accept: "application/json"
            },
            body: JSON.stringify({
                game_id: gameData.id,
                content: e.target.content.value,
                userName: e.target.author.value
            })
        })
            .then(res => res.json())
            .then(comment => {})
    });

    commentForm.append(commentContentLabel, contentInput, commentAuthorLabel, commentAuthorInput, commentButton)
    div.append(header, ulComments, commentForm)
    commentSectionDiv.append(div)
    return commentSectionDiv
}
//show page helpers
const showScoreBoard = (scoreBoard, rows, scores) => {
    for(let i = 0; i < rows; i++){
        const div = document.createElement('div')
        div.className = 'score-panel'
        div.id = `score-show-${i+1}`

        const divUserName = document.createElement('div')
        divUserName.className = 'user-score-show'
        if(scores[i] != null){
            //userDiv.innerHTML = 
            divUserName.innerHTML = scores[i].userName
        }

        const divScore = document.createElement('div')
        divScore.className = 'score-show'
        if(scores[i] != null){
            divScore.innerHTML = scores[i].score
        }
        
        div.append(divUserName, divScore)
        scoreBoard.append(div)
    }
    //console.log(scoreBoard)
}

const renderComments = (comments, ulComments) => {
    comments.forEach(comment => {

        const div = document.createElement('div')
        div.innerHTML = comment.content
        div.id = comment.user_id

        const dltButton = document.createElement('button')
        dltButton.className = 'delete-comment'
        dltButton.id = comment.id
        dltButton.innerHTML = 'x'

        div.append(dltButton)

        dltButton.addEventListener('click', () => {
            fetch(commentDataUrl + `${comment.id}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(div.remove())
        })
        ulComments.append(div)
    })
}

//snake helper function
const snakeScript = () => {
    const gameEmbed = document.querySelector('#game-embed')
    console.log(gameEmbed)
    const pScore = document.createElement('p')
    pScore.id ='snake_score'

    const divCanvas = document.createElement('div')
    divCanvas.verticalalign

    const canvas = document.createElement('canvas')
    canvas.id = 'canvas'
    canvas.width = '500'
    canvas.height = '500'
    canvas.style = 'background-color: black;'
    //const canvas = document.querySelector('#canvas');
    divCanvas.append(canvas)
    gameEmbed.append(pScore, divCanvas)
    console.log(canvas)
    const ctx = canvas.getContext('2d');
    const box = 21;
    const canvasSize = 23
        //core variable;
    let score = 0
        //load snake starting position
    let snake = [];
    snake [0] = 
    {
        x: Math.floor((canvasSize/2)) * box,
        y: Math.floor((canvasSize/2)) * box
    }
        //set direction getting pressed by arrow keys
    let dir;
    document.addEventListener('keydown', direction);
    function direction(event){
        if(event.keyCode == 65 && dir != 'RIGHT')
                dir = "LEFT";
        if(event.keyCode == 87 && dir != 'DOWN')
                dir = "UP";
        if(event.keyCode == 68 && dir != 'LEFT')
                dir = "RIGHT";
        if(event.keyCode == 83 && dir != 'UP')
                dir = "DOWN";
        if(event.keyCode == 82)
            clearInterval(game)
    };
        //set the location of our food
    let food = {
        x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
        y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box
    };
        //draw function
    function draw(){
            //draw the background
        ctx.fillStyle = 'lightgreen'
        ctx.fillRect(box, box, canvasSize*box - box, canvasSize*box-box);
            //draw the snake head/tail
        for(let i = 0; i < snake.length; i++)
        {
            ctx.fillStyle = 'blue'
            ctx.fillRect(snake[i].x, snake[i].y, box, box)
            };
            //move the snake head
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;
            if(dir == "LEFT")
                snakeX -= box;
            if(dir == "RIGHT")
                snakeX += box;
            if(dir == "UP")
                snakeY -= box;
            if(dir == "DOWN")
                snakeY += box;
                //if the snake eats the food
            if(snakeX == food.x && snakeY == food.y)
            {
                ++score; 
                food = {
                    x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
                    y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box
                }
            }
            else
            {
                snake.pop();
            }
            let newHead = {
                x: snakeX,
                y: snakeY
            };
            //check collision
            function collision(head, array){
                for(let i = 0; i < array.length; i++)
                {
                    if(head.x == array[i].x && head.y == array[i].y)
                    {
                        return true;
                    }
                }
                    return false;
                }
                //game over
            if(snakeX < box || snakeY < box || 
                snakeX > ((canvasSize - 1) * box)|| snakeY > ((canvasSize - 1) * box) ||
                collision(newHead,snake))
            {
                console.log('dead')
                clearInterval(game);
                //     const input = document.querySelector(".comment-input").value;
                //     fetch("http://localhost:3000/scores", {
                //         method: "POST",
                //         headers: {
                //         "Content-type": "application/json",
                //         Accept: "application/json"
                //         },
                //         body: JSON.stringify({
                //         finalscore: score
                //         })
                //     })
                //         .then(res => res.json())
                //         .then(score => {
                //         });
                //     };
                 }
                snake.unshift(newHead);
                //draw in food
                ctx.fillStyle = 'red';
                ctx.fillRect(food.x, food.y, box, box)
                //log score
            let p =  document.querySelector('#snake_score')
            p.innerText = `Score: ${score}`
    };
    let game = setInterval(draw, 100);

}
