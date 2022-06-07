const btnInfoUser = document.querySelector(".profile__btn-edit");
const formPopupUser = document.querySelector('.popup_button_edit');
const btnCloseFormUser = document.querySelector(".popup__edit-close");
const formUserInfo = document.querySelector(".popup__input-form");
const nameUser = document.querySelector(".popup__input_type_name");
const descriptionUser = document.querySelector(".popup__input_type_info");
const btnSaveFormUser = document.querySelector(".popup__submit");

//-----доступ к попап открытию картинки------

const popupOpenImg = document.querySelector('.popup_img');
const btnClosePopupOpenImg = document.querySelector(".popup__img-close");
const imgPopup = document.querySelector(".popup__item-image");
const nameImg = document.querySelector(".popup__item-text");

//-----------формы и кнопка добавления новых карточек на страницу-------
const btnAddElm = document.querySelector(".profile__btn-add");
const formAddElm = document.querySelector(".popup_add");
const btnCloseAddElm = document.querySelector(".popup__close");
const formHandlerAddElm = document.querySelector("#add_place");
const nameCard = document.querySelector(".popup__input_type_place");
const linkCard = document.querySelector(".popup__input_type_link");

//----------данные пользователя-------
const nameTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__text");
const containerCardItems = document.querySelector(".element__image");
const template = document.querySelector("#elements").content;
const container = document.querySelector('.elements');
//--------------Функции открытия/закрытия попапа-------

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}
//--------слушатели для открытия форм редактирования-----

btnInfoUser.addEventListener("click", function (evt) {
  openPopup(formPopupUser);
  nameDescriptionSite() 
});

btnCloseFormUser.addEventListener("click", function (evt) {
  closePopup(formPopupUser);
});

//-------отображение имени и описания------

function nameDescriptionSite() {
  nameUser.value = nameTitle.textContent;
  descriptionUser.value = profileDescription.textContent;
}
//-----изменения данных пользователя из формы-----

function handlerFormUserSubmit(evt) {
  evt.preventDefault();
  nameTitle.textContent = nameUser.value;
  profileDescription.textContent = descriptionUser.value;
  closePopup(formPopupUser);
}

formUserInfo.addEventListener("submit", handlerFormUserSubmit);
//--------слушатели событий------

btnAddElm.addEventListener("click", function (evt) {
  openPopup(formAddElm);
});

btnCloseAddElm.addEventListener("click", function (evt) {
  closePopup(formAddElm);
});

const cards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];


//---------удаление, лайк, открытие картинки-------
function btnLikeHandler(evt) {
  evt.target.classList.toggle("element__heart_active");
}

function btnDeleteHandler(evt) {
  evt.target.closest(".element").remove();
}

function btnOpenPopupImg(evt) {
  openPopup(popupOpenImg);
  imgPopup.src = evt.target.src;
  nameImg.textContent = evt.target.nextElementSibling.firstElementChild.textContent;;
   imgPopup.alt = evt.target.alt;
}
btnClosePopupOpenImg.addEventListener("click", () => {
  closePopup(popupOpenImg);
});

//------вывод карточек на страницу------
function createCard(card) {
 
  const elm = template.querySelector('.element').cloneNode(true);
  const nameCard = template.querySelector(".element__title");
  const imgCard = template.querySelector(".element__image");
  const trash = template.querySelector(".element__trash");
  const like = template.querySelector(".element__heart");
  like.addEventListener("click", btnLikeHandler);
  trash.addEventListener("click", btnDeleteHandler);
  imgCard.addEventListener("click", btnOpenPopupImg);
  nameCard.textContent = card.name;
  imgCard.src = card.link;

  return elm;
}
cards.forEach((card)=>{
  const renderCard = createCard(card)
  container.append(renderCard)
})
//------создание карточек----

function AddCardHandler(evt) {
  evt.preventDefault();
  const newCard = { link: linkCard.value, name: nameCard.value }
  createCard(newCard);
  evt.target.reset();
  closePopup(formAddElm);
}
formHandlerAddElm.addEventListener("submit", AddCardHandler);
