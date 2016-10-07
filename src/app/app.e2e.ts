describe('App', () => {

    beforeEach(() => {
        browser.get('/');
    });


    it('should have a title', () => {
        let subject = browser.getTitle();
        let result = '52°North @ GitHub';
        expect(subject).toEqual(result);
    });

    it('should have <md-toolbar>', () => {
        let subject = element(by.css('app md-toolbar')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });

    it('should have <home>', () => {
        let subject = element(by.css('app home')).isPresent();
        let result = true;
        expect(subject).toEqual(result);
    });

    it('should have buttons', () => {
        let subject = element(by.css('button')).getText();
        let result = 'Submit Value';
        expect(subject).toEqual(result);
    });

});
