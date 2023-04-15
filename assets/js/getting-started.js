const setupPageControl = (container, pageType) => {
    const buttons = document.querySelectorAll(container + ' .btn-' + pageType);
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            if (!this.classList.contains('active')) {
                const activeButtons = document.querySelectorAll(container + ' .btn-' + pageType + '.active');
                for (let j = 0; j < activeButtons.length; j++) {
                    activeButtons[j].classList.remove('active');
                }
                this.classList.add('active');

                const pages = document.querySelectorAll(container + ' .page-' + pageType);
                for (let j = 0; j < pages.length; j++) {
                    pages[j].classList.remove('show');
                }

                const targetPage = document.getElementById(this.getAttribute('data-page'));
                if (targetPage) {
                    targetPage.classList.add('show');
                }
            }
        });
    }
}

const showContent = (slug) => {
    document.querySelector('[data-page="content-'+slug+'"]').click();
}

setupPageControl('body', 'platform');
setupPageControl('body', 'extractplatform');
setupPageControl('body', 'phase');

const platformPages = document.querySelectorAll('.page-platform');
for (let i = 0; i < platformPages.length; i++) {
    const container = '#' + platformPages[i].id;
    setupPageControl(container, 'distro');
}

switch(openrct2.currentPlatform) {
    case openrct2.Platform.WINDOWS32:
        showContent('windows-x86');
        showContent('windows');
        showContent('extractwindows');
        break;
    case openrct2.Platform.WINDOWS64:
        showContent('windows-x64');
        showContent('windows');
        showContent('extractwindows');
        break;
    case openrct2.Platform.MACOS:
        showContent('macos');
        showContent('extractlinuxmacos');
        break;
    case openrct2.Platform.LINUX:
        showContent('linux');
        showContent('extractlinuxmacos');
        break;
    default:
        break;
}