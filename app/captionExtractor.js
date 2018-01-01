const fs = require('fs');

module.exports = {
    'It should write YouTube captions to a file': (browser) => {
        browser.url(process.env.url || 'https://www.youtube.com/watch?v=cQX75U5jy0E');
        browser.executeAsync(function(done) {
            let title = document.querySelector('title').innerText;
            let moreActionsButton = document.querySelector('[aria-label="More actions"]');
            moreActionsButton.click();
            setTimeout(() => {
                let selectableContent = document.querySelectorAll('.selectable-content');
                Array.from(selectableContent).forEach((item) => {
                    let btn = item.children;
                    Array.from(btn).forEach((el) => {
                        let links = el.children;
                        Array.from(links).forEach((link) => {
                            if (link.innerText.trim().toLowerCase() == 'open transcript') {
                                link.click()
                            }
                        })
                    })
                });
                getTranscript();
            }, 3000)

            function getTranscript() {
                let captions = '';
                let checkTranscript = setInterval(() => {
                    let cues = document.querySelectorAll('.cue');
                    Array.from(cues).forEach((cue) => {
                        captions += cue.innerText + '\n';
                    })
                    if (cues.length) {
                        clearInterval(checkTranscript)
                        done({
                            title,
                            captions
                        });
                    }
                }, 1000)
            }
        }, [], (result) => {
            fs.writeFile('captions/' + result.value.title + '.txt', result.value.captions, (err) => {
                if (err) throw err;
                console.log('captions have been saved!');
            });
            console.log(result.value)
            browser.assert.ok(result.value.captions.length > 0);
        })
        .end()
    }
}