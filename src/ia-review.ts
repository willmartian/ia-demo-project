import { html, css, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { formatDate } from "./utils";

/**
 * Presents a review from the Internet Archive API
 */
@customElement("ia-review")
export class ReviewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      max-width: 800px;
    }
  `;

  /**
   * The author of the review.
   */
  @property()
  reviewer!: string;

  /**
   * When the review was posted.
   */
  @property()
  reviewdate!: string;

  /**
   * The main content of the review.
   */
  @property()
  reviewbody!: string;

  /**
   * The subject line of the review.
   */
  @property()
  reviewtitle!: string;

  /**
   * The star rating of the review.
   */
  @property({ type: Number })
  stars!: number;

  render() {
    return html`<article>
      <h3>${this.reviewtitle}</h3>
      <p>${this.reviewbody}</p>
      <footer>
        <b>${this.reviewer}</b>
        -
        <span>${"🤩".repeat(this.stars)}</span>
        - ${formatDate(this.reviewdate)}
      </footer>
    </article>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-review": ReviewElement;
  }
}
