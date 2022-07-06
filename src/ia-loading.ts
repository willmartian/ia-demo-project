import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/**
 * Presents a loading spinner with the Internet Archive logo
 */
@customElement("ia-loading")
export class IALoadingElement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      width: 100%;
      min-height: 200px;
      aspect-ratio: 2/1;

      justify-content: center;
      align-items: center;
    }

    .ia-logo {
      background-color: rgba(0, 0, 0, 0.3);
      padding: 5px;
      border-radius: 5px;
      animation-name: spin;
      animation-duration: 2000ms;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  @property({ type: Boolean })
  error: boolean = false;

  @property()
  message: string = "Something went wrong :(";

  render() {
    return html`<div>
      ${this.error
        ? this.message
        : html`<svg
            class="ia-logo"
            width="27"
            height="30"
            viewBox="0 0 27 30"
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="logoTitleID logoDescID"
          >
            <title id="logoTitleID">Internet Archive logo</title>
            <desc id="logoDescID">
              A line drawing of the Internet Archive headquarters building
              façade.
            </desc>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <mask id="mask-2" fill="white">
                <path
                  d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z"
                  id="path-1"
                ></path>
              </mask>
              <use fill="#FFFFFF" xlink:href="#path-1"></use>
              <g mask="url(#mask-2)" fill="#FFFFFF">
                <path
                  d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z"
                  id="swatch"
                ></path>
              </g>
            </g>
          </svg>`}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-loading": IALoadingElement;
  }
}
