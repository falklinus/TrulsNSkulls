import Engine from './Engine'

function createMenu(engine: Engine) {
  const menuButton = document.querySelector<HTMLElement>('#menuButton')
  const menuModal = document.querySelector<HTMLElement>('#menuModal')

  const menuTitle =
    menuModal && menuModal.querySelector<HTMLElement>('#menuTitle')
  const menuModalClose =
    menuModal && menuModal.querySelector<HTMLElement>('#menuModalClose')
  const innerMenuContainer =
    menuModal && menuModal.querySelector<HTMLElement>('#innerMenuContainer')
  const innerMenus = menuModal && menuModal.querySelectorAll('.inner-menu')

  const MENU_ITEMS: Record<string, string> = {
    CONTROLS: '.controls-menu',
    MAP: '.map-menu',
  }

  menuButton && menuButton.addEventListener('click', toggleMenuModal)

  menuModal &&
    menuModal.querySelectorAll('li').forEach((item: HTMLLIElement) => {
      item.addEventListener('click', handleMenuItemClick)
    })

  function goToMainMenu() {
    if (!(menuTitle && innerMenus && innerMenuContainer)) return

    menuTitle.textContent = 'MENU'
    menuTitle.removeEventListener('click', goToMainMenu)

    innerMenus.forEach((menu: any) => {
      menu.style.visibility = 'hidden'
    })
    innerMenuContainer.style.visibility = 'hidden'
  }

  function handleMenuItemClick({ target }: Event) {
    if (!(innerMenuContainer && menuTitle)) return

    innerMenuContainer.style.visibility = 'visible'

    let innerMenu

    Object.keys(MENU_ITEMS).forEach((key) => {
      if ((target as HTMLElement).textContent?.includes(key) && menuModal) {
        innerMenu = menuModal.querySelector<HTMLElement>(MENU_ITEMS[key])
        if (innerMenu) innerMenu.style.visibility = 'visible'
      }
    })

    menuTitle.textContent =
      '< ' +
      String.fromCharCode(160) +
      (target as HTMLElement).textContent?.split(' ')[1]
    menuTitle.addEventListener('click', goToMainMenu)
  }

  function checkOutsideClick(e: Event) {
    if (
      menuModal &&
      !e.composedPath().includes(menuModal) &&
      menuButton &&
      !e.composedPath().includes(menuButton)
    ) {
      toggleMenuModal()
    }
  }

  function toggleMenuModal() {
    goToMainMenu()
    if (!(menuModal && menuModalClose)) return

    if (!menuModal.style.opacity || menuModal.style.opacity == '0') {
      engine.stop()
      menuModal.style.opacity = '1'
      menuModal.style.pointerEvents = 'all'
      menuModalClose.addEventListener('click', toggleMenuModal)
      window.addEventListener('click', checkOutsideClick)
    } else {
      menuModal.style.opacity = '0'
      menuModal.style.pointerEvents = 'none'
      menuModalClose.removeEventListener('click', toggleMenuModal)
      window.removeEventListener('click', checkOutsideClick)
      engine.start()
    }
  }
}

export default createMenu
