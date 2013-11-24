describe('Publish Subscriber Pattern', function(){

    var results = [];

    var subscriber1 = pubsub().subscribe('someTopic', function() {
        results.push('invoked someTopic');
    });
    var subscriber2 = pubsub().subscribe('someTopic', function() {
        results.push('invoked someTopic one more');
    });
    var subscriber3 = pubsub().subscribe('anotherTopic', function(){
        results.push('invoked anotherTopic');
    });

    describe('тема someTopic', function() {
        beforeEach(function() {
            pubsub().publish('someTopic');
        });
        
        afterEach(function() {
            results = [];
        });

        it('у темы должно быть два подписчика', function() {
            expect(results.length).to.equal(2);
        });

        it('подписчики должны откликаться в порядке их добавления', function() {
            expect(results.join(', ')).to.equal('invoked someTopic, invoked someTopic one more');
        });

        it('первый подписчик должен сказать «invoked someTopic»', function() {
            expect(results[0]).to.equal('invoked someTopic');
        });

        it('второй подписчик должен сказать «invoked someTopic one more»', function() {
            expect(results[1]).to.equal('invoked someTopic one more');
        });
    });

    describe('тема anotherTopic', function() {
        beforeEach(function() {
            pubsub().publish('anotherTopic');
        });
        
        afterEach(function() {
            results = [];
        });

        it('у темы должен быть один подписчик', function() {
            expect(results.length).to.equal(1);
        });

        it('подписчик должен сказать «invoked anotherTopic»', function() {
            expect(results[0]).to.equal('invoked anotherTopic');
        });
    });

    describe('удаление подписчика', function() {

        beforeEach(function() {
            pubsub().unsubscribe(subscriber1);
            pubsub()
                .publish('someTopic')
                .publish('anotherTopic');
        });

        afterEach(function() {
            results = [];
        });

        it('первый подписчик больше не слушает тему someTopic', function() {
            expect(results.length).to.equal(2);
        });

        it('остальные подписчики по-прежнему откликаются', function() {
            expect(results.join(', ')).to.equal('invoked someTopic one more, invoked anotherTopic');
        });
    });

});