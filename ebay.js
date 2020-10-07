var eBay = {}
module.exports = {
    beforeEach: browser => {
        eBay = browser.page.ebayObject()
        eBay
            .navigate()
    },
    after: browser => {
        eBay
            .end()
    },
    'Category buttons': browser => {
        eBay
        .click('@motors')
        .expect.element('@headerResult').text.to.contain('eBay Motors')
        eBay
        .navigate()
        .click('@fashion')
        .expect.element('@headerResult').text.to.contain('Fashion')
        eBay
        .navigate()
        .click('@electronics')
        .expect.element('@headerResult').text.to.contain('Electronics')
        eBay
        .navigate()
        .click('@art')
        .expect.element('@otherResult').text.to.contain('Collectibles & Art')
        eBay
        .navigate()
        .click('@home')
        .expect.element('@headerResult').text.to.contain('Home & Garden')
        eBay
        .navigate()
        .click('@sports')
        .expect.element('@otherResult').text.to.contain('Sporting Goods & Equipment')
        eBay
        .navigate()
        .click('@toys')
        .expect.element('@otherResult').text.to.contain('Toys & Hobbies')
        eBay
        .navigate()
        .click('@business')
        .expect.element('@headerResult').text.to.contain('Business & Industrial')
        eBay
        .navigate()
        .click('@music')
        .expect.element('@otherResult').text.to.contain('Music')
    },
    'brand test': browser => {
        eBay
        .navigate()
        .click('@brands')
        .verify.containsText('div[class="b-visualnav__grid"]', 'adidas')
    },
    'search and add cart test': browser =>{
        eBay
        .click('@searchBar')
        .setValue('@searchBar',['shovel', eBay.api.Keys.ENTER])
        .click('@shovel')
        .click('@addCart')
        .click('@cartButton')
        .click('@remove')
    },
    'career test': browser =>{
        eBay
        .navigate()
        .click('@career')
        .click('@careerSearch')
        .setValue('@careerSearch', ['Utah', eBay.api.Keys.ENTER])
        .verify.containsText('section[id="search-results"]', 'Utah')
    },
    myTest: async (browser) => {
            eBay
                .maximizeWindow()
            eBay
                .click('@deals')
            browser
                .pause(500)
            const productArray = (await browser.elements('xpath', '//span[contains(text(),"% off")]/../../../../h3')).value
            const percentArray = (await browser.elements('xpath', '//*[@class="itemtile-price-bold"][contains(text(),"off")]')).value
            console.log('Product array is ' + productArray.length)
            console.log('Percent array is ' + percentArray.length)
            browser
                .verify.ok(productArray.length === percentArray.length)
            for (let i = 1; i < percentArray.length; i++) {
                browser
                    .useXpath()
                let productText = (await browser.getText(`(//span[contains(text(),"% off")]/../../../../h3)[${i}]`)).value
                browser
                    .getText(`(//*[@class="itemtile-price-bold"])[${i}]`, result => {
                        let percentage = result.value.slice(0, -5)
                        if (percentage > 59) {
                            console.log(`${productText} for ${percentage}% off? oh my goodness! what a deal!`)
                        }
                    })
            }
        }
    }