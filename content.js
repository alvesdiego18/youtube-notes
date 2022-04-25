const interval = setInterval(() => {

    const _center = document.querySelector("#center")
    const buttonPlay = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
    const timeVideo = document.querySelector(".ytp-time-current")

    function getOffsetRightPosition (el) {
        const rect = el.getBoundingClientRect()
        return {
            right: rect.right + window.scrollX,
            top: rect.top + window.scrollY,
        }
    }

    if (_center) {
        clearInterval(interval)
        initDataMark()

        console.clear()
        console.log('Inicializing....')

        const list = []
        let lastItemMarked = null

        const _buttonsAll = document.querySelector("#buttons")
        const _buttonCreate = document.createElement(`button`)
        _buttonCreate.classList.add('mark_button_create')
        _buttonCreate.textContent = `+`;
        _buttonsAll.prepend(_buttonCreate)

        let heightVezes = 1

        _center.style.flex = 0.7
        _buttonCreate.addEventListener(`click`, () => {

            const _container = document.querySelector(".ytp-scrubber-container")
            const _videoHtml = document.querySelector('.html5-video-player')
            if (_container) {

                //** Pause video */
                buttonPlay.click()

                //** Get position X de video timer */
                const containerX = _container.getBoundingClientRect().x
                const videohtmlX = _videoHtml.offsetWidth
                const calcWidth = containerX / videohtmlX * 100

                //** Create a div background popup */
                const divBackground = document.createElement('div')
                divBackground.id = `mark_background`;
                divBackground.classList.add('mark_background')

                //** Create a div input */
                const divInput = document.createElement('div')
                divInput.classList.add('mark_div_input')

                //** Create a text area for add content */
                const textarea = document.createElement('textarea')
                textarea.id = `mark_text`;
                textarea.rows = 3
                textarea.placeholder = 'This marker is...'
                textarea.maxLength = 53
                textarea.classList.add('mark_text_area')

                //** Create a button to insert itens */
                const buttonAdd = document.createElement(`button`)
                buttonAdd.classList.add('mark_button_add')
                buttonAdd.textContent = `Add Marker`
                buttonAdd.addEventListener(`click`, () => {

                    const backgroundMarkId = `mark${timeVideo.textContent.replace(':', '_')}`
                    const description = `${timeVideo.textContent} - ${document.querySelector(`#mark_text`).value}`
                    const title = document.querySelector("#container > h1 > yt-formatted-string").textContent
                    let spaceBottom = `52px`

                    //** get position to finish last div added */
                    if (lastItemMarked) {

                        const elLastItemMarked = document.querySelector(`#${lastItemMarked}`)

                        if (elLastItemMarked) {
                            const lastPositionToItemMarker = getOffsetRightPosition(elLastItemMarked)
                            const poistionPinToPlayer = getOffsetRightPosition(document.querySelector("#movie_player .ytp-scrubber-container"))

                            // calculated position from last pin added
                            // and new pin if it is greater than the last position, reset
                            if (poistionPinToPlayer.right >= lastPositionToItemMarker.right)
                                heightVezes = 1

                            const newBottomValue = Number(elLastItemMarked.style.bottom.replace('px', ''))
                            spaceBottom = `${newBottomValue + 22}px`
                        }
                        else {
                            spaceBottom = `52px`
                        }
                    }

                    //** add item to screen */
                    const player = document.querySelector("#movie_player > div.ytp-chrome-bottom")
                    const backgroundMark = document.createElement('div')
                    backgroundMark.id = backgroundMarkId;
                    backgroundMark.classList.add('mark_item')
                    backgroundMark.textContent = description
                    backgroundMark.style = `                      
                        bottom: ${spaceBottom};
                        left: ${calcWidth}%;
                    `
                    backgroundMark.addEventListener('click', () => {
                        player.removeChild(backgroundMark)

                        const bottomLastItemRemoved = Number(backgroundMark.style.bottom.replace('px', ''))
                        document.querySelectorAll('.mark_item').forEach(item => {
                            console.log(item.style.bottom)

                            const newBottomValue = Number(item.style.bottom.replace('px', ''))
                            if (newBottomValue > bottomLastItemRemoved)
                                item.style.bottom = `${newBottomValue - 22}px`
                        })
                    })

                    player.appendChild(backgroundMark)

                    //** save the last id marked */ 
                    lastItemMarked = backgroundMarkId

                    //** remove option add itens for screen */
                    document.querySelector(`#mark_background`).remove()

                    list.push({
                        id: backgroundMarkId,
                        description: description,
                        bottom: spaceBottom,
                        left: `${calcWidth}%`,
                        link: window.location.href,
                        title
                    })

                    heightVezes++
                    buttonPlay.click()
                })

                const buttonClose = document.createElement(`button`)
                buttonClose.textContent = 'Close'
                buttonClose.classList.add('mark_button_close')
                buttonClose.addEventListener(`click`, () => {
                    document.querySelector(`#mark_background`).remove()
                    buttonPlay.click()
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