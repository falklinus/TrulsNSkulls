function Menu(gameStack) {
    const menuButton = document.querySelector('#menuButton');
    const menuModal = document.querySelector('#menuModal');
    const menuModalClose = menuModal && menuModal.querySelector('#menuModalClose');
    const menuLinks = menuModal && menuModal.querySelectorAll('li');
    const innerMenuContainer = menuModal && menuModal.querySelector('#innerMenuContainer');
    const MENU_ITEMS = {
        CONTROLS: { class: '.controls-menu', offset: 0 },
        MAP: { class: '.map-menu', offset: -0.5 },
    };
    if (menuButton) {
        menuButton.style.display = 'block';
        menuButton.addEventListener('click', toggleMenuModal);
    }
    menuLinks &&
        menuLinks.forEach((item) => {
            item.addEventListener('click', handleMenuItemClick);
        });
    function handleMenuItemClick({ target }) {
        const _target = target;
        // goToMainMenu()
        if (!(menuLinks && innerMenuContainer))
            return;
        menuLinks.forEach((link) => {
            link.classList.remove('active');
        });
        Object.keys(MENU_ITEMS).forEach((key) => {
            var _a;
            if (((_a = _target.textContent) === null || _a === void 0 ? void 0 : _a.includes(key)) && menuModal) {
                innerMenuContainer.style.setProperty('--offset-x', `${MENU_ITEMS[key].offset}`);
                _target.classList.add('active');
            }
        });
    }
    function checkOutsideClick(e) {
        if (menuModal &&
            !e.composedPath().includes(menuModal) &&
            menuButton &&
            !e.composedPath().includes(menuButton)) {
            toggleMenuModal();
        }
    }
    function toggleMenuModal() {
        if (!(menuModal && menuModalClose))
            return;
        if (!menuModal.style.opacity || menuModal.style.opacity == '0') {
            gameStack.pause();
            menuModal.style.opacity = '1';
            menuModal.style.pointerEvents = 'all';
            menuModalClose.addEventListener('click', toggleMenuModal);
            window.addEventListener('click', checkOutsideClick);
        }
        else {
            menuModal.style.opacity = '0';
            menuModal.style.pointerEvents = 'none';
            menuModalClose.removeEventListener('click', toggleMenuModal);
            window.removeEventListener('click', checkOutsideClick);
            gameStack.resume();
        }
    }
}
export default Menu;
