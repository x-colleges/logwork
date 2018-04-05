import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Team e2e test', () => {

    let navBarPage: NavBarPage;
    let teamDialogPage: TeamDialogPage;
    let teamComponentsPage: TeamComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Teams', () => {
        navBarPage.goToEntity('team-my-suffix');
        teamComponentsPage = new TeamComponentsPage();
        expect(teamComponentsPage.getTitle())
            .toMatch(/logWorkApp.team.home.title/);

    });

    it('should load create Team dialog', () => {
        teamComponentsPage.clickOnCreateButton();
        teamDialogPage = new TeamDialogPage();
        expect(teamDialogPage.getModalTitle())
            .toMatch(/logWorkApp.team.home.createOrEditLabel/);
        teamDialogPage.close();
    });

    it('should create and save Teams', () => {
        teamComponentsPage.clickOnCreateButton();
        teamDialogPage.setNameInput('name');
        expect(teamDialogPage.getNameInput()).toMatch('name');
        teamDialogPage.setDescriptionInput('description');
        expect(teamDialogPage.getDescriptionInput()).toMatch('description');
        teamDialogPage.save();
        expect(teamDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class TeamComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-team-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class TeamDialogPage {
    modalTitle = element(by.css('h4#myTeamLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    descriptionInput = element(by.css('input#field_description'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
