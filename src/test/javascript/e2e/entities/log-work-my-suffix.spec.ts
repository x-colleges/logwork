import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('LogWork e2e test', () => {

    let navBarPage: NavBarPage;
    let logWorkDialogPage: LogWorkDialogPage;
    let logWorkComponentsPage: LogWorkComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load LogWorks', () => {
        navBarPage.goToEntity('log-work-my-suffix');
        logWorkComponentsPage = new LogWorkComponentsPage();
        expect(logWorkComponentsPage.getTitle())
            .toMatch(/logWorkApp.logWork.home.title/);

    });

    it('should load create LogWork dialog', () => {
        logWorkComponentsPage.clickOnCreateButton();
        logWorkDialogPage = new LogWorkDialogPage();
        expect(logWorkDialogPage.getModalTitle())
            .toMatch(/logWorkApp.logWork.home.createOrEditLabel/);
        logWorkDialogPage.close();
    });

    it('should create and save LogWorks', () => {
        logWorkComponentsPage.clickOnCreateButton();
        logWorkDialogPage.setLogworkInput('5');
        expect(logWorkDialogPage.getLogworkInput()).toMatch('5');
        logWorkDialogPage.setDescriptionInput('description');
        expect(logWorkDialogPage.getDescriptionInput()).toMatch('description');
        logWorkDialogPage.save();
        expect(logWorkDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class LogWorkComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-log-work-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class LogWorkDialogPage {
    modalTitle = element(by.css('h4#myLogWorkLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    logworkInput = element(by.css('input#field_logwork'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLogworkInput = function(logwork) {
        this.logworkInput.sendKeys(logwork);
    };

    getLogworkInput = function() {
        return this.logworkInput.getAttribute('value');
    };

    setDescriptionInput = function(description) {
        this.descriptionInput.sendKeys(description);
    };

    getDescriptionInput = function() {
        return this.descriptionInput.getAttribute('value');
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
