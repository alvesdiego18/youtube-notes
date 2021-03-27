const interval = setInterval(() => {

    const _center = document.querySelector("#center")
    const _button = document.querySelector("#buttons > ytd-topbar-menu-button-renderer:nth-child(1)")
    const _play = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-left-controls > button")
    const _timevideo = document.querySelector(".ytp-time-current")

    if (center && _button) {
        clearInterval(interval)

        let heightVezes = 1

        _center.style.flex = 0.7
        _button.style.backgroundColor = 'red'
        _button.addEventListener(`click`, () => {

            const _container = document.querySelector(".ytp-scrubber-container")
            if (_container) {

                _play.click()
                const _containerX = _container.getBoundingClientRect().x

                var divBackground = document.createElement('div')
                divBackground.id = `div_background_marcacao`;
                divBackground.style = `
                    background-color: rgba(0,0,0,0.6); 
                    width: 100%; 
                    height: 100%; 
                    display: flex; 
                    justify-content:center; 
                    align-items:center;
                    position: absolute;
                    top: 0;
                    left: 0;    
                    z-index: 99999999;
                `

                var divInput = document.createElement('div')
                divInput.style = `
                    width: 300px; 
                    background-color: #FFF;                    
                    border-radius: 4px;
                    padding: 2px;
                    display: flex;
                    flex-direction: column;
                `

                var textarea = document.createElement('textarea')
                textarea.id = `text_marcacao`;
                textarea.rows = 5
                textarea.placeholder = 'E essa marcação?'
                textarea.textLength = 100
                textarea.style = `
                    border: 0px;
                    padding: 10px;
                    border-radius: 4px;
                    outline: none;
                    width: 280px;
                `

                var buttonAdd = document.createElement(`button`)
                buttonAdd.style = `
                    background-color: #c00;
                    color: #FFF;
                    width: 300px;
                    height: 50px;
                    border: 0px;
                    border-radius: 4px;
                    outline: none;
                    cursor: pointer;
                `
                buttonAdd.textContent = `ADICIONAR NOTA`;
                buttonAdd.addEventListener(`click`, () => {                    

                    var divMarcacao = document.createElement('div')
                    divMarcacao.id = `marcacao1`;
                    divMarcacao.style = `
                        background-color: red;    
                        height: 10px;
                        position: absolute;
                        bottom: ${30 + (20 * heightVezes)}px;
                        left: ${_containerX}px;
                        padding: 4px 7px;
                        border-radius: 8px 8px 8px 0px;                        
                    `
                    divMarcacao.textContent = `${_timevideo.textContent} - ${document.querySelector(`#text_marcacao`).value}`
                    document.querySelector("#movie_player > div.ytp-chrome-bottom").appendChild(divMarcacao)

                    document.querySelector(`#div_background_marcacao`).remove()

                    heightVezes++
                    _play.click()
                })

                divInput.appendChild(textarea)
                divInput.appendChild(buttonAdd)
                divBackground.appendChild(divInput)

                document.body.appendChild(divBackground)
            }
            else {
                alert('Nada foi encontrado')
            }
        })
    }

}, 1000)


var divBackground = document.createElement('div')
divBackground.style = `background-color: rgba(0,0,0,0.6); width: 100%; height: 100%; display: flex; justify-content:center; align-items:center;`

var divInput = document.createElement('div')
divInput.style = `width: 300px; background-color: #FFF;`

var textarea = document.createElement('textarea')
textarea.rows = 5
textarea.placeholder = 'E essa marcação?'

divInput.appendChild(textarea)
divBackground.appendChild(divInput)