const template = document.createElement('template')
template.innerHTML = `
    <div class="col-md-6">
        <div class= "form-check-inline">
            <input class="form-check-input" type="checkbox" name="text-check" value="amplitude-text" id="checkText">
            <label class="form-check-label" for="checkText">Text</label>
        </div>
        <div class="form-check-inline">
            <input class="form-check-input" type="checkbox" name="slider-check" value="amplitude-slider" id="checkSlider">
            <label class="form-check-label" for="checkSlider">Slider</label>
        </div>
    </div>
    <div class="col-md-6">
            <input type="number" name="text-input" min="1" max="10" value="1" class="form-control" id="text-field">
        <div class="form-group">   
            <input type="range" name="slider-input"  min="1" max="10" value="1" class="form-control-range" id="slider-field">
            <output id="slider-value"></output>
        </div> 
    </div>
    <style>
            #text-field{
                display: inline-block;
                opacity: 0;
                margin-left: 10rem;
            }
            #slider-field{
                display: inline-block;
                opacity: 0;
                margin-left: 10rem;
            }
            #slider-value{
                display: inline-block;
                opacity: 0;
            }
            .col-md-6{
                display: inline-block;
            }
            
        </style>
`


class AmplitudeButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#slider-value').value = 1;

        this.shadowRoot.querySelector('#checkText').addEventListener('change', () => {
            let checkBox = this.shadowRoot.querySelector('#checkText');
            if (checkBox.checked === true) {
                this.shadowRoot.querySelector('#text-field').style.opacity = '100'
            } else {
                this.shadowRoot.querySelector('#text-field').style.opacity = '0'
            }
        })
        this.shadowRoot.querySelector('#checkSlider').addEventListener('change', () => {
            let checkBox = this.shadowRoot.querySelector('#checkSlider');
            if (checkBox.checked === true) {
                this.shadowRoot.querySelector('#slider-field').style.opacity = '100'
                this.shadowRoot.querySelector('#slider-value').style.opacity = '100'
            } else {
                this.shadowRoot.querySelector('#slider-field').style.opacity = '0'
                this.shadowRoot.querySelector('#slider-value').style.opacity = '0'
            }
        })

        this.shadowRoot.querySelector('#text-field').addEventListener('change', () => {
            this.shadowRoot.querySelector('#slider-field').value = this.shadowRoot.querySelector('#text-field').value;
            this.shadowRoot.querySelector('#slider-value').value = this.shadowRoot.querySelector('#text-field').value;
        })
        this.shadowRoot.querySelector('#slider-field').addEventListener('change', () => {
            this.shadowRoot.querySelector('#text-field').value = this.shadowRoot.querySelector('#slider-field').value;
            this.shadowRoot.querySelector('#slider-value').value = this.shadowRoot.querySelector('#slider-field').value;
        })
    }

    getAmplitude() {
        return this.shadowRoot.querySelector('#text-field').value;
    }

}

window.customElements.define('amplitude-buttons', AmplitudeButton);