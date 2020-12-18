const modalElement = document.querySelector('.modal');

document.addEventListener('DOMContentLoaded', () => {
  const checkCookie = getCookie('_user-token');
  if (checkCookie) {
    return;
  }
  modalElement.classList.add('modal_active');
});

modalElement.addEventListener('click', (e) => {
  const currentTarget = e.target;
  if (currentTarget.classList.contains('modal__close')) {
    modalElement.classList.remove('modal_active');
    setCookie('_user-token', 'kolzQ35DhwSHTSBu3lFgCb5FhIHqSr', {
      path: '/',
      expires: new Date(Date.now() + 86400000),
    });
  }
});

function setCookie(name, value, options = {}) {
  options = {
    path: '/',
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value,
  )}`;

  for (const optionKey in options) {
    updatedCookie += `; ${optionKey}`;
    const optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += `=${optionValue}`;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
    ),
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, '', {
    'max-age': -1,
  });
}
