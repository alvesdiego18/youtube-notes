const interval = setInterval(() => {

    const isReady = document.querySelector("#buttons #button > yt-icon > svg")
    const currentTimeVideo = document.querySelector(".ytp-time-current")
    const player = document.querySelector("#movie_player > div.ytp-chrome-bottom")

    if (isReady) {
        clearInterval(interval)

        const BOTTOM_MARK_POSITION = 56
        const BOTTOM_MARK_DISTANC = 22

        let lastItemMarked = null

        const getOffsetPositions = (el) => {

            const rect = el.getBoundingClientRect()
            return {
                right: rect.right + window.scrollX,
                left: rect.left + window.scrollX,
                top: rect.top + window.scrollY,
                bottom: rect.bottom + window.scrollY,
            }
        }

        const createdButtonAddMark = () => {

            const buttonsAll = document.querySelector("#buttons")
            const buttonCreate = document.createElement(`button`)
            buttonCreate.classList.add('mark_button_create')
            buttonCreate.textContent = `+`
            buttonsAll.prepend(buttonCreate)

            return buttonCreate
        }

        const createPopupToAddMark = () => {

            //** Create a div background popup */
            const divBackground = document.createElement('div')
            divBackground.id = `mark_div_background`;
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
            buttonAdd.id = 'mark_button_add'
            buttonAdd.classList.add('mark_button_add')
            buttonAdd.textContent = `Add Marker`

            //** Create a button to close popup marks */
            const buttonClose = document.createElement(`button`)
            buttonClose.id = 'mark_button_close'
            buttonClose.textContent = 'Close'
            buttonClose.classList.add('mark_button_close')

            //** add childrens */
            divInput.appendChild(textarea)
            divInput.appendChild(buttonAdd)
            divInput.appendChild(buttonClose)
            divBackground.appendChild(divInput)

            document.body.appendChild(divBackground)
        }

        const closePopupToAddMark = () => {

            document.querySelector('#mark_button_close')
                .addEventListener(`click`, () => {
                    document.querySelector(`#mark_div_background`).remove()
                    verifyPlayPause('play')
                })
        }

        const verifyPlayPause = (type) => {

            const buttonControlPlayPause = document.querySelector("#movie_player .ytp-left-controls > button")
            const isPlaying = buttonControlPlayPause.title.indexOf('Pausa (k)') > -1

            if (type === 'play' && !isPlaying)
                buttonControlPlayPause.click()
            else if (type === 'pause' && isPlaying)
                buttonControlPlayPause.click()
        }

        const calcInitialPositionMarkVideo = () => {

            const container = document.querySelector(".ytp-scrubber-container")
            const videoHtml = document.querySelector('.html5-video-player')

            if (container && videoHtml) {

                const containerX = container.getBoundingClientRect().x
                const videohtmlX = videoHtml.offsetWidth

                return containerX / videohtmlX * 100
            }

            return 0
        }

        const removeMark = (id) => {

            player.removeChild(`#${id}`)

            const bottomLastItemRemoved = Number(backgroundMark.style.bottom.replace('px', ''))
            document.querySelectorAll('.mark_item').forEach(item => {
                console.log(item.style.bottom)

                const isMarkItemDown = item.style.classList.contains('is_mark_item_down')
                const newBottomValue = Number(item.style.bottom.replace('px', ''))
                if (newBottomValue > bottomLastItemRemoved && !isMarkItemDown)
                    item.style.bottom = `${newBottomValue - 22}px`
            })
        }

        const addNewMark = (id, description, bottomSpace, leftSpace, nivel) => {

            const backgroundMark = document.createElement('div')
            backgroundMark.id = id;
            backgroundMark.classList.add('mark_item')
            backgroundMark.classList.add(`nivel_${nivel}`)
            backgroundMark.textContent = description
            backgroundMark.style = `                      
                bottom: ${bottomSpace};
                left: ${leftSpace}%;
            `
            backgroundMark.addEventListener('click', () => removeMark(id))
            player.appendChild(backgroundMark)
        }

        const getPositionMarkBottom = () => {

            const pinTimerVideo = document.querySelector("#movie_player .ytp-scrubber-container")
            const poistionPinToPlayer = getOffsetPositions(pinTimerVideo)
            const listItem = [...document.querySelectorAll('.mark_item')]

            let listItemsIsMarked = 0
            for (const item of listItem) {
                const itemPosition = getOffsetPositions(item)
                const itemNivel = Number(item.classList[1].split('_')[1])

                if (itemPosition.right > poistionPinToPlayer.left)
                    listItemsIsMarked += itemNivel === 0 ? 1 : itemNivel
            }

            // calculated position from last mark added
            // and new mark if it is greater than the last position, reset
            if (listItemsIsMarked > 0) {
                return {
                    space: `${BOTTOM_MARK_POSITION + (BOTTOM_MARK_DISTANC * listItemsIsMarked)}px`,
                    nivel: listItemsIsMarked
                }
            }
            else {
                return {
                    space: `${BOTTOM_MARK_POSITION}px`,
                    nivel: 0
                }
            }
        }

        createdButtonAddMark()
            .addEventListener('click', () => {

                const initialPositionMark = calcInitialPositionMarkVideo()

                if (initialPositionMark) {

                    verifyPlayPause('pause')
                    createPopupToAddMark()

                    document.querySelector('#mark_button_add')
                        .addEventListener(`click`, () => {

                            const markId = `mark${currentTimeVideo.textContent.replace(':', '_')}`
                            const markDescription = `${currentTimeVideo.textContent} - ${document.querySelector(`#mark_text`).value}`
                            const markSpace = getPositionMarkBottom()

                            const positionMarkBottom = lastItemMarked
                                ? markSpace.space
                                : `${BOTTOM_MARK_POSITION}px`

                            addNewMark(
                                markId,
                                markDescription,
                                positionMarkBottom,
                                initialPositionMark,
                                markSpace.nivel
                            )

                            //** save the last id marked */ 
                            lastItemMarked = markId

                            //** remove option add itens for screen */
                            document.querySelector(`#mark_div_background`).remove()

                            verifyPlayPause('play')
                        })

                    closePopupToAddMark()
                }
            })
    }

}, 1000)