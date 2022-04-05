function createMenu(engine) {
    const menuButton = document.querySelector('#menuButton');
    const menuModal = document.querySelector('#menuModal');
    const menuTitle = menuModal && menuModal.querySelector('#menuTitle');
    const menuModalClose = menuModal && menuModal.querySelector('#menuModalClose');
    const innerMenuContainer = menuModal && menuModal.querySelector('#innerMenuContainer');
    const innerMenus = menuModal && menuModal.querySelectorAll('.inner-menu');
    const MENU_ITEMS = {
        CONTROLS: '.controls-menu',
        MAP: '.map-menu',
    };
    menuButton && menuButton.addEventListener('click', toggleMenuModal);
    menuModal &&
        menuModal.querySelectorAll('li').forEach((item) => {
            item.addEventListener('click', handleMenuItemClick);
        });
    function goToMainMenu() {
        if (!(menuTitle && innerMenus && innerMenuContainer))
            return;
        menuTitle.textContent = 'MENU';
        menuTitle.removeEventListener('click', goToMainMenu);
        innerMenus.forEach((menu) => {
            menu.style.visibility = 'hidden';
        });
        innerMenuContainer.style.visibility = 'hidden';
    }
    function handleMenuItemClick({ target }) {
        var _a;
        if (!(innerMenuContainer && menuTitle))
            return;
        innerMenuContainer.style.visibility = 'visible';
        let innerMenu;
        Object.keys(MENU_ITEMS).forEach((key) => {
            var _a;
            if (((_a = target.textContent) === null || _a === void 0 ? void 0 : _a.includes(key)) && menuModal) {
                innerMenu = menuModal.querySelector(MENU_ITEMS[key]);
                if (innerMenu)
                    innerMenu.style.visibility = 'visible';
            }
        });
        menuTitle.textContent =
            '< ' +
                String.fromCharCode(160) +
                ((_a = target.textContent) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        menuTitle.addEventListener('click', goToMainMenu);
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
        goToMainMenu();
        if (!(menuModal && menuModalClose))
            return;
        if (!menuModal.style.opacity || menuModal.style.opacity == '0') {
            engine.stop();
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
            engine.start();
        }
    }
}
export default createMenu;
