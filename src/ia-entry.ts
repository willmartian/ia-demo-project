import { html, css, LitElement, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import { Task } from "@lit-labs/task";

import "./ia-loading.ts";
import "./ia-review.ts";
import { formatDate } from "./utils";

/**
 * Presents an item from the Internet Archive Metadata API
 */
@customElement("ia-entry")
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
      height: 100%;
      width: 100%;

      --color-highlight: rgb(231, 245, 255);
    }

    article {
      display: flex;
      /* flex-wrap: wrap; */
    }

    header {
      margin-bottom: 3em;
      max-width: max-content;
      border-bottom: 4px solid black;
    }

    h1 {
      font-size: 2em;
    }

    p {
      margin-top: 0.5em;
      max-width: 640px;
    }

    iframe {
      padding: 3rem;
      padding-top: 1rem;
    }

    #iframe-container {
      position: sticky;
      top: 0px;
      background-color: black;
      max-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 12px solid #737373;
      border-left: none;
      border-bottom: none;
    }

    #details {
      display: flex;
      flex-direction: column;
      padding: 3em;
    }

    #details > section {
      margin-top: 2rem;
    }

    #details > section:last-of-type {
      margin-bottom: 3rem;
    }

    #metadata {
      padding: 2em;
      background-color: var(--color-highlight);
    }

    #reviews {
      max-width: 640px;
    }

    #related {
      background-color: var(--color-highlight);
      max-width: max-content;
      padding: 2rem;
    }

    dl {
      columns: 2;
      column-width: 300px;
    }

    dl > div {
      break-inside: avoid;
    }

    dt {
      font-weight: bold;
    }

    dt::first-letter {
      text-transform: capitalize;
    }

    dd {
      margin-left: 0;
      margin-bottom: 0.5em;
      overflow-wrap: break-word;
    }

    @media only screen and (max-width: 1200px) {
      article { 
        flex-direction: column;
      }
      #iframe-container {
        position: unset;
        border-right: none;
      }
    }
  `;

  /**
   * The id of the item to retrieve. Retrieved from URL search param "id", with a default value of "InformationM"
   */
  @state()
  private _id =
    new URLSearchParams(window.location.search).get("id") || "InformationM";

  private _metadataTask = new Task(
    this,
    (id) =>
      fetch(`https://archive.org/metadata/${id}`)
        .then((res) => res.json())
        .then((res) => {
          return {
            title: res.metadata.title,
            description: res.metadata.description,
            reviews: res.reviews,
            metadata: Object.entries(res.metadata)
              .filter(
                // Terms to filter from the metadata list
                (item: any) => !["title", "description"].includes(item[0])
              )
              // Sort terms alphabetically
              .sort((a, b) => a[0].localeCompare(b[0])),
          };
        }),
    () => [this._id]
  );

  private _relatedTask = new Task(
    this,
    (id) =>
      fetch(`https://be-api.us.archive.org/mds/v1/get_related/all//${id}`)
        .then((res) => res.json())
        .then((res) => res.hits.hits),
    () => [this._id]
  );

  connectedCallback() {
    super.connectedCallback();
    document.title = this._id + " - Internet Archive";
  }

  // TODO: test for edge cases
  private _formatValue(key: string, value: string): TemplateResult<1> | string {
    // Convert URLs to hyperlinks
    if (value.startsWith("http")) {
      return html`<a href=${value}>${value}</a>`;
    }

    if (key.endsWith("date")) {
      return formatDate(value);
    }

    return value;
  }

  private _renderRelated() {
    return this._relatedTask.render({
      pending: () => html`<ia-loading></ia-loading>`,
      error: () => html`<ia-loading error></ia-loading>`,
      complete: (related) => html`<ul>
        ${related.map(
          (item: any) => html`
            <li><a href=${"./?id=" + item._id}>${item._source.title}</a></li>
          `
        )}
      </ul>`,
    });
  }

  private _renderMetadata() {
    return this._metadataTask.render({
      pending: () => html`<ia-loading></ia-loading>`,
      error: () =>
        html`<ia-loading error message="Unable to load item :("></ia-loading>`,
      complete: ({ title, description, reviews, metadata }) => html`
        <header>
          <h1>${title}</h1>
          <b>Description</b>
          <p>${description}</p>
        </header>
        <div id="metadata">
          <dl>
            ${metadata.map(
              ([key, value]: [string, any]) => html`
                <div>
                  <dt>${key}</dt>
                  <dd>${this._formatValue(key, value.toString())}</dd>
                </div>
              `
            )}
          </dl>
        </div>
        <section id="reviews">
          <h2>Reviews</h2>
          ${!reviews 
            ? html`<p>There are no reviews... yet.</p>`
            : reviews?.map(
              (review: any) => html`
                <ia-review
                  reviewer=${review.reviewer}
                  stars=${review.stars}
                  reviewtitle=${review.reviewtitle}
                  reviewbody=${review.reviewbody}
                  reviewdate=${review.reviewdate}
                ></ia-review>
              `
            )
          }
        </section>
        <section id="related">
          <h2>Related Items</h2>
          ${this._renderRelated()}
        </section>
      `,
    });
  }

  // TODO: Use an ia-loading element as a placeholder for the iframe, to be replaced on the iframe's "load" event.
  render() {
    return html`
      <article>
        <section id="iframe-container">
          <iframe
            src="https://archive.org/embed/${this._id}"
            width="640"
            height="480"
            frameborder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowfullscreen
          ></iframe>
        </section>
        <section id="details">${this._renderMetadata()}</section>
      </article>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "ia-entry": MyElement;
  }
}
