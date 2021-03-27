const interval = setInterval(() => {

    const _center = document.querySelector("#center")
    const _button = document.querySelector("#buttons > ytd-topbar-menu-button-renderer:nth-child(1)")
    const _play = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
    const _timevideo = document.querySelector(".ytp-time-current")

    if (center && _button) {
        clearInterval(interval)
        initDataMark()

        let heightVezes = 1

        _center.style.flex = 0.7
        _button.style.backgroundColor = 'red'
        _button.addEventListener(`click`, () => {

            const _container = document.querySelector(".ytp-scrubber-container")
            const _videoHtml = document.querySelector('.html5-video-player')
            if (_container) {

                //** Pause video */
                _play.click()

                //** Get position X de video timer */
                const _containerX = _container.getBoundingClientRect().x
                const _videohtmlX = _videoHtml.offsetWidth
                const calcWidth = _containerX / _videohtmlX * 100

                //** Create a div background popup */
                const divBackground = document.createElement('div')
                divBackground.id = `div_background_marcacao`;
                divBackground.classList.add('mark_background')

                //** Create a div input */
                const divInput = document.createElement('div')
                divInput.classList.add('mark_div_input')

                //** Create a text area for add content */
                var textarea = document.createElement('textarea')
                textarea.id = `text_marcacao`;
                textarea.rows = 3
                textarea.placeholder = 'E essa marcação?'
                textarea.maxLength = 100
                textarea.classList.add('mark_text_area')

                //** Create a button to insert itens */
                const buttonAdd = document.createElement(`button`)
                buttonAdd.classList.add('mark_button_add')
                buttonAdd.textContent = `ADICIONAR NOTA`;
                buttonAdd.addEventListener(`click`, () => {

                    const _description = `${_timevideo.textContent} - ${document.querySelector(`#text_marcacao`).value}`

                    const divMarcacao = document.createElement('div')
                    divMarcacao.id = `mark${_timevideo.textContent.replace(':', '_')}`;
                    divMarcacao.classList.add('mark_marcacao')
                    divMarcacao.style = `                      
                        bottom: ${30 + (20 * heightVezes)}px;
                        left: ${calcWidth}%;
                    `
                    divMarcacao.textContent = _description
                    document.querySelector("#movie_player > div.ytp-chrome-bottom").appendChild(divMarcacao)

                    //** remove option add itens for screen */
                    document.querySelector(`#div_background_marcacao`).remove()

                    addDataMark({
                        id: `mark${_timevideo.textContent.replace(':', '_')}`,
                        description: _description,
                        bottom: `${30 + (20 * heightVezes)}px`,
                        left: `${calcWidth}%`,
                        link: window.location.href.split("=")[1].split("&")[0]
                    })

                    heightVezes++
                    _play.click()
                })

                const buttonClose = document.createElement(`button`)
                buttonClose.textContent = 'FECHAR'
                buttonClose.classList.add('mark_button_close')
                buttonClose.addEventListener(`click`, () => {
                    document.querySelector(`#div_background_marcacao`).remove()
                })

                //** add childrens */
                divInput.appendChild(textarea)
                divInput.appendChild(buttonAdd)
                divInput.appendChild(buttonClose)
                divBackground.appendChild(divInput)
                document.body.appendChild(divBackground)
            }
            else {
                console.log("Nada foi encontrado")
            }
        })
    }

}, 1000)