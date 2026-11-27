 "use strict";
    // Код писать здесь
    console.log("It works!");
        "use strict";
        // Код писать здесь
        console.log("It works!");
        const comments = [
        {
            name: 'Варвара Н.',
            date: '13.02.22 19:22',
            text: 'Мне нравится как оформлена эта страница! ❤',
            likes: 75,
            isLiked: true,
        },
        ]

        const commentsListElement = document.querySelector('.comments')
        const nameInputElement = document.querySelector('.add-form-name')
        const textInputElement = document.querySelector('.add-form-text')
        const addButtonElement = document.querySelector('.add-form-button')

        // Функция форматирования текущей даты и времени
        const getFormattedDate = () => {
        const now = new Date()
        const day = String(now.getDate()).padStart(2, '0')
        const month = String(now.getMonth() + 1).padStart(2, '0')
        const year = String(now.getFullYear()).slice(-2)
        const hours = String(now.getHours()).padStart(2, '0')
        const minutes = String(now.getMinutes()).padStart(2, '0')

        return `${day}.${month}.${year} ${hours}:${minutes}`
    }

        // Обработка нажатий на кнопки лайков
        const initLikeButtonsListeners = () => {
        const likeButtons = document.querySelectorAll('.like-button')

        for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
        event.stopPropagation()
        const index = likeButton.dataset.index
        const comment = comments[index]

        if (comment.isLiked) {
        comment.likes -= 1
        comment.isLiked = false;
    } else {
        comment.likes += 1
        comment.isLiked = true;
    }

        renderComments()
    });
    }
    };

        // Обработка нажатий на кнопки удаления
        const initDeleteButtonsListeners = () => {
        const deleteButtons = document.querySelectorAll('.delete-btn');

        for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', (event) => {
        event.stopPropagation()

        const index = deleteButton.dataset.index
        comments.splice(index, 1);

        renderComments()
    });
    }
    };

        // Обработка клика по комментарию для ответа
        const initReplyListeners = () => {
        const commentElements = document.querySelectorAll('.comments .comment');

        for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
        const index = commentElement.dataset.index;
        const comment = comments[index];
        // Подставляем цитату и автора в поле ввода (убираем HTML-сущности)
        const cleanText = comment.text.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
        const cleanName = comment.name.replaceAll("&lt;", "<").replaceAll("&gt;", ">");

        textInputElement.value = `"${cleanText}\n${cleanName}", `;
        textInputElement.focus();
    })
    }
    }

        // Функция для отрисовки списка
        const renderComments = () => {
        const commentsHtml = comments
        .map((comment, index) => {
        const activeLikeClass = comment.isLiked ? '-active-like' : ''
        return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
            <p class="comment-text">${comment.text}</p>
          </div>
          <div class="comment-footer">
            <div class="delet">
              <button data-index="${index}" class="delete-btn">Удалить</button>
            </div>
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${activeLikeClass}"></button>
            </div>
          </div>
        </li>
      `
    })
        .join('')

        commentsListElement.innerHTML = commentsHtml

        initLikeButtonsListeners()
        initDeleteButtonsListeners()
        initReplyListeners()
    };

        // Добавление нового комментария
        nameInputElement.addEventListener('input', () => {
        nameInputElement.classList.remove('error')
    })

        textInputElement.addEventListener('input', () => {
        textInputElement.classList.remove('error')
    })

        addButtonElement.addEventListener('click', () => {
        let hasError = false
        // Проверяем поле имени
        if (nameInputElement.value.trim() === '') {
        nameInputElement.classList.add('error')
        hasError = true;
    } else {
        nameInputElement.classList.remove('error')
    }
        // Проверяем поле текста
        if (textInputElement.value.trim() === '') {
        textInputElement.classList.add('error')
        hasError = true;
    } else {
        textInputElement.classList.remove('error')
    }
        // Если хотя бы одно поле пустое, прерываем выполнение
        if (hasError) {
        return;
    }

        comments.push({
        name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        date: getFormattedDate(),
        text: textInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        likes: 0,
        isLiked: false,
    })

        nameInputElement.value = ''
        textInputElement.value = ''

        renderComments()
    })
        renderComments()

