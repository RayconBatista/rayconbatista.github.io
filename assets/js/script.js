document.addEventListener('DOMContentLoaded', function () {
  const isLightMode = localStorage.getItem("isLightMode") === "true";
  const html = document.documentElement;
  html.classList.toggle("light", isLightMode);
  
  listSocialNetworks();
  listAdditionalLinks();
});


function toggleMode() {
  const html = document.documentElement;
  const isLightMode = html.classList.toggle("light");
  
  localStorage.setItem("isLightMode", isLightMode);
  
  const img = document.querySelector("#profile img");
  const imgSrc = isLightMode
      ? "https://rayconlimabatista.com.br/img/avatar_profile.webp"
      : "../images/profile-github.webp";
  img.setAttribute("src", imgSrc);
}

function createSocialLink(platform, link) {
  const socialLink = document.createElement('a');
  socialLink.href = link;
  socialLink.target = "_blank";

  const icon = document.createElement('ion-icon');
  icon.setAttribute('name', `logo-${platform}`);

  socialLink.appendChild(icon);
  return socialLink;
}

function listSocialNetworks() {
  const socialMediaList = document.getElementById('social-links');

  fetch('assets/json/social_media.json')
      .then(response => response.json())
      .then(socialMedia => {
          for (const platform in socialMedia) {
              if (socialMedia.hasOwnProperty(platform)) {
                  const link = socialMedia[platform];
                  const socialLink = createSocialLink(platform, link);
                  socialMediaList.appendChild(socialLink);
              }
          }
      })
      .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}

function createAdditionalLink(linkData) {
  const { title, url } = linkData;
  const listItem = document.createElement('li');
  const link = document.createElement('a');

  link.href = url;
  link.textContent = title;
  link.target = "_blank";

  listItem.appendChild(link);
  return listItem;
}

function listAdditionalLinks() {
  const additionalLinksList = document.getElementById('additional-links');

  fetch('assets/json/menu-links.json')
      .then(response => response.json())
      .then(additionalLinksJSON => {
          if (Array.isArray(additionalLinksJSON)) {
              const orderedList = document.createElement('ul');

              additionalLinksJSON.forEach(linkData => {
                  const listItem = createAdditionalLink(linkData);
                  orderedList.appendChild(listItem);
              });

              additionalLinksList.appendChild(orderedList);
          } else {
              console.error('O JSON não é um array de links adicionais.');
          }
      })
      .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
}