class UserCard2 extends HTMLElement {
  constructor() {
    super();

    var image = document.createElement("img");
    image.src = "https://semantic-ui.com/images/avatar2/large/kristy.png";
    image.classList.add("image-2");

    var container = document.createElement("div");
    container.classList.add("container-2");

    var name = document.createElement("p");
    name.classList.add("name-2");
    name.innerText = "User Name2 Test";

    var email = document.createElement("p");
    email.classList.add("email-2");
    email.innerText = "yourmail@some-email.com";

    var button = document.createElement("button");
    button.classList.add("button-2");
    button.innerText = "Follow Test";

    container.append(name, email, button);
    container.querySelector(".email-2").innerText = this.getAttribute("email");

    var shadow = this.attachShadow({ mode: "closed" });
    shadow.append(image, container);
    //this.append(image, container);

    this.$button = shadow.querySelector("button");
    this.$button.addEventListener("click", () => {
      // do something
      console.log('into2');
    });
  }
}

window.customElements.define("user-card-2", UserCard2);
